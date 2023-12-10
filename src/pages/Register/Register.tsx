// import axios from 'axios';
import { FormEvent, useEffect } from 'react';
import Headling from 'src/Components/Headling/Headling';
// import { PREFIX } from 'src/helpers/api';
// import { Product } from 'src/interfaces/product.interface';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'src/Components/Button/Button';
import Input from 'src/Components/Input/Input';
import { AppDispatch, RootState } from 'src/store/store';
import { registrationThunk, userActions } from 'src/store/user.slice';
import styles from './Register.module.css';
// import { MenuList } from './MenuList/MenuList';

export type RegisterForm = {
	email: {
		value: string;
	};
	name: {
		value: string;
	};
	password: {
		value: string;
	};
};

function Register() {
	// const [error, setError] = useState<string | null>();
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();

	const { jwt, registrationErrorMessage } = useSelector((s: RootState) => s.user);

	useEffect(() => {
		if (registrationErrorMessage) {
			dispatch(userActions.clearRegisterError());
		}
		if (jwt) {
			navigate('/');
		}
	}, [jwt, navigate]);

	const sendRegistration = async (email: string, name: string, password: string) => {
		dispatch(registrationThunk({ email, name, password }));
	};

	const submit = async (e: FormEvent) => {
		e.preventDefault();
		dispatch(userActions.clearRegisterError());
		const target = e.target as typeof e.target & RegisterForm;
		const { email, name, password } = target;
		await sendRegistration(email.value, name.value, password.value);
	};

	return (
		<div className={styles.login}>
			<Headling className={styles.header}>Регистрация</Headling>
			{registrationErrorMessage && <div className={styles.error}>{registrationErrorMessage}</div>}
			<form className={styles.form} onSubmit={submit}>
				<div className={styles.field}>
					<label htmlFor="email">Ваш email</label>
					<Input id="email" name="email" placeholder="Email" />
				</div>
				<div className={styles.field}>
					<label htmlFor="password">Ваш пароль</label>
					<Input id="password" name="password" type="password" placeholder="Пароль" />
				</div>
				<div className={styles.field}>
					<label htmlFor="name">Ваше имя</label>
					<Input id="name" name="name" placeholder="Имя" />
				</div>
				<Button appearance="big">Зарегистрироваться</Button>
			</form>
			<div className={styles.links}>
				<div>Уже есть аккаунт?</div>
				<Link to="/auth/login">Войти</Link>
			</div>
		</div>
	);
}

export default Register;
