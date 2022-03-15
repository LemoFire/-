<template>
  <view>
    舰长列表
    <!-- <view v-for=''></view> -->
  </view>
</template>

<script setup>
import { reactive } from 'vue';
import { getTopList } from '../../api/miku';
const guardList=reactive([])
const init=async()=>{
    const {data}=getTopList(23547903,1048095329,1)
}
</script>

<style></style>
