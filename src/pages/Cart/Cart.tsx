import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CartItem from 'src/Components/CartItem/CartItem';
import Headling from 'src/Components/Headling/Headling';
import { PREFIX } from 'src/helpers/api';
import { Product } from 'src/interfaces/product.interface';
import { AppDispatch, RootState } from 'src/store/store';
import { v4 as uuidv4 } from 'uuid';
import styles from './Cart.module.css';
import { NavLink, useNavigate } from 'react-router-dom';
import Button from 'src/Components/Button/Button';
import { deleteLocalState, saveLocalState } from 'src/store/storage';
import { CART_STORAGE_KEY, cartActions } from 'src/store/cart.slice';

const DELIVERY_FEE = 169;

export function Cart() {
	const [cartProducts, setCartProducts] = useState<Product[]>([]);
	const items = useSelector((s: RootState) => s.cart.items);
	const jwt = useSelector((s: RootState) => s.user.jwt);
	const navigate = useNavigate();
	const orderPrice = items
		.map((i) => {
			const product = cartProducts.find((p) => p.id === i.id);
			if (!product) {
				return 0;
			}
			return i.count * product.price;
		})
		.reduce((acc, i) => (acc += i), 0);

	const getItem = async (id: number) => {
		const { data } = await axios.get<Product>(`${PREFIX}/products/${id}`);
		return data;
	};

	const loadAllItem = async () => {
		const res = await Promise.all(items.map((i) => getItem(i.id)));
		setCartProducts(res);
	};

	const dispatch = useDispatch<AppDispatch>();

	const clearCartItems = () => {
		dispatch(cartActions.clear());
	};

	const checkout = async () => {
		const { data } = await axios.post(
			`${PREFIX}/order`,
			{
				products: items
			},
			{
				headers: {
					Authorization: `Bearer ${jwt}`
				}
			}
		);
		console.log('api/order');
		console.log(data);
		// deleteLocalState(CART_STORAGE_KEY);
		clearCartItems();
		navigate('/success');
	};

	useEffect(() => {
		loadAllItem();
	}, [items]);

	return (
		<>
			<Headling className={styles.headling}>Корзина</Headling>
			{items.length === 0 ? (
				<div>
					В корзине пусто.
					<NavLink className={styles.link} to="/">
						Перейти в Меню?
					</NavLink>
				</div>
			) : (
				<>
					{items.map((i) => {
						const product = cartProducts.find((p) => p.id === i.id);
						if (!product) {
							return;
						}
						return <CartItem key={uuidv4()} count={i.count} {...product} />;
					})}
					<div className={styles.price}>
						<p className={styles['price-header']}>Заказ</p>
						<p className={styles['price-count']}>
							{orderPrice}
							<span className={styles['price-currency']}>&nbsp;₽</span>
						</p>
					</div>
					<hr className={styles.hr} />
					<div className={styles.price}>
						<p className={styles['price-header']}>Доставка</p>
						<p className={styles['price-count']}>
							{orderPrice ? DELIVERY_FEE : 0}
							<span className={styles['price-currency']}>&nbsp;₽</span>
						</p>
					</div>
					<hr className={styles.hr} />
					<div className={styles.price}>
						<p className={styles['price-header']}>Итого</p>
						<p className={styles['price-count']}>
							{orderPrice ? orderPrice + DELIVERY_FEE : 0}
							<span className={styles['price-currency']}>&nbsp;₽</span>
						</p>
					</div>
					<div className={styles.checkout}>
						<Button appearance="big" onClick={checkout}>
							ОФОРМИТЬ
						</Button>
					</div>
				</>
			)}
		</>
	);
}
