import cn from 'classnames';
import * as React from 'react';
import { CommonProps } from '@/shared/types';

import styles from './center.module.css';

export const Center: React.FC<React.PropsWithChildren<CommonProps>> = (
	props
) => {
	const { children, className, } = props;

	return <div className={cn(styles.container, className)}>{children}</div>;
};
