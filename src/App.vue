<template>
  <h1 class="text-center my-4 text-4xl">我愛喝飲料</h1>
  <div class="drink__wrapper mx-auto w-4/5">
    <functional-button-set
      class="my-5 text-center"
      @order-new-drink="openEditor"
    />
    <div class="drink__list__wrapper my-4">
      <span v-if="drinkOrders.length === 0">
        目前沒有任何訂單，點選 add drink 訂一杯飲料來喝吧！
      </span>
      <div v-for="(order, index) in drinkOrders" :key="index">
        {{ drinkOrders }}
        <DrinkOrder
          :order="order"
          @clickModifyOrder="clickModifyOrder"
          @clickDelete="deleteDrink"
        />
      </div>
      <DrinkEditor
        v-show="showEditor"
        :setting="drinkSetting"
        :drinkOrder="drinkOrder"
        @closeEditor="closeEditor"
        @addNewOrder="addNewOrder"
        @updateOrderData="updateOrderData"
      />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import DrinkEditor from "./components/DrinkEditor.vue";
import DrinkOrder from "./components/DrinkOrder.vue";
import FunctionalButtonSet from "./components/FunctionalButtonSet.vue";
export default {
  name: "App",
  components: {
    DrinkEditor,
    FunctionalButtonSet,
    DrinkOrder,
  },
  setup(){
    const drinkOrders = ref([]);
    const firstDrink =        {
        who: "ME",
        name: "Fresh Milk",
        quantity: "10",
        ice: "1",
        sugar: "1",
      }
    drinkOrders.value.push(firstDrink)
    return { drinkOrders}
  },
  data() {
    return {
      showEditor: false,
      drinkOrder: {
        who: "",
        name: "",
        quantity: "",
        ice: "",
        sugar: "",
      },
      drinkSetting: {
        ice: [
          {
            value: 0,
            text: "去冰",
          },
          {
            value: 1,
            text: "少冰",
          },
          {
            value: 2,
            text: "正常",
          },
          {
            value: 3,
            text: "熱飲",
          },
        ],
        sugar: [
          {
            value: 0,
            text: "去糖",
          },
          {
            value: 1,
            text: "少糖",
          },
          {
            value: 2,
            text: "全糖",
          },
          {
            value: 3,
            text: "多糖",
          },
        ],
      },
    };
  },
  methods: {
    resetDefault() {
      this.drinkOrder = {
        who: "",
        name: "",
        quantity: "",
        ice: "",
        sugar: "",
      };
    },
    addNewOrder(form) {
      this.drinkOrders.push({
      who: form.who,
      name: form.who,
      quantity: form.quantity,
      ice: form.ice,
      sugar: form.sugar,
    })
    console.log('after this.drinkOrders', this.drinkOrders);
    },
    openEditor() {
      this.showEditor = true;
    },
    deleteDrink() {},
    closeEditor() {
      this.showEditor = false;
      this.resetDefault();
    },
    clickModifyOrder() {

    },
    updateOrderData() {

    },
  },
};
</script>
<style lang="scss">
</style>
