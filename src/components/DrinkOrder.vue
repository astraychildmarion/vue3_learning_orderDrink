<template lang="pug">
.drink__list__item__wrapper
  .border-2.border-gray-100.rounded-xl.p-6.my-6.shadow
    .mb-4
      span.font-bold {{ data.who }} 的訂單
    .mb-4.flex
      .flex-1 品項
      .flex-1 數量
      .flex-1 冰塊
      .flex-1 甜度
      .flex-1 功能
    .mb-4.flex
      .flex-1 {{ mapOrderText('menu', data.name) }}
      .flex-1 {{ data.quantity }}
      .flex-1 {{ mapOrderText('ice', data.ice) }}
      .flex-1 {{ mapOrderText('sugar', data.sugar) }}
      .flex-1
        button.bg-blue-200.px-1.py-1.rounded.hover_bg-blue-300.text-sm(
          @click="$emit('clickModifyOrder', id)"
        ) 改
        button.bg-red-200.px-1.py-1.ml-3.rounded.hover_bg-red-300.text-sm(
          @click="$emit('deleteDrink', id)"
        ) 刪
</template>
<script>
import orderSetting from '@/utils/order';
import { toRef, watchEffect } from 'vue';

export default {
  props: ['order'],
  setup(props) {
    const {
      iceMap, sugarMap, toppingMap, menuMap, mapOrderText, defaultTitle,
    } = orderSetting();
    const data = toRef(props.order, 'data');
    const id = toRef(props.order, 'id');
    watchEffect(() => {
      data.value = props.order.data;
      id.value = props.order.id;
    });
    return {
      id,
      data,
      iceMap,
      sugarMap,
      toppingMap,
      menuMap,
      mapOrderText,
      defaultTitle,
    };
  },
  data() {
    return {
      isEditMode: false,
    };
  },
  mounted() {
  },
  methods: {},
};
</script>
