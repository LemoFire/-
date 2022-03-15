<!--
 * @Date: 2021-04-08 17:48:10
 * @LastEditors: LemoFire
 * @LastEditTime: 2021-04-13 10:46:34
 * @FilePath: /xmsreport/src/components/common/screenshot/README.md
-->

# vue-ScreenShot 截屏插件

基于 html2canvas 和 canvas2image 的截屏插件，截屏后打开一个窗口显示图片，点击窗口外关闭图片
目前仅支持 V3，V2 到时候写

_当前版本: 0.1.1_

### 基本栗子

```
<template>
  <screen-shot ref="shotTarget">
    <div class="close" @click="screenCapture">press截图</div>
    <router-view />
  </screen-shot>
</template>

<script>
import ScreenShot from "cpn/common/screenshot/ScreenShot";
import { ref } from "vue";
export default {
  components: {
    ScreenShot,
  },
  setup() {
    const shotTarget = ref(null);
    const screenCapture = () => {
      shotTarget.value.shot();
    };
    return { screenCapture, shotTarget };
  },
};
</script>
<style lang="scss">
.close {
  position: fixed;
  top: 350px;
  left: 0;
  z-index: 9;
}
</style>
```

### 常规参数

useImg: 使用图片输出，传入 false 则使用 canvas 直接输出

- type: Boolean
- default true

## Credits

- [niklasvh/html2canvas](https://github.com/niklasvh/html2canvas)
- [hongru/canvas2image](https://github.com/hongru/canvas2image)
