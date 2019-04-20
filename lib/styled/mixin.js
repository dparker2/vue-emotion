import { css, cx } from 'emotion';

const makeMixin = () => ({
    mounted() {
        const emotionClass = () => cx(
            ...this.$options.$_interpolations.map(templateArgs =>
                css.apply(
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

export default makeMixin;
