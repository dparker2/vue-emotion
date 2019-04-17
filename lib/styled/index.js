import mixin from './mixin';

const styled = function(component) {
    return function(...templateArgs) {
        const styledMixin = mixin(templateArgs);
        const mixins = component.mixins;
        const withStyledMixin = {
            ...component,
            mixins: mixins
                ? [...mixins, styledMixin]
                : [styledMixin]
        }
        return withStyledMixin;
    }
}

export default styled;
