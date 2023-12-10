import { MouseEvent } from 'react';
import Button from './Components/Button/Button';
import Input from './Components/Input/Input';

// const router = createBrowserRouter([
// 	{
// 		path: '/',
// 		element: <Menu />
// 	},
// 	{
// 		path: '/Cart',
// 		element: <Cart />
// 	},
// 	{
// 		path: '*',
// 		element: <Error />
// 	}
// ]);

function App() {
	// const [counter, setCounter] = useState<number>(0);
	// useEffect(() => {
	// 	return () => {};
	// }, []);

	// const addCounter = (e: TouchEvent) => {
	const addCounter = (e: MouseEvent) => {
		console.log(e);
	};

	return (
		<>
			{/* <Button onClick={() => setCounter((prev) => prev + 1)}> */}
			<Button onClick={addCounter}>btn</Button>
			<Button appearance="big" onClick={addCounter}>
				btn
			</Button>
			<Input />
			{/* <div>
				<Link to="/">Menu</Link>
				<Link to="/Cart">Cart</Link>
				<Link to="/something">404</Link>
			</div> */}
			{/* <Routes>
				<Route path="/" element={<Menu />} />
				<Route path="/Cart" element={<Cart />} />
				<Route path="*" element={<Error />} />
			</Routes> */}
			{/* <RouterProvider router={router} /> */}
		</>
	);
}

export default App;
