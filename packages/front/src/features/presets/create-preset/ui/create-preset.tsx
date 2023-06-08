import { Popover } from '@mui/material';
import * as React from 'react';

import { CommonProps, VoidFunction } from '@/shared/types';
import { PresetForm } from '../../shared/ui';
import { form } from '../model';

export interface CreatePresetProps extends CommonProps {
	readonly open: boolean;
	readonly onClose: VoidFunction;
	readonly anchorEl: HTMLElement | null;
}

export const CreatePreset: React.FC<CreatePresetProps> = (props) => {
	const { className, open, onClose, anchorEl, } = props;

	return (
		<Popover open={open} anchorEl={anchorEl} onClose={onClose}>
			<PresetForm className={className} $form={form} />
		</Popover>
	);
};
