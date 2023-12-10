// import cn from 'classnames';
// import Button from 'components/Button/Button';
import { Outlet } from 'react-router-dom';
import styles from './AuthLayout.module.css';
import PizzaLogo from 'src/assets/logos/PizzaLogo';

export function AuthLayout() {
	return (
		<div className={styles.layout}>
			<div className={styles.logo}>
				<PizzaLogo />
			</div>
			<div className={styles.content}>
				<Outlet />
			</div>
		</div>
	);
}
