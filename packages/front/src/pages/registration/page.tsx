import { Paper, Typography } from '@mui/material';
import { Link } from 'atomic-router-react';
import * as React from 'react';
import { RegistrationForm } from '@/features/auth';
import { LogoIcon, MainLayout } from '@/shared/ui';
import './model';

import styles from './page.module.css';
import { routes } from '@/shared/config';

const Login: React.FC = () => {
	return (
		<MainLayout className={styles.layout}>
			<Paper className={styles.wrapper} variant='outlined'>
				<div className={styles.top}>
					<LogoIcon className={styles.logo} />
					<Typography className={styles.title} variant='h5' component='p'>
						Регистрация
					</Typography>
				</div>
				<RegistrationForm />
				<Typography className={styles.bottom} variant='h5' component='p'>
					Есть аккаунт?
					<Typography
						className={styles.link}
						to={routes.login}
						component={Link}>
						Войти
					</Typography>
				</Typography>
			</Paper>
		</MainLayout>
	);
};

export default Login;
