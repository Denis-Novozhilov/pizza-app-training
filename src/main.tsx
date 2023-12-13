import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
// import App from './App.tsx';
import './index.css';
import { RouterProvider, createBrowserRouter, defer } from 'react-router-dom';
import { Cart } from './pages/Cart/Cart.tsx';
// import { Menu } from './pages/Menu/Menu.tsx';
import { Error } from './pages/Error/ErrorPage.tsx';
import { Layout } from './Layout/Menu/Layout.tsx';
import { Product } from './pages/Product/Product.tsx';
import axios from 'axios';
import { PREFIX } from './helpers/api.ts';
import { AuthLayout } from './Layout/Auth/AuthLayout.tsx';
import Login from './pages/Login/Login.tsx';
import Register from './pages/Register/Register.tsx';
import { RequireAuth } from './helpers/RequireAuth.tsx';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import { Success } from './pages/Success/Success.tsx';

const Menu = lazy(() => import('./pages/Menu/Menu.tsx'));

const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<RequireAuth>
				<Layout />
			</RequireAuth>
		),
		children: [
			{
				path: '/',
				element: (
					<Suspense fallback={<>Загрузка...</>}>
						<Menu />
					</Suspense>
				)
			},
			{
				path: '/success',
				element: <Success />
			},
			{
				path: '/cart',
				element: <Cart />
			},
			{
				path: '*',
				element: <Error />
			},
			{
				path: '/product/:id',
				element: <Product />,
				errorElement: <>Ошибка</>,
				loader: async ({ params }) => {
					return defer({
						data: axios.get(`${PREFIX}/products/${params.id}`).then((data) => data)
					});
					// return defer({
					// 	data: new Promise((resolve, reject) => {
					// 		setTimeout(() => {
					// 			axios
					// 				.get(`${PREFIX}/products/${params.id}`)
					// 				.then((data) => resolve(data))
					// 				.catch((e) => reject(e));
					// 		}, 2000);
					// 	})
					// });

					// await new Promise<void>((resolve) => {
					// 	setTimeout(() => {
					// 		resolve();
					// 	}, 500);
					// });
					// const { data } = await axios.get(`${PREFIX}/products/${params.id}`);
					// return data;
				}
			}
		]
	},
	{
		path: '/auth',
		element: <AuthLayout />,
		children: [
			{
				path: 'login',
				element: <Login />
			},
			{
				path: 'register',
				element: <Register />
			}
		]
	},
	{
		path: '*',
		element: <Error />
	}
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		{/* <App /> */}
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>
);
