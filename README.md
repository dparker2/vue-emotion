# vue-emotion

[![npm version](https://badge.fury.io/js/%40vue-emotion%2Fstyled.svg)](https://badge.fury.io/js/%40vue-emotion%2Fstyled)

Use dynamic styling powered by [emotion](https://emotion.sh/docs/emotion) with Vue.js components.

## Demo Link
https://codesandbox.io/s/github/ParkerD559/vue-emotion-plugin/tree/master

# Styled
## Installation
```
npm install -D @vue-emotion/styled
```

## Style Components
```javascript
const StyledButton = styled(MyButton)`
  border: 1px solid ${color('red')};
  padding: 10px;
  height: ${props => props.height}px;
  width: ${props => props.width}px;
  color: ${props => props.color};
  background-color: ${props => props.backgroundColor};
`
```

## Style HTML elements
```javascript
const StyledAnchor = styled.a`
  text-decoration: none;
`
```

## Object styles
```javascript
const StyledButton = styled(MyButton)({
    color: '#0000ff',
    flex: 1
})
```

## Reuse styles using withComponent
```javascript
const StyledButton = styled(MyButton)`
    height: 100px;
    width: 200px;
`
const StyledAnchor = StyledButton.withComponent('a');
// => StyledButton and StyledAnchor have same styles
```

# Bugs/Features

Please feel free to post any issues or feature requests: https://github.com/ParkerD559/vue-emotion/issues
