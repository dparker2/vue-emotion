'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var characterParser = require('character-parser');

function codegen(tmplBlocks) {
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

const nextBlock = (src, start) => {
    const remaining = src.slice(start);
    const section = characterParser.parseUntil(remaining, '}', {start: remaining.indexOf('{')+1});
    return start+section.end+1
};

function loader (source, map) {
    const src = source.trim();
    const blocks = [];
    let end;
    for (let start = 0; end !== src.length; start = end) {
      try {
        end = nextBlock(src, start);
      } catch (e) { break; }
      blocks.push(src.slice(start, end));
    }

    this.callback(
        null,
        codegen(blocks),
        map
    );
}

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
            );
        },
        mounted() {
            const pluginObj = getPluginObj.call(this);
            const num = pluginObj.block_num || 0;
            for (let i = 0; i < num; i++) {
                this.$watch(`$_emotion_class${i}`, val => {
                    pluginObj.classes[i] = val;
                });
            }
        }
    });
};

const Plugin = {
    install
};

exports.loader = loader;
exports.plugin = Plugin;
