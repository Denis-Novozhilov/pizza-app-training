import { useDispatch } from 'react-redux';
import { cartActions } from 'src/store/cart.slice';
import { AppDispatch } from 'src/store/store';
import styles from './CartItem.module.css';
import { CartItemProps } from './CartItem.props';
import MinuseIcon from 'src/assets/icons/MinuseIcon';
import PlusIcon from 'src/assets/icons/PlusIcon';
import RemoveIcon from 'src/assets/icons/RemoveIcon';

const CartItem = (props: CartItemProps) => {
	const dispatch = useDispatch<AppDispatch>();

	const increase = () => {
		dispatch(cartActions.increase(props.id));
	};
	const decrease = () => {
		dispatch(cartActions.decrease(props.id));
	};
	const remove = () => {
		dispatch(cartActions.remove(props.id));
	};

	return (
		<div className={styles.item}>
			<div className={styles.image} style={{ backgroundImage: `url('${props.image}')` }}></div>
			<div className={styles.description}>
				<div className={styles.name}>{props.name}</div>
				<span className={styles.price}>{props.price}&nbsp;₽</span>
			</div>
			<div className={styles.actions}>
				<button className={styles.button} onClick={decrease}>
					<MinuseIcon className={styles['icon']} />
				</button>
				<div className={styles['count-number']}>{props.count}</div>
				<button className={styles.button} onClick={increase}>
					<PlusIcon className={styles['icon']} />
				</button>
				<button className={styles.button} onClick={remove}>
					<RemoveIcon className={styles['icon-remove']} />
				</button>
			</div>
		</div>
	);
};

export default CartItem;
