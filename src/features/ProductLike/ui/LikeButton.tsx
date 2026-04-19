import s from './LikeButton.module.css';
import { ReactComponent as LikeSvg } from '../../../shared/assets/icons/like.svg';
import classNames from 'classnames';
import { useOptimistic } from 'react';
import { useAppSelector } from '../../../shared/store/utils';
import { userSelectors } from '../../../shared/store/slices/user';
import {
	useSetLikeProductMutation,
	useDeleteLikeProductMutation,
	IErrorResponse,
} from '../../../shared/store/api/productsApi';
import { toast } from 'react-toastify';
import { LikeButtonProps } from './types';
import { Button } from '../../../shared/ui/Button';

export const LikeButton = ({ product }: LikeButtonProps) => {
	const accessToken = useAppSelector(userSelectors.getAccessToken);
	const user = useAppSelector(userSelectors.getUser);

	const [setLike] = useSetLikeProductMutation();
	const [deleteLike] = useDeleteLikeProductMutation();

	const isLike = product?.likes?.some((l) => l.userId === user?.id);
	const [optimisticIsLike, setOptimisticIsLike] = useOptimistic(
		Boolean(isLike),
		(_, nextValue: boolean) => nextValue
	);

	const toggleLike = async () => {
		if (!accessToken) {
			toast.warning('Вы не авторизованы');
			return;
		}

		const nextLikeState = !optimisticIsLike;
		setOptimisticIsLike(nextLikeState);

		let response;
		if (nextLikeState) {
			response = await setLike({ id: `${product.id}` });
		} else {
			response = await deleteLike({ id: `${product.id}` });
		}

		if (response.error) {
			const error = response.error as IErrorResponse;
			setOptimisticIsLike(Boolean(isLike));
			toast.error(error.data.message);
		}
	};

	return (
		<Button
			variant='unstyled'
			className={classNames(s['card__favorite'], {
				[s['card__favorite_is-active']]: optimisticIsLike,
			})}
			onClick={toggleLike}>
			<LikeSvg />
		</Button>
	);
};
