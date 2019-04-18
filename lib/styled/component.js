const makeComponent = (tag) => ({
    render: function (createElement) {
        return createElement(
            tag,
            this.$attrs,
            this.$slots.default
        )
    }
});

export default makeComponent
