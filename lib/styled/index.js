import htmlTags from 'html-tags';
import makeMixin from './mixin';
import makeComponent from './component';
import withComponent from './withComponent';

const newStyled = (component) => (...templateArgs) => {
    const styledMixin = makeMixin();
    const mixins = component.mixins;
    const withStyledMixin = {
        ...component,
        mixins: mixins
            ? [...mixins, styledMixin]
            : [styledMixin],
        withComponent,
        $_interpolations: [templateArgs]
    }
    return withStyledMixin;
}

const mergeStyled = (component) => (...templateArgs) => {
    const $_interpolations = [
        ...component.$_interpolations,
        templateArgs
    ]
    const withMoreStyles = {
        ...component,
        $_interpolations
    }
    return withMoreStyles;
}

const styled = (component) => {
    if (component.$_interpolations) {
        return mergeStyled(component)
    } else {
        return newStyled(component)
    }
}

const styledHTML = (tag) => styled(makeComponent(tag));
htmlTags.forEach(tag => (styled[tag] = styledHTML(tag)));

export default styled;
