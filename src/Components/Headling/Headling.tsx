import cn from 'classnames';
import { HeadlingProps } from './Headling.props';
import styles from './Headling.module.css';
function Headling({ children, className, ...props }: HeadlingProps) {
	return (
		<h1 className={cn(className, styles.header)} {...props}>
			{children}
		</h1>
	);
}
export default Headling;
