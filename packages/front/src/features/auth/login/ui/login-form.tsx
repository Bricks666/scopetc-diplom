import { Button } from '@mui/material';
import cn from 'classnames';
import { useForm } from 'effector-forms';
import * as React from 'react';
import { useSubmit } from '@/shared/lib';
import { CommonProps } from '@/shared/types';
import { Field } from '@/shared/ui';
import { form } from '../model';

import styles from './login-form.module.css';

export interface LoginFormProps extends CommonProps {}

export const LoginForm: React.FC<LoginFormProps> = (props) => {
	const { className, } = props;
	const { fields, submit, } = useForm(form);

	const { login, password, } = fields;

	const onSubmit = useSubmit(submit);

	return (
		<form className={cn(styles.form, className)} onSubmit={onSubmit}>
			<Field
				className={styles.field}
				value={login.value}
				onChange={login.onChange}
				onBlur={login.onBlur}
				helperText={login.errorText()}
				isValid={login.isValid}
				name={login.name}
				InputProps={{ disableUnderline: true, }}
				variant='outlined'
				placeholder='Логин'
			/>
			<Field
				className={styles.field}
				value={password.value}
				onChange={password.onChange}
				onBlur={password.onBlur}
				helperText={password.errorText()}
				isValid={password.isValid}
				name={password.name}
				variant='outlined'
				InputProps={{ disableUnderline: true, }}
				placeholder='Пароль'
				type='password'
			/>
			<Button className={styles.button} type='submit'>
				Войти
			</Button>
		</form>
	);
};
