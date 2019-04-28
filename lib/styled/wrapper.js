import Vue from 'vue';
import { scopedCss, scopedCx, setCurr } from '../emotion';

Vue.directive('scoped', {
    bind(el, binding, vnode) {
        el.setAttribute('scoped', '')
        const slots = Object.values(vnode.componentInstance.$slots);
        slots.forEach(slot => {
            slot.forEach(slt => {
                slt.elm.setAttribute('scoped', '');
                slt.children.forEach(child => {
                    child.elm.setAttribute('scoped', '');
                })
            })
        })
    }
})

/**
 * Render function for the functional wrapper.
 */
function render(createElement, context) {
    setCurr(context);
    const emotionClass = scopedCx(...this.$_styles.args.map(templateArg =>
        scopedCss.apply({ mergedProps: context.props }, templateArg)
    ));

    // Add the target class if need be
    const classes = this.$_targetClass
        ? [emotionClass, this.$_targetClass]
        : [emotionClass]

    const vnode = createElement(
        this.$_styledFrom,  // Base component even if styled multiple times
        { ...context.data, class: classes, directives: [{
            name: 'scoped'
        }] },
        context.children
    );
    return vnode;
}

const makeWrapper = (allStyles, baseComponent) => {
    const wrapper = {
        functional: true,
        $_styles: allStyles,
        $_styledFrom: baseComponent,
        withComponent: makeWithComponent(allStyles),
    };
    // Bind the wrapper to render so it can always access $_styles
    // and $_styledFrom even if they are changed by subsequent stylings
    wrapper.render = render.bind(wrapper);
    return wrapper;
};

const makeWithComponent = (styles) => (tagOrComp) => makeWrapper(styles, tagOrComp);

/**
 * Make a new functional wrapper, used on basic html tags or non-styled components
 */
export const newWrapper = (wrapped, templateArgs) => makeWrapper([templateArgs], wrapped);

/**
 * Merge existing styles into a new functional wrapper, used on styled components
 */
export const mergeWrapper = (wrapped, templateArgs) => makeWrapper(
    [...wrapped.$_styles, templateArgs],
    wrapped.$_styledFrom
);

/**
 * If a component is a styled component
 */
export const isStyled = component =>
    component.$_styles !== undefined &&
    component.$_styledFrom !== undefined;
