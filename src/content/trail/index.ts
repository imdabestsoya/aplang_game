import data from './foundation.json';
import type { TrailContent } from './types';
import { validateTrail } from './validation';
export const trailContent = data as TrailContent;
const errors = validateTrail(data);
if (errors.length) throw new Error(errors.join('\n'));
