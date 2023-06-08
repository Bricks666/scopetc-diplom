import {
	Button,
	Dialog,
	DialogActions,
	DialogContentText,
	DialogTitle
} from '@mui/material';
import { useUnit } from 'effector-react';
import * as React from 'react';
import { CommonProps, VoidFunction } from '@/shared/types';
import { removePresetModel } from '..';

export interface RemovePresetProps extends CommonProps {
	readonly id: number;
	readonly open: boolean;
	readonly onClose: VoidFunction;
}

export const RemovePreset: React.FC<RemovePresetProps> = (props) => {
	const { id, className, open, onClose, } = props;
	const remove = useUnit(removePresetModel.mutation);

	const onRemove = () => {
		remove.start({ id, });
		onClose();
	};

	return (
		<Dialog className={className} color='error' onClose={onClose} open={open}>
			<DialogTitle>Внимание</DialogTitle>
			<DialogContentText>
				В уверены, что хотите удалить профиль настроек?
			</DialogContentText>
			<DialogActions>
				<Button onClick={onRemove} variant='contained' color='error'>
					Удалить
				</Button>
				<Button onClick={onClose} variant='contained'>
					Отменить
				</Button>
			</DialogActions>
		</Dialog>
	);
};
