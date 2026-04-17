import { FC } from 'react';
import classNames from 'classnames';
import s from './Button.module.css';
import { ButtonProps } from './types';

export const Button: FC<ButtonProps> = ({
	variant = 'primary',
	fullWidth = false,
	className,
	type = 'button',
	...props
}) => {
	return (
		<button
			type={type}
			className={classNames(
				variant !== 'unstyled' && s.button,
				variant === 'primary' && s.buttonPrimary,
				variant === 'ghost' && s.buttonGhost,
				fullWidth && s.fullWidth,
				className
			)}
			{...props}
		/>
	);
};
