import { Suspense } from 'react';
import { Await, useLoaderData } from 'react-router-dom';
import { Product } from 'src/interfaces/product.interface';

export function Product() {
	const data = useLoaderData() as { data: Product };

	return (
		<>
			<Suspense fallback="Загрузка продукта...">
				<Await resolve={data.data}>{({ data }: { data: Product }) => <>Product - {data.name}</>}</Await>
			</Suspense>
		</>
	);
}
