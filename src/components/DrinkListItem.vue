<template lang="pug">
.drink__list__item__wrapper
  .border-2.border-gray-100.rounded-xl.p-6.my-6.shadow(v-for="order in orders", :key="order.id")
    div.mb-4
      span.p-1 {{ order.who }}
      span 訂了
      span.text-red-300.p-1 {{ order.quantity }}杯
      span.text-purple-400.p-1 {{ mapOrderText('Sugar', order.drinkSugar) }}
      span.text-blue-400.p-1 {{ mapOrderText('Ice', order.drinkIce) }}
      span 的
      span.font-bold.p-1 {{ order.name }}
      span(v-if="order.drinkTopping.length !== 0") 加
        span.text-pink-300.p-1 {{ mapOrderText('Topping', order.drinkTopping) }}
    button.bg-blue-200.px-2.py-1.rounded.hover_bg-blue-300.text-sm(@click="$emit('clickModifyOrder', order.id)") 修改訂單

</template>
<script>
export default {
  props: ['orders'],
  setup() {
    const drinkIceMap = new Map();
    drinkIceMap.set(0, "去冰")
    drinkIceMap.set(2, "正常")
    drinkIceMap.set(3, "熱飲")
    drinkIceMap.set(1, "少冰")
    const drinkSugarMap = new Map();
    drinkSugarMap.set(0, "去糖")
    drinkSugarMap.set(2, "全糖")
    drinkSugarMap.set(3, "多糖")
    drinkSugarMap.set(1, "少糖")
    const drinkToppingMap = new Map();
    drinkToppingMap.set(0, "珍珠")
    drinkToppingMap.set(2, "布丁")
    drinkToppingMap.set(3, "椰果")
    drinkToppingMap.set(1, "咖啡凍")
    return {drinkIceMap, drinkSugarMap, drinkToppingMap}
  },
  methods: {
    mapOrderText(kind, value) {
      const mapObjString = `drink${kind}Map`
      return this[mapObjString].get(value)
    },
  }
};
</script>