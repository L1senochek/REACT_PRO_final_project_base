import './styles/normalize.css';
import './styles/styles.css';
import { Outlet } from 'react-router-dom';
import { Header } from '../widgets/Header';
import { Sort } from '../features/ProductsSort';
import { Footer } from '../widgets/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
	return (
		<>
			<Header />
			<main className={'main'}>
				<Sort />
				<Outlet />
				<ToastContainer
					position='top-right'
					autoClose={5000}
					hideProgressBar={false}
					pauseOnHover
					theme='colored'
				/>
			</main>
			<Footer />
		</>
	);
};
