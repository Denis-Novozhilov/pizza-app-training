import { useDispatch } from 'react-redux';
import { cartActions } from 'src/store/cart.slice';
import { AppDispatch } from 'src/store/store';
import styles from './CartItem.module.css';
import { CartItemProps } from './CartItem.props';

const CartItem = (props: CartItemProps) => {
	// const dispatch = useDispatch<AppDispatch>();

	const increase = () => {
		// dispatch(cartActions.increase(props.id));
	};
	const decrease = () => {
		// dispatch(cartActions.decrease(props.id));
	};
	const remove = () => {
		// dispatch(cartActions.remove(props.id));
	};

	return (
		<div className={styles.item}>
			<div className={styles.image} style={{ backgroundImage: `url('${props.image}')` }}></div>
			<div className={styles.description}>
				<div className={styles.name}>{props.name}</div>
				{props.price}
				<span className={styles.currency}>&nbsp;₽</span>
			</div>
			<div className={styles.actions}>
				<button className={styles.button} onClick={increase}>
					increase
				</button>
				<button className={styles.button} onClick={decrease}>
					decrease
				</button>
				<div>{props.count}</div>
				<button className={styles.remove} onClick={remove}>
					remove
				</button>
			</div>
		</div>
	);
};

export default CartItem;
