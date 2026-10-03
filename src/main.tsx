import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import JudgeApp from './components/JudgeApp';

createRoot(document.getElementById('root')!).render(<StrictMode><JudgeApp /></StrictMode>);
