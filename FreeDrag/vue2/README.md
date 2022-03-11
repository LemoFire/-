<!--
 * @Date: 2021-06-29 10:34:12
 * @LastEditors: LemoFire
 * @LastEditTime: 2021-07-01 15:22:01
-->
# freeDrag Component for vue 2

### Require
- Vue 2.6+

### Dependent installation

npm i @vue/composition-api

### Usage
##### Parent Component
```
import FreeDrag from "../../components/FreeDrag/freeDrag.vue";

<template>
  <free-drag right="0" :magnetHori="true" :unmovableY="0.08" :unmovableX="0.08">
</template>
```

### Attributes

|       Parameter       |         Description         |  Types  | Optional value | Defaults |
| :-------------------: | :-------------------------: | :-----: | :------------: | :------: |
|          top          |    CSS native properties    | string  |       -        |    -     |
|         left          |    CSS native properties    | string  |       -        |    -     |
|         right         |    CSS native properties    | string  |       -        |   3vw    |
|        bottom         |    CSS native properties    | string  |       -        |   10vh   |
|      unmovableX       |  Unmovable horizontal area  | number  |     0.0-1      |    0     |
|      unmovableY       |   Unmovable vertical area   | number  |     0.0-1      |    0     |
|      magnetHori       | Horizontal  magnetic effect | boolean |       -        |  false   |
|      magnetVerti      |  Vertical magnetic effect   | boolean |       -        |  false   |
| magnet(not suggested) |    Auto magnetic effect     | boolean |       -        |  false   |

### Events

| Event name |                Description                | Callback parameter |
| :--------: | :---------------------------------------: | :----------------: |
|  dragging  |                On dragging                |         -          |
|  dragged   |                  Dragged                  |         -          |
|    left    |  On the left after dragging(magnetHori)   |         -          |
|   right    |  On the right after dragging(magnetHori)  |         -          |
|    top     | At the right after dragging(magnetVerti)  |         -          |
|   bottom   | At the bottom after dragging(magnetVerti) |         -          |