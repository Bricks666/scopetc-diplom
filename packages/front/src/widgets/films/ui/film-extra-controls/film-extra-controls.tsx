import { IconButton } from '@mui/material';
import cn from 'classnames';
import { useUnit } from 'effector-react';
import * as React from 'react';
import { CreatePreset, RemovePreset, UpdatePreset } from '@/features/presets';
import { UserPresets } from '@/entities/presets';
import { useToggle } from '@/shared/lib';
import { CommonProps } from '@/shared/types';
import { EyeIcon } from '@/shared/ui';
import {
	updatingPresetModel,
	controlsStageModel,
	activePresetModel,
} from '../../model';
import styles from './film-extra-controls.module.css';

export interface FilmExtraControlsProps extends CommonProps {}

export const FilmExtraControls: React.FC<FilmExtraControlsProps> = (props) => {
	const { className } = props;
	const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
	const [stage, setStage] = useUnit([
		controlsStageModel.$stage,
		controlsStageModel.setStage,
	]);
	const [presetsOpen, presetsControls] = useToggle();
	const [changingId, onChangingSelect, activeId, onSelect] = useUnit([
		updatingPresetModel.$id,
		updatingPresetModel.selected,
		activePresetModel.$id,
		activePresetModel.selected,
	]);

	const onCreate = () => {
		setStage('create');
	};

	const closeCreate = () => {
		setStage('overview');
	};

	const onUpdate = (id: number) => {
		setStage('update');
		onChangingSelect(id);
	};

	const closeUpdate = () => {
		setStage('overview');
		onChangingSelect(null);
	};

	const onRemove = (id: number) => {
		setStage('delete');
		onChangingSelect(id);
	};

	const closeRemove = () => {
		setStage('overview');
		onChangingSelect(null);
	};

	return (
		<>
			<IconButton
				className={cn(styles.button, className)}
				onClick={presetsControls.toggle}
				ref={setAnchorEl}>
				<EyeIcon />
			</IconButton>
			<UserPresets
				open={presetsOpen}
				anchorEl={anchorEl}
				onClose={presetsControls.toggleOff}
				onCreate={onCreate}
				onSelect={onSelect}
				selectedId={activeId}
				onUpdate={onUpdate}
				onDelete={onRemove}
			/>
			<CreatePreset
				open={stage === 'create'}
				onClose={closeCreate}
				anchorEl={anchorEl}
			/>
			<UpdatePreset
				open={stage === 'update'}
				onClose={closeUpdate}
				anchorEl={anchorEl}
			/>
			<RemovePreset
				id={changingId!}
				open={stage === 'delete'}
				onClose={closeRemove}
			/>
		</>
	);
};
