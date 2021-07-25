<template lang="pug">
.drink__list__item__wrapper
  .border-2.border-gray-100.rounded-xl.p-6.my-6.shadow
    div.mb-4
      span.font-bold {{ order.who }} 的訂單
    div.mb-4.flex
      div.flex-1 品項
      div.flex-1 數量
      div.flex-1 冰塊
      div.flex-1 甜度
      div.flex-1 功能
    div.mb-4.flex
      .flex-1 {{ order.name }}
      .flex-1 {{ order.quantity }}
      .flex-1 {{ mapOrderText('ice',order.ice) }}
      .flex-1 {{ mapOrderText('sugar', order.sugar) }}
      .flex-1
        button.bg-blue-200.px-1.py-1.rounded.hover_bg-blue-300.text-sm(
          @click="$emit('clickModifyOrder',order)",
          v-show="!isEditMode"
        ) 改
        button.bg-green-200.px-1.py-1.rounded.hover_bg-green-300.text-sm(
          @click="$emit('saveModifyOrder')",
          v-show="isEditMode"
        ) 存
        button.bg-red-200.px-1.py-1.ml-3.rounded.hover_bg-red-300.text-sm(
          @click="$emit('deleteDrink', order)"
        ) 刪

</template>
<script>

import { orderSetting } from '../utils/order.js'
export default {
  props: ['order'],
  setup() {
    const {
      iceMap,
      sugarMap,
      toppingMap,
      mapOrderText,
      defaultTitle,
    } = orderSetting();
    return {
      iceMap,
      sugarMap,
      toppingMap,
      mapOrderText,
      defaultTitle,
    }
  },
  data() {
    return {
      isEditMode: false
    }
  },
  methods: {
  }
};
</script>