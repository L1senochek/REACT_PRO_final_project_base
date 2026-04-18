import { cartActions } from '../store/slices/cart';
import { useAppDispatch } from '../store/utils';
import { useCallback } from 'react';

export const useAddToCart = () => {
	const dispatch = useAppDispatch();
	const addProductToCart = useCallback(
		(cartProduct: CartProduct) => {
			dispatch(cartActions.addCartProduct(cartProduct));
		},
		[dispatch]
	);

	return { addProductToCart };
};
