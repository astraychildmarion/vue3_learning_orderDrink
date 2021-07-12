<template>
  <h1 class="text-center my-4 text-4xl">我愛喝飲料</h1>
  <div class="drink__wrapper mx-auto w-4/5">
    <functional-button-set
      class="my-5 text-center"
      @order-new-drink="openEditor"
    />
    <div class="drink__list__wrapper my-4">
      <span v-if="drinkOrderData.length === 0">
        目前沒有任何訂單，點選 add drink 訂一杯飲料來喝吧！
      </span>
      <drink-list-item
        v-else
        :orders="drinkOrderData"
        @clickModifyOrder="clickModifyOrder"
        @clickDelete="deleteDrink"
      />
      <drink-editor
        v-if="showDrinkEditor"
        :setting="drinkSetting"
        :editOrderData="editOrderData"
        @closeEditorModal="closeEditorModal"
        @addNewOrder="addNewOrder"
        @updateOrderData="updateOrderData"
      />
    </div>
  </div>
</template>

<script>
import DrinkEditor from "./components/DrinkEditor.vue";
import DrinkListItem from "./components/DrinkListItem.vue";
import FunctionalButtonSet from "./components/FunctionalButtonSet.vue";
export default {
  name: "App",

  components: {
    DrinkEditor,
    FunctionalButtonSet,
    DrinkListItem,
  },

  data() {
    return {
      nextId: 3,
      showDrinkEditor: false,
      editOrderData: {
        name: "",
        quantity: "",
        drinkIce: "",
        drinkSugar: "",
        drinkTopping: "",
        who: "",
        id: "",
      },
      drinkOrderData: [
        {
          name: "紅茶",
          quantity: 1,
          drinkIce: 0,
          drinkSugar: 2,
          drinkTopping: 1,
          who: "添寶",
          id: 1,
        },
        {
          name: "奶茶",
          quantity: 3,
          drinkIce: 1,
          drinkSugar: 2,
          drinkTopping: "",
          who: "景鴻",
          id: 2,
        },
      ],
      drinkSetting: {
        drinkIce: [
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
        drinkSugar: [
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
        drinkTopping: [
          {
            value: 0,
            text: "珍珠",
          },
          {
            value: 1,
            text: "咖啡凍",
          },
          {
            value: 2,
            text: "布丁",
          },
          {
            value: 3,
            text: "椰果",
          },
        ],
      },
    };
  },
  methods: {
    resetDefault() {
      this.editOrderData = {
        name: "",
        quantity: "",
        drinkIce: "",
        drinkSugar: "",
        drinkTopping: "",
        who: "",
        id: "",
      };
    },
    openEditor() {
      this.resetDefault();
      this.showDrinkEditor = true;
    },
    deleteDrink(id) {
      this.drinkOrderData.forEach((item, index) => {
        if (item.id === id) {
          console.log(item.id, id, index);
          this.drinkOrderData.splice(index,1)
          return
        }
      });
    },
    closeEditorModal() {
      this.showDrinkEditor = false;
      this.resetDefault();
    },
    clickModifyOrder(id) {
      const selectedOrder = this.drinkOrderData.filter((item) => {
        return item.id === id;
      });
      this.editOrderData = selectedOrder[0];
      this.showDrinkEditor = true;
    },
    updateOrderData(data) {
      const id = data.id;
      this.drinkOrderData.forEach((item, index) => {
        if (item.id === id) {
          this.drinkOrderData[index] = {
            name: data.name,
            quantity: data.quantity,
            drinkIce: data.drinkIce,
            drinkSugar: data.drinkSugar,
            drinkTopping: data.drinkTopping,
            who: data.who,
            id: this.nextId,
          };
        }
      });
    },
    addNewOrder(data) {
      this.nextId += 1;
      this.drinkOrderData.push({
        name: data.name,
        quantity: data.quantity,
        drinkIce: data.drinkIce,
        drinkSugar: data.drinkSugar,
        drinkTopping: data.drinkTopping,
        who: data.who,
        id: this.nextId,
      });
    },
  },
};
</script>
<style lang="scss">
</style>
