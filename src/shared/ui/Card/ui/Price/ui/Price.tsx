import classNames from 'classnames';
import s from './Price.module.css';
import { PriceProps } from './types';

export const Price = ({ price, discountPrice }: PriceProps) => {
	return (
		<div className={classNames(s['price-small'], s['price-wrap'])}>
			<span className={classNames(s['price_old'], s['price_left'])}>
				{`${price}₽`}
			</span>
			<span className={classNames(s['price_discount'], s['price'])}>
				{`${price - discountPrice}₽`}
			</span>
		</div>
	);
};
