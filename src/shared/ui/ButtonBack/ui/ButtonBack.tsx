import { useNavigate } from 'react-router-dom';
import { ReactComponent as BackSvg } from './../../../assets/icons/back.svg';
import s from './ButtonBack.module.css';
import { Button } from '../../Button';

export const ButtonBack = () => {
	const navigate = useNavigate();
	return (
		<Button
			variant='unstyled'
			className={s['button-back']}
			onClick={() => navigate(-1)}>
			<BackSvg />
		</Button>
	);
};
