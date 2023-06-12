import { Button } from '@mui/material';
import cn from 'classnames';
import { useUnit } from 'effector-react';
import * as React from 'react';
import { useSubmit } from '@/shared/lib';
import { CommonProps } from '@/shared/types';
import { Field } from '@/shared/ui';
import { form } from '../model';

import styles from './registration-form.module.css';

export interface RegistrationFormProps extends CommonProps {}

export const RegistrationForm: React.FC<RegistrationFormProps> = (props) => {
	const { className, } = props;
	const submit = useUnit(form.submit);

	const onSubmit = useSubmit(submit);

	return (
		<form className={cn(styles.form, className)} onSubmit={onSubmit}>
			<Login />
			<Password />
			<Button className={styles.button} type='submit'>
				Войти
			</Button>
		</form>
	);
};

const Login: React.FC = () => {
	const login = useUnit(form.fields.login);

	return (
		<Field
			className={styles.field}
			value={login.value}
			onChange={login.onChange}
			onBlur={login.onBlur}
			helperText={login.errorText}
			isValid={login.isValid}
			name='login'
			variant='outlined'
			label='Логин'
			required
		/>
	);
};

const Password: React.FC = () => {
	const password = useUnit(form.fields.password);

	return (
		<Field
			className={styles.field}
			value={password.value}
			onChange={password.onChange}
			onBlur={password.onBlur}
			helperText={password.errorText}
			isValid={password.isValid}
			name='password'
			variant='outlined'
			label='Пароль'
			type='password'
			required
		/>
	);
};
