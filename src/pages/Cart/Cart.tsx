import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CartItem from 'src/Components/CartItem/CartItem';
import Headling from 'src/Components/Headling/Headling';
import { PREFIX } from 'src/helpers/api';
import { Product } from 'src/interfaces/product.interface';
import { RootState } from 'src/store/store';
import { v4 as uuidv4 } from 'uuid';
import styles from './Cart.module.css';

export function Cart() {
	const [cartProducts, setCartProducts] = useState<Product[]>([]);
	const items = useSelector((s: RootState) => s.cart.items);

	const getItem = async (id: number) => {
		const { data } = await axios.get<Product>(`${PREFIX}/products/${id}`);
		return data;
	};

	const loadAllItem = async () => {
		const res = await Promise.all(items.map((i) => getItem(i.id)));
		setCartProducts(res);
	};

	useEffect(() => {
		loadAllItem();
	}, [items]);

	return (
		<>
			<Headling className={styles.headling}>Корзина</Headling>
			{items.map((i) => {
				const product = cartProducts.find((p) => p.id === i.id);
				if (!product) {
					return;
				}
				return <CartItem key={uuidv4()} count={i.count} {...product} />;
			})}
		</>
	);
}
