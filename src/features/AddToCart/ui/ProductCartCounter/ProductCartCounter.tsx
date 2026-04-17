import s from './ProductCartCounter.module.css';
import classNames from 'classnames';
import { useProductCartCounter } from '../../../../shared/hooks/useProductCartCounter';
import { useAddToCart } from '../../../../shared/hooks/useAddToCart';
import { ProductCartCounterProps } from './types';
import { Button } from '../../../../shared/ui/Button';
import { Input } from '../../../../shared/ui/Input';

export const ProductCartCounter = ({ product }: ProductCartCounterProps) => {
	const { count, handleCount, handleCountMinus, handleCountPlus } =
		useProductCartCounter();
	const { addProductToCart } = useAddToCart();

	return (
		<div className={classNames('product__btn-wrap')}>
			<div className={s.buttonCount}>
				<Button
					variant='unstyled'
					className={s.buttonCountMinus}
					onClick={handleCountMinus}>
					-
				</Button>
				<Input
					type='number'
					className={s.buttonCountNum}
					value={count}
					onChange={handleCount}
				/>
				<Button
					variant='unstyled'
					className={s.buttonCountPlus}
					onClick={handleCountPlus}>
					+
				</Button>
			</div>
			<Button onClick={() => addProductToCart({ ...product, count })}>
				В корзину
			</Button>
		</div>
	);
};
