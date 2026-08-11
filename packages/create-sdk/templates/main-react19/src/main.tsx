import { createRoot } from 'react-dom/client';

import App from './App.tsx';
import './sdk.config.ts';

createRoot(document.getElementById('root')!).render(<App />);
