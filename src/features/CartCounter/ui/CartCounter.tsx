import { useCount } from '../model/useCount';
import s from './CartCounter.module.css';
import classNames from 'classnames';
import { CartCounterProps } from './types';
import { Button } from '../../../shared/ui/Button';
import { Input } from '../../../shared/ui/Input';

export const CartCounter = ({ productId }: CartCounterProps) => {
	const { count, stock, handleSetCount, handleIncrement, handleDecrement } =
		useCount(productId);

	return (
		<div className={classNames(s['button-count'])}>
			<Button
				variant='unstyled'
				onClick={handleDecrement}
				className={classNames(s['button-count__minus'])}>
				-
			</Button>
			<Input
				onChange={handleSetCount}
				type='number'
				className={classNames(s['button-count__num'])}
				value={count}
			/>
			<Button
				variant='unstyled'
				onClick={handleIncrement}
				className={classNames(s['button-count__plus'])}
				disabled={count >= stock}>
				+
			</Button>
		</div>
	);
};
