'use strict';

var emotion = require('emotion');

const makeMixin = (templateArgs) => ({
    mounted() {
        const emotionClass = () => emotion.css.apply(
            { mergedProps: { ...this.$attrs, ...this.$props } },
            templateArgs
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

const styled = function(component) {
    return function(...templateArgs) {
        const styledMixin = makeMixin(templateArgs);
        const mixins = component.mixins;
        const withStyledMixin = {
            ...component,
            mixins: mixins
                ? [...mixins, styledMixin]
                : [styledMixin]
        };
        return withStyledMixin;
    }
};

module.exports = styled;
