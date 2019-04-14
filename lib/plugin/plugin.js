function getPluginObj() {
    return this.$options.$_emotion_plugin || {};
}

// eslint-disable-next-line no-unused-vars
const install = (Vue, options) => {
    Vue.mixin({
        beforeCreate() {
            this.$options.computed = Object.assign(
                this.$options.computed || {},
                getPluginObj.call(this).computed || {}
            )
        },
        mounted() {
            const pluginObj = getPluginObj.call(this);
            const num = pluginObj.block_num || 0;
            for (let i = 0; i < num; i++) {
                this.$watch(`$_emotion_class${i}`, val => {
                    pluginObj.classes[i] = val;
                })
            }
        }
    })
}

const Plugin = {
    install
}

export default Plugin
