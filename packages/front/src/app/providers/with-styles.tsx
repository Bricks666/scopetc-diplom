import {
	Experimental_CssVarsProvider as CssVarsProvider,
	StyledEngineProvider,
	experimental_extendTheme as extendTheme,
	CssBaseline,
	outlinedInputClasses
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

const color = 'var(--mui-palette-warning-main)';

const theme = extendTheme({
	shape: {
		borderRadius: 10,
	},
	typography: {
		fontFamily: 'MTS, sans-serif',
	},
	components: {
		MuiLink: {
			defaultProps: {
				underline: 'none',
			},
			styleOverrides: {
				root: {
					':hover': {
						transition: 'color 250ms ease-in-out',
						color,
					},
				},
			},
		},
		MuiIconButton: {
			styleOverrides: {
				root: {
					transition: 'color 250ms ease-in-out',
					':hover': {
						color,
					},
				},
			},
		},
		MuiTextField: {
			styleOverrides: {
				root: {
					'--TextField-brandBorderFocusedColor': color,
					'& label.Mui-focused': {
						color: 'var(--TextField-brandBorderFocusedColor)',
					},
				},
			},
		},
		MuiOutlinedInput: {
			styleOverrides: {
				root: {
					[`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
						borderColor: 'var(--TextField-brandBorderFocusedColor)',
					},
				},
			},
		},
		MuiFilledInput: {
			styleOverrides: {
				root: {
					'&.Mui-focused:after': {
						borderBottom: '2px solid var(--TextField-brandBorderFocusedColor)',
					},
				},
			},
		},
		MuiInput: {
			styleOverrides: {
				root: {
					'&.Mui-focused:after': {
						borderBottom: '2px solid var(--TextField-brandBorderFocusedColor)',
					},
				},
			},
		},
		MuiSlider: {
			styleOverrides: {
				root: {
					color,
				},
			},
		},
		MuiButton: {
			styleOverrides: {
				root: {
					color,
				},
			},
		},
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
