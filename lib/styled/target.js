import { isStyled, mergeWrapper, newWrapper } from './wrapper'

const putTarget = (component) => {
    const targetClass = `_${Math.random().toString(36).slice(2)}`
    component.$_targetClass = targetClass;
    return `.${targetClass}`;
}

export const transformTargets = (templateArgs) =>
    templateArgs.map(arg =>
        arg.render
        ? putTarget(arg)
        : arg
    )
