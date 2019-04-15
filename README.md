# vue-emotion-plugin
Use dynamic styling powered by [emotion](https://emotion.sh/docs/emotion) in idiomatic Vue via a custom SFC block.

## Demo Link
https://codesandbox.io/s/github/ParkerD559/vue-emotion-plugin/tree/master/example

## Installation
```
npm install -D vue-emotion-plugin
```

Add webpack loader rule
```javascript
// vue.config.js
module.exports = {
    configureWebpack: {
        module: {
            rules: [
                {
                    resourceQuery: /blockType=emotion/,
                    loader: require.resolve('vue-emotion-plugin/loader')
                }
            ]
        }
    }
}
```

Add plugin
```javascript
import Vue from 'vue';
import VueEmotionPlugin from 'vue-emotion-plugin/plugin';

Vue.use(VueEmotionPlugin);
```

## Usage
The `emotion` blocks are templates evaluated in the component's context, so this is possible:
```
<emotion>
& {
    color: ${this.color};
}
</emotion>
```
If `this.color` ever changes, the style will be dynamically updated. The [usual limits](https://vuejs.org/v2/guide/reactivity.html) of reactivity in Vue.js apply.

Note: see https://stylis.js.org/ for the css syntax that emotion understands.