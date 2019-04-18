import htmlTags from 'html-tags';
import makeMixin from './mixin';
import makeComponent from './component';

const styled = (component) => {
    return function(...templateArgs) {
        const styledMixin = makeMixin(templateArgs);
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

const styledHTML = (tag) => styled(makeComponent(tag));
htmlTags.forEach(tag => (styled[tag] = styledHTML(tag)));

export default styled;
