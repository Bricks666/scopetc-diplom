import {
	Experimental_CssVarsProvider as CssVarsProvider,
	StyledEngineProvider,
	experimental_extendTheme as extendTheme,
	CssBaseline
} from '@mui/material';
import * as React from 'react';
import {
	MTSRegularWoff2,
	MTSBoldWoff,
	MTSBoldWoff2,
	MTSMediumWoff,
	MTSMediumWoff2,
	MTSRegularWoff
} from '@/shared/assets';

import 'swiper/css';
import 'swiper/css/navigation';

const theme = extendTheme({
	shape: {
		borderRadius: 10,
	},
	typography: {
		fontFamily: 'MTS, sans-serif',
		allVariants: {
			color: '#ffffff',
		},
	},
	components: {
		MuiCssBaseline: {
			styleOverrides: `
        @font-face {
          font-family: 'MTS';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: local('MTS'), local('MTS-Regular'), url(${MTSRegularWoff2}) format('woff2'),
          url(${MTSRegularWoff}) format('woff');
        }
        @font-face {
          font-family: 'MTS';
          font-style: normal;
          font-display: swap;
          font-weight: 500;
          src: local('MTS'), local('MTS-Regular'), url(${MTSMediumWoff2}) format('woff2'),
          url(${MTSMediumWoff}) format('woff');
        }
        @font-face {
          font-family: 'MTS';
          font-style: normal;
          font-display: swap;
          font-weight: 700;
          src: local('MTS'), local('MTS-Regular'), url(${MTSBoldWoff2}) format('woff2'),
          url(${MTSBoldWoff}) format('woff');
        }
      `,
		},
	},
});

export const withStyles =
	(Component: React.ComponentType): React.ComponentType =>
		() => {
			return (
				<StyledEngineProvider injectFirst>
					<CssVarsProvider theme={theme}>
						<CssBaseline />
						<Component />
					</CssVarsProvider>
				</StyledEngineProvider>
			);
		};
