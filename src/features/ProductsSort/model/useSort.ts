import { useAppDispatch, useAppSelector } from '../../../shared/store/utils';
import {
	productsActions,
	productsSelectors,
} from '../../../shared/store/slices/products';

interface SortParams {
	title: string;
	value: Sort;
}

export const useSort = () => {
	const dispatch = useAppDispatch();
	const sort = useAppSelector(productsSelectors.getSort);

	const setSort = (newSort: Sort) => {
		dispatch(productsActions.setSort(newSort));
	};

	const sortParams: SortParams[] = [
		{ title: 'Дешевые', value: 'low-price' },
		{ title: 'Дорогие', value: 'high-price' },
		{ title: 'Новые', value: 'newest' },
		{ title: 'Старые', value: 'oldest' },
	];
	return { sort, setSort, sortParams };
};
