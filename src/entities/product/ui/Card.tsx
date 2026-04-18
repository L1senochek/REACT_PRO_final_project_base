import classNames from 'classnames';
import s from './Card.module.css';
import { Price } from '../../../shared/ui/Card/ui/Price/ui/Price';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../shared/store/utils';
import { cartSelectors } from '../../../shared/store/slices/cart';
import { useAddToCart } from '../../../shared/hooks/useAddToCart';
import { LikeButton } from '../../../features/ProductLike';
import { CartCounter } from '../../../features/CartCounter';
import { CardProps } from './types';
import { Button } from '../../../shared/ui/Button';
import { memo, useCallback } from 'react';

export const Card = memo(({ product }: CardProps) => {
	const { discount, price, name, tags, id, images } = product;
	const isProductInCart = useAppSelector((state) =>
		cartSelectors.getCartProducts(state).some((p) => p.id === id)
	);
	const { addProductToCart } = useAddToCart();
	const handleAddToCart = useCallback(() => {
		addProductToCart({ ...product, count: 1 });
	}, [addProductToCart, product]);

	return (
		<article className={s['card']}>
			<div
				className={classNames(
					s['card__sticky'],
					s['card__sticky_type_top-left']
				)}>
				<span className={s['card__discount']}>{discount}</span>
				{(tags?.length ?? 0) > 0 &&
					(tags ?? []).map((t) => (
						<span key={t} className={classNames(s['tag'], s['tag_type_new'])}>
							{t}
						</span>
					))}
			</div>
			<div
				className={classNames(
					s['card__sticky'],
					s['card__sticky_type_top-right']
				)}>
				<LikeButton product={product} />
			</div>
			<Link className={s['card__link']} to={`/products/${id}`}>
				<img
					src={images}
					alt={name}
					className={s['card__image']}
					loading='lazy'
				/>
				<div className={s['card__desc']}>
					<Price price={price} discountPrice={discount} />
					<h3 className={s['card__name']}>{name}</h3>
				</div>
			</Link>
			{isProductInCart ? (
				<CartCounter productId={id} />
			) : (
				<Button
					onClick={handleAddToCart}
					disabled={isProductInCart}
					className={classNames(
						s['card__cart'],
						s['card__btn'],
						s['card__btn_type_primary']
					)}>
					В корзину
				</Button>
			)}
		</article>
	);
});
