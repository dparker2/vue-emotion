import { css } from 'emotion';

const makeMixin = (templateArgs) => ({
    mounted() {
        const emotionClass = () => css.apply(
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

export default makeMixin;
