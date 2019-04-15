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
      <demo-box 
        class="demo-box"
        :color="colorInput"
        :backgroundColor="backgroundColorInput"
      />
    </div>
  </div>
</template>

<script>
import DemoBox from "./DemoBox.vue";
export default {
  name: "App",
  components: {
    DemoBox
  },
  data() {
    return {
      heightInput: 350,
      widthInput: 350,
      colorInput: '',
      backgroundColorInput: ''
    }
  }
};
</script>

<emotion>
.demo-box {
  height: ${this.heightInput}px;
  width: ${this.widthInput}px;
}
</emotion>

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