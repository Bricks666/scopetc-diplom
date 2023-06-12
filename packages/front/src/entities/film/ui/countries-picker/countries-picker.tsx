import * as React from 'react';
import { Autocomplete } from '@mui/material';
import { useStoreMap, useUnit } from 'effector-react';
import { filmFiltersModel } from '../../models';
import { Country } from '@/shared/api';
import { PickerProps } from '@/shared/types';
import { Field, FieldProps } from '@/shared/ui';
import { preparePickerHandler, preparePickerSelectedValue } from '@/shared/lib';

export type CountriesPickerProps = PickerProps<number> &
	Omit<FieldProps, 'value' | 'onChange' | 'multiline' | 'select'>;

export const CountriesPicker: React.FC<CountriesPickerProps> = (props) => {
	const {
		className,
		value: ids,
		onChange: outerOnChange,
		multiple,
		limitTags,
		...rest
	} = props;
	const countries = useStoreMap({
		store: filmFiltersModel.query.$data,
		keys: [],
		fn: (data) => data.countries,
		defaultValue: [],
	});
	const loading = useUnit(filmFiltersModel.query.$pending);

	const onChange = preparePickerHandler<Country, 'id', Country['id']>(
		{ multiple, onChange: outerOnChange, },
		'id'
	);

	const value = preparePickerSelectedValue(
		{ multiple, value: ids, },
		countries,
		'id'
	);

	return (
		<Autocomplete
			className={className}
			loading={loading}
			options={countries}
			value={value as any}
			onChange={onChange as any}
			getOptionLabel={getOptionLabel}
			renderInput={(params) => <Field {...params} {...rest} />}
			limitTags={limitTags}
			multiple={multiple}
		/>
	);
};

const getOptionLabel = (country: Country) => country.country;
