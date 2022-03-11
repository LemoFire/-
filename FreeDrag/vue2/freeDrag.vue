<!--
 * @Date: 2021-06-29 10:28:54
 * @LastEditors: LemoFire
 * @LastEditTime: 2021-07-01 15:21:40
-->
<script>
import { computed, defineComponent, reactive, ref } from "@vue/composition-api";
export default defineComponent({
  props: {
    top: {
      type: String,
      default() {
        return "";
      },
    },
    left: {
      type: String,
      default() {
        return "";
      },
    },
    right: {
      type: String,
      default() {
        return "3vw";
      },
    },
    bottom: {
      type: String,
      default() {
        return "10vh";
      },
    },
    magnet: {
      type: Boolean,
      default() {
        return false;
      },
    },
    magnetHori: {
      type: Boolean,
      default() {
        return false;
      },
    },
    magnetVerti: {
      type: Boolean,
      default() {
        return false;
      },
    },
    unmovableX: {
      type: Number,
      default() {
        return 0;
      },
    },
    unmovableY: {
      type: Number,
      default() {
        return 0;
      },
    },
  },
  setup(props, { emit }) {
    // Drag handle start
    const dragDom = ref(null);
    const coordinate = reactive({
      client: {},
      elePosition: {},
    });
    const teleportPosition = reactive({
      top: props.top,
      left: props.left,
      right: props.right,
      bottom: props.bottom,
    });
    /**
     * @description: 0:mouseup 1:mousedown
     */
    let mouseStatus = 0;
    /**
     * @description:  0:not moved 1:moved
     */
    let moved = 0;

    // Set mouseStatus to mouseup when mouse leaves the window
    document.onmouseleave = () => {
      mouseStatus = 0;
      moved = 0;
      dragged();
    };
    /**
     * @description: Get the distance after moving
     * @param {*}
     * @return {*}
     */
    const getMovedLocation = (element) => {
      const x =
        coordinate.elePosition.left + (element.clientX - coordinate.client.x);
      const y =
        coordinate.elePosition.top + (element.clientY - coordinate.client.y);
      return { x, y };
    };

    /**
     * @description: Move start handle
     * @param {*} $event
     */
    const moveStartHandle = (e) => {
      let element;
      if (e.type == "touchstart") {
        element = e.targetTouches[0];
      } else {
        element = e;
        mouseStatus = 1;
      }

      // click position
      coordinate.client = {
        x: element.clientX,
        y: element.clientY,
      };
      // Element position before move
      coordinate.elePosition.left = dragDom.value.offsetLeft;
      coordinate.elePosition.top = dragDom.value.offsetTop;
    };

    /**
     * @description: Moving handle
     * @param {*} $event
     */
    const movingHandle = (e) => {
      if (moved == 0) {
        moved = 1;
        emit("dragging");
      }
      let element;
      if (e.type == "touchmove") {
        element = e.targetTouches[0];
      } else {
        element = e;
        if (mouseStatus != 1) {
          return false;
        }
      }

      let { x, y } = getMovedLocation(element);
      x =
        x <= 0
          ? 0
          : x >= innerWidth - dragDom.value.offsetWidth
          ? innerWidth - dragDom.value.offsetWidth
          : x;
      y =
        y <= 0
          ? 0
          : y >= innerHeight - dragDom.value.offsetHeight
          ? innerHeight - dragDom.value.offsetHeight
          : y;
      //   移动当前元素;

      teleportPosition.left = x + "px";
      teleportPosition.top = y + "px";
      teleportPosition.right = "0px";
      teleportPosition.bottom = "0px";
    };
    /**
     * @description: Move end handle
     */
    const moveEndHandle = () => {
      dragged();
    };
    const dragged = () => {
      mouseStatus = 0;
      moved = 0;
      const limitTop = innerHeight * props.unmovableY;
      const limitBottom = innerHeight - limitTop - dragDom.value.offsetHeight;
      const limitLeft = innerWidth * props.unmovableX;
      const limitRight = innerWidth - limitLeft - dragDom.value.offsetWidth;
      const middleLineX = innerWidth / 2 - dragDom.value.offsetWidth / 2;
      const middleLineY = innerHeight / 2 - dragDom.value.offsetHeight / 2;
      let x, y;
      dragDom.value.offsetTop < limitTop ? (y = limitTop) : false;
      dragDom.value.offsetTop > limitBottom ? (y = limitBottom) : false;
      dragDom.value.offsetLeft < limitLeft ? (x = limitLeft) : false;
      dragDom.value.offsetLeft > limitRight ? (x = limitRight) : false;
      if (!props.magnet && props.magnetHori && !props.magnetVerti) {
        if (dragDom.value.offsetLeft < middleLineX) {
          slide(limitLeft, null);
          emit("left");
        } else {
          slide(limitRight, null);
          emit("right");
        }
      }
      if (!props.magnet && !props.magnetHori && props.magnetVerti) {
        if (dragDom.value.offsetTop < middleLineY) {
          slide(null, limitTop);
          emit("top");
        } else {
          slide(null, limitBottom);
          emit("bottom");
        }
      }
      if (props.magnet) {
        if (dragDom.value.offsetLeft < middleLineX) {
          // Left
          if (dragDom.value.offsetTop < middleLineY) {
            // Upper left
            if (
              innerHeight / innerWidth <
              dragDom.value.offsetTop / dragDom.value.offsetLeft
            ) {
              // To left
              slide(limitLeft, null);
              emit("left");
            } else {
              // To top
              slide(null, limitTop);
              emit("top");
            }
          } else {
            // Lower left
            if (
              innerHeight / innerWidth <
              (dragDom.value.offsetTop - innerHeight / 2) /
                (innerWidth / 2 - dragDom.value.offsetLeft)
            ) {
              // To bottom
              slide(null, limitBottom);
              emit("bottom");
            } else {
              // To left
              slide(limitLeft, null);
              emit("left");
            }
          }
        } else {
          // Right
          if (dragDom.value.offsetTop < middleLineY) {
            // Upper right
            if (
              innerHeight / innerWidth <
              (innerHeight / 2 - dragDom.value.offsetTop) /
                (dragDom.value.offsetLeft - innerWidth / 2)
            ) {
              // To top
              slide(null, limitTop);
              emit("top");
            } else {
              // To right
              slide(limitRight, null);
              emit("right");
            }
          } else {
            // Lower right
            if (
              innerHeight / innerWidth <
              (dragDom.value.offsetTop - innerHeight / 2) /
                (dragDom.value.offsetLeft - innerWidth / 2)
            ) {
              // To bottom
              slide(null, limitBottom);
              emit("bottom");
            } else {
              // To right
              slide(limitRight, null);
              emit("right");
            }
          }
        }
      }
      if (x || y) {
        slide(x, y);
      }
      emit("dragged");
    };
    const slide = (x, y) => {
      if (x != undefined && x != null) teleportPosition.left = x + "px";
      if (y != undefined && y != null) teleportPosition.top = y + "px";
    };
    const styleHandle = computed(() => {
      return { ...teleportPosition };
    });

    return {
      dragDom,
      moveStartHandle,
      movingHandle,
      moveEndHandle,
      teleportPosition,
      styleHandle,
    };
  },
});
</script>

<template>
  <div
    ref="dragDom"
    class="drag-wrap"
    @touchstart="moveStartHandle"
    @mousedown="moveStartHandle"
    @touchmove.prevent="movingHandle"
    @mousemove.prevent="movingHandle"
    @touchend="moveEndHandle"
    @mouseup="moveEndHandle"
    :style="styleHandle"
  >
    <slot></slot>
  </div>
</template>

<style>
.drag-wrap {
  position: fixed;
  width: max-content;
  height: max-content;
}
</style>