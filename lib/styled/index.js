import htmlTags from 'html-tags';
import { isStyled, newWrapper, mergeWrapper } from './wrapper';
import { transformTargets } from './target'

/**
 * Style the passed component.
 * @param {String|VueComponent} tagOrComp 
 */
const styled = (
    tagOrComp, {
        scoped=false
    } = {}) => (...args) => {
    const templateArgs = {
        args: transformTargets(args),
        scoped
    };
    return isStyled(tagOrComp)
    ? mergeWrapper(tagOrComp, templateArgs)
    : newWrapper(tagOrComp, templateArgs);
}

const styledHTML = (tag) => styled(tag);
htmlTags.forEach(tag => (styled[tag] = styledHTML(tag)));

export default styled;
