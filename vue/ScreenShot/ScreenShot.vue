<!--
 * @Date: 2021-04-08 18:38:35
 * @LastEditors: LemoFire
 * @LastEditTime: 2021-04-11 01:44:14
 * @FilePath: /xmsreport/src/components/common/screenshot/ScreenShot.vue
-->
<template>
  <div class="shot-target" ref="shotTarget">
    <slot></slot>
  </div>
  <div
    class="result-container"
    v-show="isShowResult"
    @click.prevent.self="close"
  >
    <div class="result-wrapper">
      <div class="result" ref="outputTarget"></div>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import html2canvas from "html2canvas";
import Canvas2Image from "./canvas2image";
export default {
  props: {
    useImg: {
      type: Boolean,
      default() {
        return true;
      },
    },
  },
  setup(props) {
    const shotTarget = ref(null);
    const outputTarget = ref(null);
    const isShowResult = ref(false);
    const toImage = () => {
      const opt = {
        height: shotTarget.value.scrollHeight,
        width: shotTarget.value.scrollWidth,
        // windowWidth: shotTarget.value.scrollWidth,
        // windowHeight: shotTarget.value.scrollHeight,
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
        useCORS: true,
      };
      // shotTarget.value
      html2canvas(shotTarget.value, opt).then(function(canvas) {
        if (props.useImg) {
          const result = Canvas2Image.convertToImage(
            canvas,
            canvas.width,
            canvas.height
          );
          outputTarget.value.appendChild(result);
        } else {
          outputTarget.value.appendChild(canvas);
        }
      });
    };
    const shot = () => {
      toImage();
      isShowResult.value = true;
    };
    const close = () => {
      isShowResult.value = false;
      outputTarget.value.removeChild(outputTarget.value.childNodes[0]);
    };

    return { shot, isShowResult, close, shotTarget, outputTarget };
  },
};
</script>

<style lang="scss" scoped>
.shot-target {
  height: 100vh;
}
.result-container {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba($color: #000000, $alpha: 0.3);
  z-index: 99;
}
.result-wrapper {
  width: min-content;
  height: 90%;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-sizing: content-box;
  z-index: 100;
  .result {
    width: min-content;
    height: 100%;
    display: flex;
    justify-content: center;
    :deep(*) {
      border: 5px solid white !important;
      height: inherit !important;
      width: auto !important;
      margin: 0 auto;
    }
  }
}
</style>
