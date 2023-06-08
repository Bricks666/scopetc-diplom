import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CreateIcon from '@mui/icons-material/Create';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import {
	IconButton,
	Popover,
	Typography,
	List,
	ListItemAvatar,
	Avatar,
	ListItemText,
	ListItemButton,
	ListItem,
	ListSubheader
} from '@mui/material';
import cn from 'classnames';
import { useUnit } from 'effector-react';
import * as React from 'react';
import { userPresetsModel } from '@/entities/presets';
import { useToggle } from '@/shared/lib';
import { CommonProps, VoidFunction } from '@/shared/types';

import styles from './user-presets.module.css';

type Handler = (id: number) => void;

export interface UserPresetsProps extends CommonProps {
	readonly open: boolean;
	readonly onSelect: Handler;
	readonly selectedId: number;
	readonly anchorEl: HTMLElement | null;
	readonly onClose: VoidFunction;
	readonly onCreate: VoidFunction;
	readonly onDelete: Handler;
	readonly onUpdate: Handler;
}

export const UserPresets: React.FC<UserPresetsProps> = (props) => {
	const {
		className,
		open,
		anchorEl,
		onClose,
		onUpdate,
		onCreate,
		onDelete,
		selectedId,
		onSelect,
	} = props;
	const presets = useUnit(userPresetsModel.query);
	const [edit, editControls] = useToggle(false);

	const createHandler = (id: number, handler: Handler) => () => handler(id);

	return (
		<Popover
			open={open}
			anchorOrigin={{ vertical: 'top', horizontal: 'right', }}
			transformOrigin={{ vertical: 'bottom', horizontal: 'right', }}
			anchorEl={anchorEl}
			onClose={onClose}>
			<div className={styles.modal}>
				<List
					subheader={
						<ListSubheader
							style={{
								textAlign: 'center',
								backgroundColor: 'inherit',
								color: 'white',
							}}>
							Profile
						</ListSubheader>
					}
					disablePadding
					style={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
					}}>
					{presets.data.map((preset) => {
						return !edit ? (
							<ListItem disablePadding>
								<ListItemButton
									onClick={createHandler(preset.id, onSelect)}
									selected={preset.id === selectedId}>
									<ListItemAvatar>
										<Avatar style={{ backgroundColor: '#db8cff', }}>
											<MovieFilterIcon color='secondary' />
										</Avatar>
									</ListItemAvatar>
									<ListItemText primary={preset.name} />
								</ListItemButton>
							</ListItem>
						) : (
							<ListItem>
								<ListItemAvatar>
									<Avatar style={{ backgroundColor: '#db8cff', }}>
										<MovieFilterIcon color='secondary' />
									</Avatar>
								</ListItemAvatar>
								<ListItemText
									primary={
										<Typography variant='body1' component='p'>
											{preset.name}
										</Typography>
									}
								/>
								{preset.isStandard ? null : (
									<>
										<IconButton
											className={cn(styles.button, className)}
											onClick={createHandler(preset.id, onUpdate)}>
											<CreateIcon color='secondary' />
										</IconButton>
										<IconButton
											className={cn(styles.button, className)}
											onClick={createHandler(preset.id, onDelete)}>
											<RemoveCircleIcon color='secondary' />
										</IconButton>
									</>
								)}
							</ListItem>
						);
					})}
					<div className={styles.buttons}>
						<IconButton
							className={cn(styles.button, className)}
							onClick={onCreate}
							style={{ backgroundColor: '#9c27b0', }}>
							<AddIcon />
						</IconButton>
						<IconButton
							className={cn(styles.button, className)}
							style={{ backgroundColor: '#9c27b0', }}
							onClick={editControls.toggle}>
							{edit ? <ArrowBackIcon /> : <FormatListBulletedIcon />}
						</IconButton>
					</div>
				</List>
			</div>
		</Popover>
	);
};
