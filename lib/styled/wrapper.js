import { css, cx } from 'emotion';

function render(createElement, context) {
    const emotionClass = cx(
        ...this.$_styles.map(templateArg =>
            css.apply(
                { mergedProps: context.props },
                templateArg
            )
        )
    );

    const classes = this.$_targetClass
        ? [emotionClass, this.$_targetClass]
        : [emotionClass]

    const el = createElement(
        this.$_styledFrom,
        {
            ...context.data,
            class: classes
        },
        context.children
    );
    debugger
    return el;
}

const makeWrapper = (allStyles, baseComponent, targetClass) => {
    const wrapper = {
        functional: true,
        $_styles: allStyles,
        $_styledFrom: baseComponent,
        $_styledTarget: targetClass,
        withComponent: makeWithComponent(allStyles),
    };
    wrapper.render = render.bind(wrapper);
    return wrapper;
};

const makeWithComponent = (styles) => (tagOrComp) =>
    makeWrapper(styles, tagOrComp);

export const newWrapper = (wrapped, templateArgs, targetClass) =>
    makeWrapper([templateArgs], wrapped, targetClass);

export const mergeWrapper = (wrapped, templateArgs, targetClass) =>
    makeWrapper(
        [...wrapped.$_styles, templateArgs],
        wrapped.$_styledFrom,
        targetClass
    );

export const isStyled = component =>
    component.$_styles !== undefined &&
    component.$_styledFrom !== undefined;
