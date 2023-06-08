import compose from 'compose-function';
import { withRouter } from './with-router';
// import { withStrictMode } from './with-strict-mode';
import { withStyles } from './with-styles';

export const withProviders = compose(withRouter, withStyles);
