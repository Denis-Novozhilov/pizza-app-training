import axios from 'axios';
import React, { ChangeEvent, useEffect, useState } from 'react';
import Headling from 'src/Components/Headling/Headling';
import Search from 'src/Components/Search/Search';
import { PREFIX } from 'src/helpers/api';
import { Product } from 'src/interfaces/product.interface';
import styles from './Menu.module.css';
import { MenuList } from './MenuList/MenuList';

function Menu() {
	const [products, setProducts] = useState<Product[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [TimeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout>>();
	const [error, setError] = useState<string | undefined>();
	const [filter, setFilter] = useState<string>();

	const getMenu = async (name?: string) => {
		setIsLoading(true);
		// await new Promise<void>((resolve) => {
		// 	setTimeout(() => {
		// 		resolve();
		// 	}, 500);
		// });
		axios
			.get<Product[]>(`${PREFIX}/products`, { params: { name } })
			.then((response) => {
				setProducts(response.data);
				setIsLoading(false);
			})
			.catch((error) => {
				console.error('Ошибка запроса', error);
				setError(error.message);
				setIsLoading(false);
				return;
			});
	};

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const debounce = <T extends (...args: any[]) => void>(func: T, delay: number) => {
		let timeoutId: ReturnType<typeof setTimeout>;

		return function (...args: Parameters<T>) {
			clearTimeout(timeoutId);
			timeoutId = setTimeout(() => func(...args), delay);
			setTimeoutId(timeoutId);
		};
	};

	const debouncedFetchData = React.useMemo(() => debounce(getMenu, 500), []);

	useEffect(() => {
		debouncedFetchData(filter);
		return () => {
			if (TimeoutId) {
				clearTimeout(TimeoutId);
			}
		};
	}, [filter]);

	return (
		<>
			<div className={styles['head-box']}>
				<Headling>Меню</Headling>
				<Search
					placeholder="Введите блюдо или состав"
					onChange={(event: ChangeEvent<HTMLInputElement>) => setFilter(event.target.value)}
				/>
			</div>
			<div className="">
				{error && <code>{error}</code>}
				{isLoading && <code>Загружаем продукты...</code>}
				{!isLoading && products.length > 0 && <MenuList products={products} />}
				{!isLoading && products.length === 0 && <code>Не найдено блюд по запросу</code>}
			</div>
		</>
	);
}

export default Menu;
