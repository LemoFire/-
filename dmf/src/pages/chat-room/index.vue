<template>
  <view>
    <view v-for="(item, key) in messageList" :key="item">
      <baseMessageItem :item="item"></baseMessageItem>
      <br />
    </view>
  </view>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import baseMessageItem from "./baseMessageItem.vue";

import { getDanmakuHistory } from "../../api/miku";

let roomId;

onLoad((options) => {
  roomId = options.roomId;
});

const messageList = reactive([]);
const adminMessageList = reactive([]);

const init = async () => {
  if (!roomId) {
    console.warn("未获取到 roomId，返回首页");
    uni.redirectTo({
      url: "/pages/index/index",
    });
    return;
  }
  try {
    const { data } = await getDanmakuHistory(roomId);
    messageList.push(...data.room);
    adminMessageList.push(...data.room);
  } catch (error) {
    console.log(error);
  }
};
onMounted(() => {
  init();
});
</script>

<style lang="scss" scoped></style>
