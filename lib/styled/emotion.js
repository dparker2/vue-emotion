import createEmotion from 'create-emotion';
import { scopedStylisPlugin } from './stylis-plugin';

export const {
    flush,
    hydrate,
    cx,
    merge,
    getRegisteredStyles,
    injectGlobal,
    keyframes,
    css,
    sheet,
    cache
} = createEmotion({
    stylisPlugins: [
        scopedStylisPlugin
    ],
});
