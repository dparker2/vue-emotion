import { directiveName } from '../common';

let pluginEnabled;
let currRenderContext;
let prevRenderContext;
let currScopeId;
export const enableStylisPlugin = isEnabled => (pluginEnabled = isEnabled);
export const setRenderContext = context => (currRenderContext = context);

const processStylisSelectors = selectors => {
    if (pluginEnabled) {
        if (currRenderContext !== prevRenderContext) {
            // New context, new scope
            currScopeId = `data-id-${Math.random().toString(36).slice(2)}`;
            if (!currRenderContext.data.directives) 
                currRenderContext.data.directives = [];
            currRenderContext.data.directives.push({
                name: directiveName,
                value: currScopeId
            })
            prevRenderContext = currRenderContext;
        }
        selectors.forEach((selector, index) => {
            selectors[index] = `${selector}[${currScopeId}]`;
        });
    }
};

/**
 * Stylis Plugin for adding scoped styles
 */
export const scopedStylisPlugin = (context, content, selectors) => {
    switch (context) {
        case 2:
            processStylisSelectors(selectors);
            return content;
    }
};
