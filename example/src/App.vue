<template>
  <div id="app">
    <div>
      <label for="height-input">
        Height:
      </label>
      <input id="height-input" v-model="heightInput" />
      <label for="width-input">
        Width:
      </label>
      <input id="width-input" v-model="widthInput" />
      <label for="color-input">
        Text Color:
      </label>
      <input id="color-input" v-model="colorInput" />
      <label for="background-color-input">
        Background Color:
      </label>
      <input id="background-color-input" v-model="backgroundColorInput" />
    </div>
    <div class="box-wrapper">
      <styled-demo-box
        :height="heightInput"
        :width="widthInput"
        :color="colorInput"
        :backgroundColor="backgroundColorInput"
      >
        <ul>
          <li>Should be red</li>
        </ul>
      </styled-demo-box>
    </div>
  </div>
</template>

<script>
import DemoBox from "./DemoBox.vue";
import styled from '../../lib/styled';

const StyledDemoBox = styled(DemoBox)`
  border: 1px solid #000;
  padding: 10px;
  height: ${props => props.height}px;
  width: ${props => props.width}px;
  color: ${props => props.color};
  background-color: ${props => props.backgroundColor};

  & li {
    color: red;
  }
`

export default {
  name: "App",
  components: {
    StyledDemoBox
  },
  data() {
    return {
      heightInput: 350,
      widthInput: 450,
      colorInput: 'maroon',
      backgroundColorInput: 'turquoise'
    }
  }
};
</script>

<style>
#app {
  display: flex;
  height: 100vh;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
}

label, input {
  display: block;
}

input {
  margin-bottom: 10px;
}

.box-wrapper {
  margin-left: 20px;
}
</style>
