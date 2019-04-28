import createEmotion from 'create-emotion'
import scoped from './stylis-plugin'

let curr;

export const setCurr = (ctx) => {
    curr = ctx;
}

export const {
  cx: scopedCx,
  css: scopedCss,
} = createEmotion({
    stylisPlugins: [
        scoped(id => console.log(curr, id))
    ],
});

export const {
    cx,
    css
} = createEmotion();
