import {
	AppBar,
	Container,
	IconButton,
	Toolbar,
	Link as MUILink,
	Tooltip
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'atomic-router-react';
import cn from 'classnames';
import { useUnit } from 'effector-react';
import * as React from 'react';
import { Navigation } from '@/features/page';
import { sessionModel } from '@/shared/models';
import { routes } from '@/shared/config';
import { CommonProps } from '@/shared/types';
import { LogoIcon } from '@/shared/ui';

import styles from './header.module.css';
import { Search } from '@/features/films';

export interface HeaderProps extends CommonProps {}

export const Header: React.FC<HeaderProps> = (props) => {
	const { className, } = props;
	const isAuth = useUnit(sessionModel.$isAuth);

	return (
		<AppBar
			className={cn(styles.wrapper, className)}
			position='sticky'
			variant='outlined'
			color='default'>
			<Toolbar>
				<Container className={styles.container} maxWidth='xl'>
					<LogoIcon className={styles.logo} />
					<Navigation />
					<Search className={styles.search} />
					{isAuth ? (
						<Tooltip title='Аккаунт пользователя'>
							<IconButton>
								<AccountCircleIcon />
							</IconButton>
						</Tooltip>
					) : (
						<MUILink
							to={routes.login}
							color='inherit'
							underline='hover'
							component={Link}>
							Войти
						</MUILink>
					)}
				</Container>
			</Toolbar>
		</AppBar>
	);
};
