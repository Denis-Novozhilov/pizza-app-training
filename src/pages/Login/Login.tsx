// import axios from 'axios';
import { FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'src/Components/Button/Button';
import Headling from 'src/Components/Headling/Headling';
import Input from 'src/Components/Input/Input';
import { AppDispatch, RootState } from 'src/store/store';
import { loginThunk, userActions } from 'src/store/user.slice';
import styles from './Login.module.css';

export type LoginForm = {
	email: {
		value: string;
	};
	password: {
		value: string;
	};
};

function Login() {
	// const [error, setError] = useState<string | null>();
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();

	// const jwt = useSelector((s: RootState) => s.user.jwt);
	// const error = useSelector((s: RootState) => s.user.loginErrorMessage);
	const { jwt, loginErrorMessage } = useSelector((s: RootState) => s.user);

	useEffect(() => {
		if (jwt) {
			navigate('/');
		}
	}, [jwt, navigate]);

	const sendLogin = async (email: string, password: string) => {
		dispatch(loginThunk({ email, password }));
	};

	const submit = async (e: FormEvent) => {
		e.preventDefault();
		// setError(null);
		dispatch(userActions.clearLoginError());
		const target = e.target as typeof e.target & LoginForm;
		const { email, password } = target;
		await sendLogin(email.value, password.value);
	};

	return (
		<div className={styles.login}>
			<Headling className={styles.header}>Вход</Headling>
			{loginErrorMessage && <div className={styles.error}>{loginErrorMessage}</div>}
			<form className={styles.form} onSubmit={submit}>
				<div className={styles.field}>
					<label htmlFor="email">Ваш email</label>
					<Input id="email" name="email" placeholder="Email" />
				</div>
				<div className={styles.field}>
					<label htmlFor="password">Ваш пароль</label>
					<Input id="password" name="password" type="password" placeholder="Пароль" />
				</div>
				<Button appearance="big">Вход</Button>
			</form>
			<div className={styles.links}>
				<div>нет аккаунта?</div>
				<Link to="/auth/register">Зарегистрироваться</Link>
			</div>
		</div>
	);
}

export default Login;
