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
          @deleteDrink="deleteDrink"
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
import { reactive, ref } from "vue";
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
  setup() {
    const showEditor = ref(false);
    const id = ref(1);
    const drinkOrders = reactive([]);
    drinkOrders.push({
      who: "ME",
      name: "Fresh Milk",
      quantity: "10",
      ice: "1",
      sugar: "1",
      id: 0,
    });
    let drinkOrder = reactive({
      who: "",
      name: "",
      quantity: "",
      ice: "",
      sugar: "",
      id: "",
    });
    const addNewOrder = (form) => {
      // TODO WHY ??? I can not use form to push in to drinkOrders directly ?
      drinkOrders.push({
        who: form.who,
        name: form.name,
        quantity: form.quantity,
        ice: form.ice,
        sugar: form.sugar,
        id: id,
      });
      id.value += 1;
    };
    const openEditor = () => {
      showEditor.value = true;
    };
    const closeEditor = () => {
      showEditor.value = false;
    };
    const clickModifyOrder = (order) => {
      const currentEditDrink = drinkOrders.filter((item) => {
        return item.id === order.id;
      });
      const keys = Object.keys(drinkOrder);
      keys.forEach((key) => {
        drinkOrder[key] = currentEditDrink[0][key];
      });
      openEditor();
    };
    const updateOrderData = (order) => {
      drinkOrders.forEach((item) => {
        if (item.id === order.id) {
          const keys = Object.keys(drinkOrder);
          keys.forEach((key) => {
            item[key] = order[key];
          });
        }
      });
    };
    const deleteDrink = (order) => {
      drinkOrders.forEach((item, index) => {
        if (item.id === order.id) {
          drinkOrders.splice(index, 1)
        }
      });
    };
    return {
      drinkOrders,
      drinkOrder,
      id,
      showEditor,
      addNewOrder,
      clickModifyOrder,
      closeEditor,
      openEditor,
      updateOrderData,
      deleteDrink
    };
  },
  data() {
    return {
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
  }
};
</script>
<style lang="scss">
</style>
