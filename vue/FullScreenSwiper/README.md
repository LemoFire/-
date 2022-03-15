<!--
 * @Date: 2021-04-08 17:48:10
 * @LastEditors: LemoFire
 * @LastEditTime: 2021-04-09 15:40:24
 * @FilePath: /xmsreport/src/components/content/fullscreenswiper/README.md
-->

# Full Screen Swiper

全屏滑动组件，主要用来做翻页功能，依赖于 Swiper6，支持横竖全屏，记得 npm i swiper， Swiper6 好像仅支持 V3，所以 V2 不用考虑了直接上 V2 的专用 Swiper

_当前版本: 0.1.0_

### 基本栗子

```
<template>
  <div>
    <full-screen-swiper
      :numberOfPages="3"
      :swipeType="2"
    >
      <template v-slot:page-3>第一页的内容</template>
      <template v-slot:page-3>第二页的内容</template>
      <template v-slot:page-3>第三页的内容</template>
    </full-screen-swiper>
  </div>
</template>
<script>
import FullScreenSwiper from "cpn/content/fullscreenswiper/FullScreenSwiper";
export default {
  components: {
    FullScreenSwiper,
  }
};
</script>
<style lang="scss" scoped>
:deep(.fss-page-1) { //第一页的样式
  background: url("../../assets/bg/bg1.png");
}
:deep(.fss-page-2) { //第二页的样式
  background: url("../../assets/bg/bg2.png");

:deep(.fss-page-3) { //第三页的样式
  background: url("../../assets/bg/bg3.png");
}
</style>
```

### 常规参数

numberOfPages:设置需要展示总页数

- type: Number
- default: 3

swipeType: 设置滑动方式，1 为横滑，2 为竖滑

- type: Number
- default: 1

useEffect: 使用淡入淡出特效，默认为 true

- type: Boolean
- default true

slideVerification:设置滑动验证，禁止用户滑动直到执行如登录操作后并设置`slideVerification.locked`的值为 false 才允许滑动。

- type: Object
- default: null
- 传入对象例子：

```
    const slideVerification = reactive({
      locked: true,
    });
```

slideVerificationDistance:启用滑动验证时滑动距离的灵敏度

- type: Number
- default: 30

### emit 事件

#### slipped

使用滑动验证时，当用户操作距离大于`slideVerificationDistance`所设置的距离时，向外发射该事件

## Credits

- [nolimits4web/swiper](https://github.com/nolimits4web/swiper)
