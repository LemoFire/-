<!--
 * @Date: 2021-04-08 16:31:32
 * @LastEditors: LemoFire
 * @LastEditTime: 2021-04-09 15:31:09
 * @FilePath: /xmsreport/src/components/content/fullscreenswiper/FullScreenSwiper.vue
 *
 * 全屏滑动组件，使用说明见Readme，不支持Vue2
 *
 * Version: 0.1.0
-->
<template>
  <div class="fss-container">
    <swiper
      :slides-per-view="1"
      :space-between="50"
      @swiper="onSwiper"
      :direction="directionType"
      :effect="effectType"
      @touchEnd="touchEnd"
    >
      <swiper-slide v-for="key in numberOfPages" :key="key">
        <div class="fss-page" :class="'fss-page-' + key">
          <slot :name="'page-' + key">
            具体内容请使用v-slot:page-{{ key }}插入插槽<br />
            使用 :deep(.fss-page)控制所有页面的共同样式<br />
            使用 :deep(.fss-page-{{ key }})控制此页样式<br />
            使用 :deep(.fss-container) 控制容器样式
          </slot>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
// Swiper导入及配置
import SwiperCore, { EffectFade } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/swiper.scss";
import "swiper/components/effect-fade/effect-fade.scss";
import { computed, onMounted, ref, watch } from "@vue/runtime-core";
SwiperCore.use([EffectFade]);
export default {
  props: {
    numberOfPages: {
      type: Number,
      default() {
        return 3;
      },
    },
    swipeType: {
      type: Number,
      default() {
        return 1;
      },
    },
    useEffect: {
      type: Boolean,
      default() {
        return true;
      },
    },
    slideVerification: {
      type: Object,
      default() {
        return null;
      },
    },
    slideVerificationDistance: {
      type: Number,
      default() {
        return 30;
      },
    },
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  setup(props, context) {
    //判断横竖滑动的计算属性
    const directionType = computed(() => {
      if (props.swipeType == 2) {
        return "vertical";
      } else {
        return "horizontal";
      }
    });
    const effectType = computed(() => {
      if (props.useEffect) {
        return "fade";
      } else {
        return "slide";
      }
    });
    //获取Swiper对象
    const swiper = ref(null);
    const onSwiper = (swiperTarget) => {
      swiper.value = swiperTarget;
    };
    const slideTo = (index) => {
      swiper.value && swiper.value.slideTo(index);
    };
    // 如果传入了slideVerification参数，则启动滑动验证，验证完后才允许滑动
    if (props.slideVerification) {
      onMounted(() => {
        swiper.value.allowSlideNext = false;
        watch(
          () => props.slideVerification.locked,
          () => {
            swiper.value.allowSlideNext = true;
          }
        );
      });
    }
    const touchEnd = () => {
      if (
        (props.swipeType == 1 &&
          swiper.value.touches.startX - swiper.value.touches.currentX >
            props.slideVerificationDistance) ||
        (props.swipeType == 2 &&
          swiper.value.touches.startY - swiper.value.touches.currentY >
            props.slideVerificationDistance)
      ) {
        context.emit("slipped");
      }
    };
    return {
      directionType,
      effectType,
      onSwiper,
      touchEnd,
      slideTo,
    };
  },
};
</script>

<style lang="scss" scoped>
.fss-page {
  width: 100%;
  height: 100%;
}
.fss-container {
  background-color: red;
}
:deep(.swiper-container) {
  height: 100vh;
}
</style>
