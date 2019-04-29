import { css, cx } from './emotion';

let pluginEnabled;
let currRenderContext;
let prevRenderContext;
let currScopeId;
export const processStylisSelectors = (selectors) => {
    if (pluginEnabled) {
        if (currRenderContext !== prevRenderContext) {
            // New context, new scope
            currScopeId = `data-id-${Math.random().toString(36).slice(2)}`;
            if (!currRenderContext.data.directives) 
                currRenderContext.data.directives = [];
            currRenderContext.data.directives.push({
                name: 'scoped',
                value: currScopeId
            })
            prevRenderContext = currRenderContext;
        }
        selectors.forEach((selector, index) => {
            selectors[index] = `${selector}[${currScopeId}]`;
        });
    }
}

const getEmotionClass = ({ args, scoped }, mergedProps) => {
    pluginEnabled = scoped;
    return css.apply({ mergedProps }, args);
};

/**
 * Render function for the functional wrapper.
 */
export default function render(createElement, context) {
    currRenderContext = context;
    const emotionClass = cx(...this.$_styles.map(templateArg =>
        getEmotionClass(templateArg, context.props)
    ));

    // Add the target class if need be
    const classes = this.$_targetClass
        ? [emotionClass, this.$_targetClass]
        : [emotionClass]

    const vnode = createElement(
        this.$_styledFrom,  // Base component even if styled multiple times
        { ...context.data, class: classes },
        context.children
    );
    return vnode;
}
