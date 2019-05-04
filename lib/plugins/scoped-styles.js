import { walkSlots, setScope } from './utils';

export const directiveName = 'vue-emotion-scoped';

const scopedStyles = {
    install(Vue) {
        Vue.directive(directiveName, {
            bind(el, binding, vnode) {
                setScope(el, binding.value);
                walkSlots(vnode, vn => {
                    if (vn.tag) setScope(vn.elm, binding.value);
                });
            },
        });
    },
};

export default scopedStyles;
