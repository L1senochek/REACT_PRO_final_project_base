import { FC, MouseEvent as ReactMouseEvent, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';
import s from './Modal.module.css';
import { ModalProps } from './types';

export const Modal: FC<ModalProps> = ({
	isOpen,
	onClose,
	children,
	className,
	contentClassName,
}) => {
	const closeButtonRef = useRef<HTMLButtonElement>(null);
	const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);
	const onCloseRef = useRef(onClose);

	useEffect(() => {
		onCloseRef.current = onClose;
	}, [onClose]);

	useEffect(() => {
		if (!isOpen) {
			return;
		}

		previouslyFocusedElementRef.current =
			document.activeElement instanceof HTMLElement
				? document.activeElement
				: null;

		const animationFrameId = window.requestAnimationFrame(() => {
			closeButtonRef.current?.focus();
		});

		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				event.preventDefault();
				onCloseRef.current();
			}
		};

		document.addEventListener('keydown', handleEscape);

		return () => {
			window.cancelAnimationFrame(animationFrameId);
			document.removeEventListener('keydown', handleEscape);

			if (previouslyFocusedElementRef.current) {
				previouslyFocusedElementRef.current.focus();
			}
		};
	}, [isOpen]);

	if (!isOpen) {
		return null;
	}

	const modalRoot = document.getElementById('modal-root');

	if (!modalRoot) {
		return null;
	}

	const handleOverlayClick = (event: ReactMouseEvent<HTMLDivElement>) => {
		if (event.target === event.currentTarget) {
			onCloseRef.current();
		}
	};

	return createPortal(
		<div
			className={classNames(s.overlay, className)}
			onClick={handleOverlayClick}
			role='presentation'>
			<div
				className={classNames(s.content, contentClassName)}
				role='dialog'
				aria-modal='true'>
				<button
					ref={closeButtonRef}
					type='button'
					className={s.closeButton}
					onClick={onCloseRef.current}
					aria-label='Close modal'>
					&times;
				</button>
				{children}
			</div>
		</div>,
		modalRoot
	);
};
