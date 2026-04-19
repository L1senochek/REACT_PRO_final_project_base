import { FC, useEffect, useRef } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
	Avatar,
	Box,
	Container,
	Link,
	TextField,
	Typography,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import { SignUpFormValues } from '../model/types';
import { signUpFormSchema } from '../model/validator';
import { userActions } from '../../../../shared/store/slices/user';
import { getMessageFromError } from '../../../../shared/utils';
import { useSignUpMutation } from '../../../../shared/store/api/authApi';

export const SignUpForm: FC = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const emailInputRef = useRef<HTMLInputElement | null>(null);
	const signUpFailureCountRef = useRef(0);
	const [signUpRequestFn] = useSignUpMutation();
	const {
		control,
		handleSubmit,
		formState: { errors, isValid, isSubmitting, isSubmitted },
	} = useForm<SignUpFormValues>({
		defaultValues: {
			email: '',
			password: '',
		},
		resolver: yupResolver(signUpFormSchema),
	});

	useEffect(() => {
		const frameId = window.requestAnimationFrame(() => {
			emailInputRef.current?.focus();
		});
		return () => window.cancelAnimationFrame(frameId);
	}, []);

	const submitHandler: SubmitHandler<SignUpFormValues> = async (values) => {
		try {
			const response = await signUpRequestFn(values).unwrap();

			signUpFailureCountRef.current = 0;
			dispatch(userActions.setUser(response.user));
			dispatch(
				userActions.setAccessToken({ accessToken: response.accessToken })
			);

			toast.success('Вы успешно зарегистрированы!');
			navigate('/');
		} catch (error) {
			signUpFailureCountRef.current += 1;
			const baseMessage = getMessageFromError(
				error,
				'Не известная ошибка при регистрации пользователя'
			);
			const hint =
				signUpFailureCountRef.current >= 3
					? ' Возможно, этот email уже занят — попробуйте другой.'
					: '';
			toast.error(baseMessage + hint);
		}
	};

	return (
		<Container component='main' maxWidth='xs' sx={{ flex: 1 }}>
			<Box
				sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}>
				<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component='h1' variant='h5'>
					Sign Up
				</Typography>
				<Box
					component='form'
					onSubmit={handleSubmit(submitHandler)}
					noValidate
					sx={{ mt: 1 }}>
					<Controller
						name='email'
						control={control}
						render={({ field }) => (
							<TextField
								margin='normal'
								label='Email Address'
								type='email'
								fullWidth
								required
								autoComplete='email'
								error={!!errors.email?.message}
								helperText={errors.email?.message}
								inputRef={emailInputRef}
								{...field}
							/>
						)}
					/>
					<Controller
						name='password'
						control={control}
						render={({ field }) => (
							<TextField
								label='Password'
								type='password'
								error={!!errors.password?.message}
								helperText={errors.password?.message}
								margin='normal'
								fullWidth
								required
								{...field}
							/>
						)}
					/>

					<LoadingButton
						type='submit'
						disabled={isSubmitted && (!isValid || isSubmitting)}
						loading={isSubmitting}
						fullWidth
						variant='contained'
						sx={{ mt: 3, mb: 2 }}>
						Sign Up
					</LoadingButton>
					<Box display='flex' justifyContent='center' flexGrow={1}>
						<Link component={RouterLink} to='/signin'>
							SIGN IN
						</Link>
					</Box>
				</Box>
			</Box>
		</Container>
	);
};
