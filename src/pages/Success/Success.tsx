import { useNavigate } from 'react-router-dom';
import Button from 'src/Components/Button/Button';
import PizzaLogo from 'src/assets/logos/PizzaLogo';
import styles from './Success.module.css';

export const Success = () => {
	const navigate = useNavigate();
	return (
		<>
			<div className={styles.success}>
				<PizzaLogo className={styles['success-img']} />
				<div className="">Ваш заказ успешно оформлен</div>
				<Button
					appearance="big"
					onClick={() => {
						navigate('/');
					}}
				>
					СДЕЛАТЬ НОВЫЙ
				</Button>
			</div>
		</>
	);
};
