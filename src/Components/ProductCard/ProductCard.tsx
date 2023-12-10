import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import CartIcon from 'src/assets/icons/CartIcon';
import StarIcon from 'src/assets/icons/StarIcon';
import { cartActions } from 'src/store/cart.slice';
import { AppDispatch } from 'src/store/store';
import styles from './ProductCard.module.css';
import { ProductCardProps } from './ProductCard.props';

function ProductCard(props: ProductCardProps) {
	const dispatch = useDispatch<AppDispatch>();

	const add = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		dispatch(cartActions.add(props.id));
	};

	return (
		<Link to={`/product/${props.id}`} className={styles.link}>
			<div className={styles.card}>
				<div
					className={styles.head}
					style={{ background: `center / cover no-repeat url('${props.image}')` }}
				>
					<div className={styles.price}>
						{props.price}
						<span className={styles.currency}>&nbsp;₽</span>
					</div>
					<button className={styles['add-to-cart']} onClick={add}>
						<CartIcon className={styles['add-cart-icon']} />
					</button>
					<div className={styles.rating}>
						{props.rating}&nbsp;
						<StarIcon className={styles['rating-icon']} />
					</div>
				</div>
				<div className={styles.footer}>
					<div className={styles.name}>{props.name}</div>
					<div className={styles.description}>{props.description}</div>
				</div>
			</div>
		</Link>
	);
}

export default ProductCard;
