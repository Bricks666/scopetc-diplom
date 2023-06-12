import { Paper, Typography, Link as MUILink } from '@mui/material';
import { Link } from 'atomic-router-react';
import * as React from 'react';
import { RegistrationForm } from '@/features/auth';
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
							Регистрация
						</Typography>
					</div>
					<RegistrationForm />
					<Typography className={styles.bottom} variant='h6' component='p'>
						Есть аккаунт? <br />
						<MUILink
							className={styles.link}
							to={routes.login}
							color='inherit'
							variant='subtitle1'
							underline='always'
							component={Link}>
							Войти
						</MUILink>
					</Typography>
				</Paper>
			</Center>
		</MainLayout>
	);
};

export default Login;
