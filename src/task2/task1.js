import {UPDATE_CONSOLE_PERIOD_MS} from './constants.js';
import {activityMonitor} from './activityMonitor.js';

setTimeout(activityMonitor, UPDATE_CONSOLE_PERIOD_MS);
