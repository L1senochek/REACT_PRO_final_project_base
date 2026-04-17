import { forwardRef } from 'react';
import classNames from 'classnames';
import s from './Input.module.css';
import { InputProps } from './types';

export const Input = forwardRef<HTMLInputElement, InputProps>(
	({ className, ...props }, ref) => {
		return (
			<input ref={ref} className={classNames(s.input, className)} {...props} />
		);
	}
);

Input.displayName = 'Input';
