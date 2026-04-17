import { Link } from 'react-router-dom';
import s from './NotFoudPage.module.css';
import { Button } from '../../../shared/ui/Button';

export const NotFoundPage = () => {
	return (
		<div className={s.NotFoundPage}>
			<h1>Страница на найдена</h1>
			<Link to='/'>
				<Button variant='unstyled'>Перейти на главную</Button>
			</Link>
		</div>
	);
};
