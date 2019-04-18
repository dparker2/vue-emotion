# vue-emotion
Use dynamic styling powered by [emotion](https://emotion.sh/docs/emotion) with Vue.js components.

## Demo Link
https://codesandbox.io/s/github/ParkerD559/vue-emotion-plugin/tree/master

# Styled
## Installation
```
npm install -D @vue-emotion/styled
```

## Usage
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

Should function the same as `styled` from `react-emotion`.

# Bugs/Features

Please feel free to post any issues or feature requests: https://github.com/ParkerD559/vue-emotion/issues
