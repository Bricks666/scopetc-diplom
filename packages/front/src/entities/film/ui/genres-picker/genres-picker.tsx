import * as React from 'react';
import { Autocomplete } from '@mui/material';
import { useStoreMap, useUnit } from 'effector-react';
import { filmFiltersModel } from '../../models';
import { Genre } from '@/shared/api';
import { PickerProps } from '@/shared/types';
import { Field, FieldProps } from '@/shared/ui';
import { preparePickerHandler, preparePickerSelectedValue } from '@/shared/lib';

export type GenresPickerProps = PickerProps<number> &
	Omit<FieldProps, 'value' | 'onChange' | 'multiline' | 'select'>;

export const GenresPicker: React.FC<GenresPickerProps> = (props) => {
	const {
		className,
		value: ids,
		onChange: outerOnChange,
		multiple,
		limitTags,
		...rest
	} = props;
	const genres = useStoreMap({
		store: filmFiltersModel.query.$data,
		keys: [],
		fn: (data) => data.genres,
		defaultValue: [],
	});
	const loading = useUnit(filmFiltersModel.query.$pending);

	const onChange = preparePickerHandler<Genre, 'id', Genre['id']>(
		{ multiple, onChange: outerOnChange, },
		'id'
	);

	const value = preparePickerSelectedValue(
		{ multiple, value: ids, },
		genres,
		'id'
	);

	return (
		<Autocomplete
			className={className}
			loading={loading}
			options={genres}
			value={value as any}
			onChange={onChange as any}
			getOptionLabel={getOptionLabel}
			renderInput={(params) => <Field {...params} {...rest} />}
			limitTags={limitTags}
			multiple={multiple}
		/>
	);
};

const getOptionLabel = (genre: Genre) => genre.genre;
