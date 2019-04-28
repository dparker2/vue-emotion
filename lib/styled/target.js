import { isStyled } from './wrapper'

/**
 * Add a unique class or use the existing one
 */
const putTarget = component => {
    if (component.$_targetClass) {
        return `.${component.$_targetClass}`
    } else {
        const targetClass = `_${Math.random().toString(36).slice(2)}`;
        component.$_targetClass = targetClass;
        return `.${targetClass}`;
    }
};

/**
 * For any component passed as a style argument, add a unique class
 * and change the argument to the selector for that class.
 */
export const transformTargets = templateArgs =>
    templateArgs.map(arg => {
        if (arg.render) {
            /* istanbul ignore else */
            if (isStyled(arg)) {
                return putTarget(arg);
            } else {
                if (process.env.NODE_ENV !== 'production') {
                    // eslint-disable-next-line no-console
                    console.error(`Only styled components are supported as selectors`);
                }
                return '';
            }
        }
        return arg;
    });
