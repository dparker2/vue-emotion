import { processStylisSelectors } from './render';

/**
 * Stylis Plugin for adding scoped styles
 */
export const scopedStylisPlugin = (context, content, selectors) => {
    switch (context) {
        case 2:
            console.log(content, selectors);
            processStylisSelectors(selectors);
            return content;
    }
};
