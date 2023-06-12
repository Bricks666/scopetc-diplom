import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment } from '@mui/material';
import * as React from 'react';
import { CommonProps } from '@/shared/types';
import { Field } from '@/shared/ui';

export interface SearchProps extends CommonProps {}

export const Search: React.FC<SearchProps> = (props) => {
	const { className, } = props;

	return (
		<Field
			className={className}
			InputProps={{
				startAdornment: (
					<InputAdornment position='start'>
						<SearchIcon />
					</InputAdornment>
				),
			}}
			size='small'
			placeholder='Фильмы, сериалы, шоу'
		/>
	);
};
