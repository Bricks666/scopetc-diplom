import {
	Slider as MUISlider,
	SliderProps as MUISliderProps,
	Typography,
	TypographyProps
} from '@mui/material';
import { ConnectedField } from 'effector-forms';
import * as React from 'react';

import { CommonProps } from '@/shared/types';

export interface SliderProps
	extends CommonProps,
		Pick<ConnectedField<any>, 'name' | 'onChange' | 'value'>,
		Omit<MUISliderProps, keyof ConnectedField<any>> {
	readonly label?: string | null;
	readonly TypographyProps?: TypographyProps;
	readonly containerClassName?: string;
}

export const Slider: React.FC<SliderProps> = React.memo((props) => {
	const { label, onChange, containerClassName, ...rest } = props;

	const handleChange = (_: unknown, value: number | number[]) => {
		onChange(value);
	};
	return (
		<div className={containerClassName}>
			{label ? <Typography gutterBottom>{label}</Typography> : null}
			<MUISlider onChange={handleChange} {...rest} />
		</div>
	);
});
