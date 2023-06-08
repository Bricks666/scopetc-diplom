import { Typography } from '@mui/material';
import { Link } from 'atomic-router-react';
import cn from 'classnames';
import * as React from 'react';
import { routes } from '@/shared/config';
import { CommonProps } from '@/shared/types';

import styles from './navigation.module.css';

export interface NavigationProps extends CommonProps {}

const items = [
	{
		route: routes.home,
		label: 'Главная',
	},
	{
		label: 'Телеканалы',
	},
	{
		label: 'Фильмы',
	},
	{
		label: 'Сериалы',
	}
];

export const Navigation: React.FC<NavigationProps> = (props) => {
	const { className, } = props;

	return (
		<nav className={cn(styles.nav, className)}>
			<ul className={styles.list}>
				{items.map((item) => {
					if (item.route) {
						return (
							<li className={styles.item} key={item.label}>
								<Typography
									className={styles.link}
									activeClassName={styles.active}
									to={item.route}
									variant='h5'
									component={Link}>
									{item.label}
								</Typography>
							</li>
						);
					}

					return (
						<li className={styles.item} key={item.label}>
							<Typography className={styles.link} variant='button'>
								{item.label}
							</Typography>
						</li>
					);
				})}
			</ul>
		</nav>
	);
};
