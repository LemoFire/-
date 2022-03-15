<template>
  <view class="content">
    <image class="logo" src="/static/logo.jpg"></image>
    <view class="text-area">
      <input
        class="input-id"
        v-model="roomId"
        type="number"
        placeholder="请输入世界的ID..."
      />
    </view>
    <text class="btn-open" @click="goRoom">点击连接房间的大门...</text>
    <view class="footer" @click="goLink">奇怪的地方</view>
  </view>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
const store = useStore();

const roomId = ref(uni.getStorageSync("room_id"));
console.log("从缓存中获取到的room_id", roomId.value);
//进入房间
const goRoom = async () => {
  uni.getStorageSync("room_id") != roomId.value
    ? uni.setStorageSync("room_id", roomId.value)
    : false;

  if (!roomId.value) {
    uni.showToast({
      title: "请输入房间号",
      duration: 2000,
      icon: "none",
      position: "bottom",
    });
  }
  /**
  我还能进入你的心房吗...
   */
  if (roomId.value) {
    await store.dispatch("getRoomInfo", roomId.value);
    console.log("前往ChatRoom，RoomId：", roomId.value);
    uni.navigateTo({
      url: "/pages/chat-room/index?roomId=" + roomId.value,
    });
  }
};

const goLink = () => {
  plus.runtime.openURL("https://www.ito.fun");
};
</script>

<style lang="scss" scoped>
$footer-height: 140rpx;
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  min-height: calc(100vh);
  /*  #ifdef  H5  */
  min-height: calc(100vh - 44px);
  /*  #endif  */
  // padding-top: 200rpx;
  padding-bottom: $footer-height;
  .footer {
    position: absolute;
    display: flex;
    align-items: center;
    height: $footer-height;
    bottom: 0;
  }
}

.logo {
  height: 300rpx;
  width: 300rpx;
  border-radius: 30rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
  margin-bottom: 30rpx;
  .input-id {
    border: thick solid $bilibili-color;
    border-radius: 18rpx;
    height: 90rpx;
    width: 480rpx;
    padding: 0 10rpx;
  }
}

.btn-open {
  font-size: 24rpx;
  color: white;
  background-color: $bilibili-color;
  border: thick solid $bilibili-color;
  border-radius: 18rpx;
  padding: 10rpx;
}
</style>
