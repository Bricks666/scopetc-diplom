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
import React, { useState } from 'react';
import { userPresetsModel } from '@/entities/presets';
import { useToggle } from '@/shared/lib';
import { CommonProps } from '@/shared/types';
import { EyeIcon } from '@/shared/ui';

import styles from './video-presets.module.css';

export interface VideoPresetsProps extends CommonProps {}

const array = [
	{ id: 0, name: 'mama', },
	{ id: 1, name: 'papa', },
	{ id: 2, name: 'dada', }
];

export const VideoPresets: React.FC<VideoPresetsProps> = (props) => {
	const { className, } = props;
	const presets = useUnit(userPresetsModel.query);
	const [open, openControls] = useToggle();
	const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
	const [arrayPresets, setArrayPresets] = useState(array);
	const [edit, editControls] = useToggle(false);

	const deletePreset = (id: number) => {
		const newArray = arrayPresets.filter((preset) => {
			return preset.id !== id;
		});
		setArrayPresets(newArray);
	};

	return (
		<>
			<IconButton
				className={cn(styles.button, className)}
				onClick={openControls.toggle}
				ref={setAnchorEl}>
				<EyeIcon />
			</IconButton>
			<Popover
				open={open}
				anchorOrigin={{ vertical: 'top', horizontal: 'right', }}
				transformOrigin={{ vertical: 'bottom', horizontal: 'right', }}
				anchorEl={anchorEl}
				onClose={openControls.toggleOff}>
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
									<ListItemButton selected>
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
									<IconButton className={cn(styles.button, className)}>
										<CreateIcon color='secondary' />
									</IconButton>
									<IconButton
										className={cn(styles.button, className)}
										onClick={() => {
											deletePreset(preset.id);
										}}>
										<RemoveCircleIcon color='secondary' />
									</IconButton>
								</ListItem>
							);
						})}
						<div className={styles.buttons}>
							<IconButton
								className={cn(styles.button, className)}
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
		</>
	);
};
