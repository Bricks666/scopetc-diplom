import { Paper, Typography, Link as MUILink } from '@mui/material';
import { Link } from 'atomic-router-react';
import * as React from 'react';
import { LoginForm } from '@/features/auth';
import { routes } from '@/shared/config';
import { Center, Logo, MainLayout } from '@/shared/ui';
import './model';

import styles from './page.module.css';

const Login: React.FC = () => {
	return (
		<MainLayout>
			<Center fullHeight>
				<Paper className={styles.wrapper} variant='outlined'>
					<div className={styles.top}>
						<Logo className={styles.logo} />
						<Typography className={styles.title} variant='h5' component='p'>
							Авторизация
						</Typography>
					</div>
					<LoginForm />
					<Typography className={styles.bottom} variant='h6' component='p'>
						Нет аккаунта KION? <br />
						<MUILink
							className={styles.link}
							to={routes.registration}
							color='inherit'
							variant='subtitle1'
							underline='always'
							component={Link}>
							Зарегистрироваться
						</MUILink>
					</Typography>
				</Paper>
			</Center>
		</MainLayout>
	);
};

export default Login;
