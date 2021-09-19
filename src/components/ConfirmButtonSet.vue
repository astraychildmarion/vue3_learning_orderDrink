<template lang="pug">
.buttonset__wrapper.text-right
  button.buttonset-confirm.px-6.py-2.mr-6.bg-green-400.hover_bg-green-500.rounded(
    @click="$emit('clickConfirm')"
  ) 確認
  button.buttonset-cancel.px-6.py-2.bg-gray-300.hover_bg-gray-400.rounded(
    @click="$emit('clickCancel')"
  ) 取消
</template>
