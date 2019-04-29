import { walkSlots } from './utils';

const scopedStyles = {
    install(Vue) {
        Vue.directive('scoped', {
            bind(el, binding, vnode) {
                el.setAttribute(binding.value, '');
                walkSlots(vnode, vn => {
                    if (vn.tag) vn.elm.setAttribute(binding.value, '')
                });
            }
        })
    },
};

export default scopedStyles;
