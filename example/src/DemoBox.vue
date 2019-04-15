<template>
  <div>
    Adjust the style properties above.<br />
    - The changes are reactive via Vue.js<br />
    - Emotion powers the js to css transformation.<br />
    - vue-emotion-block ties them together.<br />
  </div>
</template>

<script>
export default {
  props: {
    color: String,
    backgroundColor: String,
  }
};
</script>

<emotion>
& {
    border: 1px solid #000;
    padding: 10px;
    color: ${this.color || '#030507'};
    background-color: ${this.backgroundColor || '#fff'}
}
</emotion>