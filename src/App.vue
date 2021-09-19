<template>
  <h1 class="text-center my-4 text-4xl">我愛喝飲料</h1>
  <div class="drink__wrapper mx-auto w-4/5">
    <functional-button-set class="my-5 text-center" @order-new-drink="openEditor" />
    <div class="drink__list__wrapper my-4">
      <span v-if="loading">Loading...</span>
      <div v-else>
        <span v-if="drinkOrders.length === 0">
          目前沒有任何訂單，點選 add drink 訂一杯飲料來喝吧！
        </span>
        <div v-for="(order, index) in drinkOrders" :key="index">
          <DrinkOrder
            :order="order"
            @clickModifyOrder="clickModifyOrder"
            @deleteDrink="deleteDrink"
          />
        </div>
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
import { reactive, ref } from 'vue';
import DrinkEditor from './components/DrinkEditor.vue';
import DrinkOrder from './components/DrinkOrder.vue';
import FunctionalButtonSet from './components/FunctionalButtonSet.vue';
import * as api from './api';

export default {
  name: 'App',
  components: {
    DrinkEditor,
    FunctionalButtonSet,
    DrinkOrder,
  },
  setup() {
    const loading = ref(false);
    const showEditor = ref(false);
    const drinkOrders = ref([]);
    const drinkOrder = reactive({
      who: '',
      name: '',
      quantity: '',
      ice: '',
      sugar: '',
      id: '',
    });
    const getAOrders = async () => {
      loading.value = true;
      const data = await api.getAllDrinks();
      drinkOrders.value = data;
      loading.value = false;
    };

    const openEditor = () => {
      showEditor.value = true;
    };
    const closeEditor = () => {
      showEditor.value = false;
    };
    const clickModifyOrder = async (id) => {
      const selectedDrink = await api.getOneDrink(id);
      const keys = Object.keys(drinkOrder);
      keys.forEach((key) => {
        drinkOrder[key] = selectedDrink.data[key];
      });
      drinkOrder.id = selectedDrink.id;
      openEditor();
    };
    const updateOrderData = async (order) => {
      await api.updateDrink(order);
      getAOrders();
    };
    const deleteDrink = async (id) => {
      // console.log('delete', order.id);
      await api.deleteDrink(id);
      getAOrders();
    };

    getAOrders();

    return {
      loading,
      drinkOrders,
      drinkOrder,
      showEditor,
      clickModifyOrder,
      closeEditor,
      openEditor,
      updateOrderData,
      deleteDrink,
      getAOrders,
    };
  },
  data() {
    return {
      drinkSetting: {
        ice: [
          {
            value: 0,
            text: '去冰',
          },
          {
            value: 1,
            text: '少冰',
          },
          {
            value: 2,
            text: '正常',
          },
          {
            value: 3,
            text: '熱飲',
          },
        ],
        sugar: [
          {
            value: 0,
            text: '去糖',
          },
          {
            value: 1,
            text: '少糖',
          },
          {
            value: 2,
            text: '全糖',
          },
          {
            value: 3,
            text: '多糖',
          },
        ],
        drinkMenu: [
          {
            text: '蘋果紅萱',
            value: '1',
          },
          {
            text: '翡翠綠茶',
            value: '2',
          },
          {
            text: '鳳梨蜜',
            value: '3',
          },
          {
            text: '厚奶茶',
            value: '4',
          },
          {
            text: '四季春',
            value: '5',
          },
        ],
      },
    };
  },
  methods: {
    async addNewOrder(form) {
      // TODO WHY ??? I can not use form to push in to drinkOrders directly ?
      // use ref, so have to emit back xxx.value
      await api.addDrink(form);
      this.closeEditor();
      this.getAOrders();
    },
  },
};
</script>
<style lang="scss"></style>
