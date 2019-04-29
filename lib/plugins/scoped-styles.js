const scopedStyles = {
    install(Vue) {
        Vue.directive('scoped', {
            bind(el, binding, vnode) {
                el.setAttribute(binding.value, '')
                const slots = Object.values(vnode.componentInstance.$slots);
                slots.forEach(slot => {
                    slot.forEach(slt => {
                        slt.elm.setAttribute(binding.value, '');
                        slt.children.forEach(child => {
                            child.elm.setAttribute(binding.value, '');
                        })
                    })
                })
            }
        })
    },
};

export default scopedStyles;
