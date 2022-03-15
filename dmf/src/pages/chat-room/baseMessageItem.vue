<template>
  <view
    >{{ item.isadmin }}:{{ item.medal[0] }}级[{{ item.medal[1] }}]:{{
      item.nickname
    }}: {{ item.text }}</view
  >
</template>
<script setup>
const props = defineProps({
  item: Object,
});
</script>

<style lang="scss" scoped></style>
