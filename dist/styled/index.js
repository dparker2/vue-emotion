'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var htmlTags = _interopDefault(require('html-tags'));
var emotion = require('emotion');

const makeMixin = () => ({
    mounted() {
        const emotionClass = () => emotion.cx(
            ...this.$options.$_interpolations.map(templateArgs =>
                emotion.css.apply(
                    { mergedProps: { ...this.$attrs, ...this.$props } },
                    templateArgs
                )
            )
        );

        const classChanged = (newClass, oldClass) => {
            this.$el.classList.remove(oldClass);
            this.$el.classList.add(newClass);
        };

        this.$watch(
            emotionClass,
            classChanged,
            { immediate: true }
        );
    }
});

const makeComponent = (tag) => ({
    render: function (createElement) {
        return createElement(
            tag,
            this.$attrs,
            this.$slots.default
        )
    }
});

const withComponent = function(tagOrComp) {
    const newStyled = styled.hasOwnProperty(tagOrComp)
        ? styled[tagOrComp]()
        : styled(tagOrComp)();
    newStyled.$_interpolations = [
        ...this.$_interpolations
    ];
    return newStyled;
};

const newStyled = (component) => (...templateArgs) => {
    const styledMixin = makeMixin();
    const mixins = component.mixins;
    const withStyledMixin = {
        ...component,
        mixins: mixins
            ? [...mixins, styledMixin]
            : [styledMixin],
        withComponent,
        $_interpolations: [templateArgs]
    };
    return withStyledMixin;
};

const mergeStyled = (component) => (...templateArgs) => {
    const $_interpolations = [
        ...component.$_interpolations,
        templateArgs
    ];
    const withMoreStyles = {
        ...component,
        $_interpolations
    };
    return withMoreStyles;
};

const styled = (component) => {
    if (component.$_interpolations) {
        return mergeStyled(component)
    } else {
        return newStyled(component)
    }
};

const styledHTML = (tag) => styled(makeComponent(tag));
htmlTags.forEach(tag => (styled[tag] = styledHTML(tag)));

module.exports = styled;
