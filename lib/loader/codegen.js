export default function(tmplBlocks) {
    return `
        const css = require('emotion').css;
        export default function (Component) {
            Component.options.$_emotion_plugin = {
                computed: {
                    ${tmplBlocks.map((tmpl, idx) =>
                        `$_emotion_class${idx}() {
                            const currClass = this.$options.$_emotion_plugin.classes[${idx}];
                            const newClass = css\`${tmpl}\`;
                            if (currClass) {
                                this.$el.classList.remove(currClass);
                            }
                            this.$el.classList.add(newClass);
                            return newClass;
                        }`).join(',')
                    }
                },
                block_num: ${tmplBlocks.length},
                classes: []
            };
        };`
}