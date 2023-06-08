import { AppBar, Button, Container, IconButton, Toolbar } from '@mui/material';
import { Link } from 'atomic-router-react';
import cn from 'classnames';
import { useUnit } from 'effector-react';
import * as React from 'react';
import { Navigation, Search } from '@/features/page';
import { authUserModel } from '@/entities/auth-user';
import { routes } from '@/shared/config';
import { CommonProps } from '@/shared/types';
import { AvatarIcon, EyeIcon, LogoIcon } from '@/shared/ui';

import styles from './header.module.css';

export interface HeaderProps extends CommonProps {}

export const Header: React.FC<HeaderProps> = (props) => {
	const { className, } = props;
	const isAuth = useUnit(authUserModel.$isAuth);

	return (
		<AppBar
			className={cn(styles.wrapper, className)}
			position='static'
			color='transparent'>
			<Toolbar>
				<Container className={styles.container}>
					<LogoIcon className={styles.logo} />
					<Navigation className={styles.navigation} />
					<IconButton className={styles.accessability}>
						<EyeIcon />
					</IconButton>
					<Search className={styles.search} />
					{isAuth ? (
						<IconButton className={styles.account}>
							<AvatarIcon />
						</IconButton>
					) : (
						<Button to={routes.login} color='inherit' component={Link}>
							Войти
						</Button>
					)}
				</Container>
			</Toolbar>
		</AppBar>
	);
};
