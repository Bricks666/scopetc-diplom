import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app';
import './index.css';
import { appModel } from './shared/models';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

appModel.started();
root.render(<App />);
