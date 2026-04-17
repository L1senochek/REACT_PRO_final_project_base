import { ChangeEvent } from 'react';
import { cartActions, cartSelectors } from '../../../shared/store/slices/cart';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../shared/store/utils';

const MIN_COUNT = 1;
const MAX_COUNT = 99;

export const useCount = (productId: string) => {
	const dispatch = useDispatch();
	const products = useAppSelector(cartSelectors.getCartProducts);
	const product = products.find((p) => p.id === productId);

	const handleIncrement = () => {
		if (!product) return;
		const { id, count } = product;
		const newCount = count + 1;
		const validCount = newCount > MAX_COUNT ? MAX_COUNT : newCount;
		dispatch(cartActions.setCartProductCount({ id, count: validCount }));
	};
	const handleDecrement = () => {
		if (!product) return;
		const { id, count } = product;
		const newCount = count - 1;
		const validCount = newCount < MIN_COUNT ? MIN_COUNT : newCount;
		dispatch(cartActions.setCartProductCount({ id, count: validCount }));
	};
	const handleSetCount = (e: ChangeEvent<HTMLInputElement>) => {
		if (!product) return;
		const { id } = product;
		const newCount = +e.target.value;
		const validCount =
			newCount > MAX_COUNT
				? MAX_COUNT
				: newCount < MIN_COUNT
				? MIN_COUNT
				: newCount;
		dispatch(cartActions.setCartProductCount({ id, count: validCount }));
	};

	if (!product) {
		return {
			count: 0,
			stock: 0,
			handleSetCount,
			handleIncrement,
			handleDecrement,
		};
	}

	const { count, stock } = product;
	return { count, stock, handleSetCount, handleIncrement, handleDecrement };
};
