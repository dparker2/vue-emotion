import { css } from './emotion';
import { enableStylisPlugin, setRenderContext } from './stylis-plugin';

const getEmotionClass = ({ args, scoped }, mergedProps) => {
    enableStylisPlugin(scoped)
    return css.apply({ mergedProps }, args);
};

/**
 * Render function for the functional wrapper.
 */
export default function render(createElement, context) {
    setRenderContext(context);
    const classes = this.$_styles.map(templateArg =>
        getEmotionClass(templateArg, context.props)
    );

    // Add the target class if need be
    if (this.$_targetClass) {
        classes.push(this.$_targetClass)
    }

    const vnode = createElement(
        this.$_styledFrom,  // Base component even if styled multiple times
        { ...context.data, class: classes },
        context.children
    );
    return vnode;
}
