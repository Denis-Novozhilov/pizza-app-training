import CartIcon from 'src/assets/icons/CartIcon';
import ExitIcon from 'src/assets/icons/ExitIcon';
import ListIcon from 'src/assets/icons/ListIcon';
import ProfileIcon from 'src/assets/icons/ProfileIcon';
import cn from 'classnames';
import Button from 'components/Button/Button';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import styles from './Layout.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'src/store/store';
import { getProfileThunk, userActions } from 'src/store/user.slice';
import { useEffect } from 'react';
import { cartCounter } from './helpers/cartCounter';

export function Layout() {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const items = useSelector((s: RootState) => s.cart.items);
	const cartInners = cartCounter(items);

	const getProfile = async () => {
		dispatch(userActions.clearProfileError());
		dispatch(getProfileThunk());
	};

	useEffect(() => {
		getProfile();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const logout = () => {
		dispatch(userActions.logout());
		navigate('auth/login');
	};

	const { profile } = useSelector((s: RootState) => s.user);
	// const profileErr = useSelector((s: RootState) => s.user.profileErrorMessage);

	return (
		<div className={styles.layout}>
			<div className={styles.sidebar}>
				<div className={styles.user}>
					<NavLink
						className={({ isActive }) =>
							cn(styles.userLink, {
								[styles.active]: isActive
							})
						}
						to="/profile"
					>
						<ProfileIcon className={styles.avatar} />
						<div className={styles.name}>{profile?.name}</div>
						<div className={styles.email}>{profile?.email}</div>
						{/* <code>{`${JSON.stringify(profile, null, 2)}`}</code> */}
						{/* <code>{`${profileErr}`}</code> */}
					</NavLink>
				</div>
				<div className={styles.menu}>
					<NavLink
						className={({ isActive }) =>
							cn(styles.link, {
								[styles.active]: isActive
							})
						}
						to="/"
					>
						<ListIcon className={styles.linkIcon} />
						Меню
					</NavLink>
					<NavLink
						className={({ isActive }) =>
							cn(styles.link, {
								[styles.active]: isActive
							})
						}
						to="/cart"
					>
						<CartIcon className={styles.linkIcon} />
						{cartInners ? <div className={styles.cartCounter}>{cartInners}</div> : null}
						{cartInners > 9 ? <div className={styles.cartCounterSuperLabel}>{'=^_^='}</div> : null}
						Корзина
					</NavLink>
					<NavLink
						className={({ isActive }) =>
							cn(styles.link, {
								[styles.active]: isActive
							})
						}
						to="/notfound"
					>
						404
					</NavLink>
				</div>
				<Button className={styles.exit} onClick={logout}>
					<ExitIcon className={styles.exitIcon} />
					Выход
				</Button>
			</div>
			<div className={styles.content}>
				<Outlet />
			</div>
		</div>
	);
}
