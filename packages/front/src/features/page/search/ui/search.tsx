import { InputAdornment } from '@mui/material';
import cn from 'classnames';
import * as React from 'react';
import { CommonProps } from '@/shared/types';
import { Field, SearchIcon } from '@/shared/ui';

import styles from './search.module.css';

export interface SearchProps extends CommonProps {}

export const Search: React.FC<SearchProps> = (props) => {
	const { className, } = props;

	return (
		<Field
			className={cn(styles.field, className)}
			InputProps={{
				startAdornment: (
					<InputAdornment className={styles.icon} position='start'>
						<SearchIcon />
					</InputAdornment>
				),
			}}
			size='small'
			placeholder='Поиск'
		/>
	);
};
