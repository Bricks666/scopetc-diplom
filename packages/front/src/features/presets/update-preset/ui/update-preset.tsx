import { Popover } from '@mui/material';
import * as React from 'react';

import { CommonProps, VoidFunction } from '@/shared/types';
import { PresetForm } from '../../shared/ui';
import { form } from '../model';

export interface UpdatePresetProps extends CommonProps {
	readonly open: boolean;
	readonly onClose: VoidFunction;
	readonly anchorEl: HTMLElement | null;
}

export const UpdatePreset: React.FC<UpdatePresetProps> = (props) => {
	const { className, open, onClose, anchorEl, } = props;

	return (
		<Popover open={open} anchorEl={anchorEl} onClose={onClose}>
			<PresetForm className={className} $form={form} />
		</Popover>
	);
};
