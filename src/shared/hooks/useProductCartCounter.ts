import { ChangeEvent, useCallback, useState } from 'react';

const MIN_COUNT = 1;
const MAX_COUNT = 99;

export const useProductCartCounter = () => {
	const [count, setCount] = useState<number>(1);

	const handleCountPlus = useCallback(() => {
		setCount((c) => (c + 1 > MAX_COUNT ? MAX_COUNT : c + 1));
	}, []);

	const handleCountMinus = useCallback(() => {
		setCount((c) => (c - 1 < MIN_COUNT ? MIN_COUNT : c - 1));
	}, []);

	const handleCount = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		const newCount = +e.target.value;
		if (Number.isNaN(newCount)) return;
		const validCount =
			newCount > MAX_COUNT
				? MAX_COUNT
				: newCount < MIN_COUNT
				? MIN_COUNT
				: newCount;
		setCount(validCount);
	}, []);

	return { count, handleCount, handleCountMinus, handleCountPlus };
};
