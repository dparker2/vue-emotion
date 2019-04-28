/**
 * Stylis Plugin for adding scoped styles
 */
const scoped = ({ callback }) => (context, content, selectors) => {
    let attr;
    switch (context) {
        case 2:
            attr = `data-em-${Math.random().toString(36).slice(2)}`;
            selectors.forEach((selector, index) => {
                selectors[index] = `${selector}[${attr}}]`;
            });
            callback(attr)
            return content;
    }
};

export default scoped;
