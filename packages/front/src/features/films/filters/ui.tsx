import { useUnit } from 'effector-react';
import * as React from 'react';
import cn from 'classnames';
import {
	FormControl,
	FormHelperText,
	FormLabel,
	MenuItem,
	Slider
} from '@mui/material';
import { CommonProps } from '@/shared/types';
import { form } from './model';
import { Field } from '@/shared/ui';
import { SEARCH_FILM_TYPE, SEARCH_ORDER } from '@/shared/api';

import styles from './styles.module.css';

export interface SearchFilmFiltersProps extends CommonProps {}

export const SearchFilmFilters: React.FC<SearchFilmFiltersProps> = (props) => {
	const { className, } = props;

	return (
		<form className={cn(styles.form, className)}>
			<Order />
			<Type />
			<Rating />
			<Years />
		</form>
	);
};

const Order: React.FC = () => {
	const order = useUnit(form.fields.order);
	const options = Object.entries(SEARCH_ORDER);

	return (
		<Field
			value={order.value}
			onChange={order.onChange}
			onBlur={order.onBlur}
			helperText={order.errorText}
			isValid={order.isValid}
			name='order'
			InputProps={{ disableUnderline: true, }}
			variant='outlined'
			placeholder='Порядок сортировки'
			select>
			{options.map(([value, label]) => (
				<MenuItem value={value} key={value}>
					{label}
				</MenuItem>
			))}
		</Field>
	);
};

const Type: React.FC = () => {
	const type = useUnit(form.fields.type);
	const options = Object.entries(SEARCH_FILM_TYPE);

	return (
		<Field
			value={type.value}
			onChange={type.onChange}
			onBlur={type.onBlur}
			helperText={type.errorText}
			isValid={type.isValid}
			name='order'
			InputProps={{ disableUnderline: true, }}
			variant='outlined'
			placeholder='Тип'
			select>
			{options.map(([value, label]) => (
				<MenuItem value={value} key={value}>
					{label}
				</MenuItem>
			))}
		</Field>
	);
};

const Rating: React.FC = () => {
	const ratingFrom = useUnit(form.fields.ratingFrom);
	const ratingTo = useUnit(form.fields.ratingTo);

	const id = React.useId();

	const value = [ratingFrom.value, ratingTo.value];

	const error = !(ratingFrom.isValid && ratingTo.isValid);
	const errorText = [ratingFrom.errorText, ratingTo.errorText].join(' ').trim();

	const onChange = (_: unknown, value: number | number[]) => {
		if (!Array.isArray(value)) {
			return;
		}
		ratingFrom.onChange(value[0]);
		ratingTo.onChange(value[1]);
	};

	return (
		<FormControl error={error}>
			<FormLabel htmlFor={id}>Рейтин фильма</FormLabel>
			<Slider
				id={id}
				value={value}
				onChange={onChange}
				min={0}
				max={10}
				valueLabelDisplay='auto'
				disableSwap
			/>
			{errorText ? <FormHelperText>{errorText}</FormHelperText> : null}
		</FormControl>
	);
};

const Years: React.FC = () => {
	const yearFrom = useUnit(form.fields.yearFrom);
	const yearTo = useUnit(form.fields.yearTo);

	const id = React.useId();

	const value = [yearFrom.value, yearTo.value];

	const error = !(yearFrom.isValid && yearTo.isValid);
	const errorText = [yearFrom.errorText, yearTo.errorText].join(' ').trim();

	const onChange = (_: unknown, value: number | number[]) => {
		if (!Array.isArray(value)) {
			return;
		}
		yearFrom.onChange(value[0]);
		yearTo.onChange(value[1]);
	};

	return (
		<FormControl error={error}>
			<FormLabel htmlFor={id}>Год выхода фильма</FormLabel>
			<Slider
				id={id}
				value={value}
				onChange={onChange}
				min={1950}
				max={new Date().getFullYear()}
				valueLabelDisplay='auto'
				disableSwap
			/>
			{errorText ? <FormHelperText>{errorText}</FormHelperText> : null}
		</FormControl>
	);
};
