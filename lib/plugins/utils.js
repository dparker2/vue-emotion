export const setScope = (el, scope) => el.setAttribute(scope, '');

export const walkSlots = (vnode, callback) => {
    if (vnode.componentInstance) {
        Object.values(vnode.componentInstance.$slots).forEach(slot =>
            slot.forEach(vn => {
                callback(vn);
                walkSlots(vn, callback);
            })
        );
    } else if (vnode.children) {
        vnode.children.forEach(vn => {
            callback(vn);
            walkSlots(vn, callback);
        });
    }
};
