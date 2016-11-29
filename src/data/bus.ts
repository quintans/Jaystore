import * as Vue from 'vue';

import { listenFactory } from 'decorators'

export const bus = new Vue({});

// Other listener decorators can be created for other buses.
// Don't abuse this pattern, since they remain alive during the application
export const Listen = listenFactory(bus);