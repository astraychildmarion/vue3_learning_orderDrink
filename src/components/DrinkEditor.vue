<template>
  <div
    class="bg-gray-500 bg-opacity-25 absolute bottom-0 left-0 w-screen h-screen"
  >
    <!-- TODO tainwaid how to show minus -->
    <div
      class="
        bg-white
        px-5
        py-6
        m-4
        rounded-lg
        absolute
        top-50
        transform
        translate-y-50
      "
    >
      <div class="mb-8">
        <label class="mx-2"
          >誰要喝？
          <span class="text-red-400 text-xs" v-show="!isWhoFilled">{{
            errorHint
          }}</span>
          <input
            type="text"
            v-model="form.who"
            class="
              w-full
              content-center
              text-base
              px-1
              mt-1
              mb-4
              border-b border-gray-300
              focus:outline-none
              focus:border-indigo-500
            "
          />
        </label>
        <div class="flex mt-5">
          <label class="mx-2 w-6/12"
            >品名
            <span class="text-red-400 text-xs" v-show="!isNameFilled">{{
              errorHint
            }}</span>
            <input
              type="text"
              v-model="form.name"
              class="
                w-full
                content-center
                text-base
                px-1
                mt-1
                mb-4
                border-b border-gray-300
                focus:outline-none
                focus:border-indigo-500
              "
            />
          </label>
          <label class="mx-2 w-6/12"
            >數量
            <span class="text-red-400 text-xs" v-show="!isQuantityFilled">{{
              errorHint
            }}</span>
            <input
              type="number"
              v-model="form.quantity"
              min="1"
              class="
                w-full
                content-center
                text-base
                px-1
                mt-1
                mb-4
                border-b border-gray-300
                focus:outline-none
                focus:border-indigo-500
              "
            />
          </label>
        </div>
        <div class="flex flex-wrap">
          <template v-for="option in drinkOption" :key="option.value">
            <label :for="option.value" class="m-2 flex-1 w-3/12"
              >{{ option.text }}
              <span class="text-red-400 text-xs" v-show="isShow(option.value)">
                {{ errorHint }}
              </span>
              <select
                v-model="form[`${option.value}`]"
                class="w-4/5 text-center"
              >
                <option
                  v-for="item in setting[`${option.value}`]"
                  :key="item.value"
                  :value="parseInt(item.value)"
                >
                  {{ item.text }}
                </option>
              </select>
            </label>
          </template>
        </div>
      </div>
      {{ form }}
      <!-- <button
        class="
          px-3
          py-1
          bg-pink-400
          hover_bg-pink-500
          text-sm text-white
          rounded
        "
        :disabled="isOrderFilled"
        @click="orderMoreDrink"
      >
        再訂一杯
      </button> -->
      <ConfirmButtonSet
        @click-confirm="sentOrderRequest"
        @click-cancel="closeModal"
      />
    </div>
  </div>
</template>
<script>
import { reactive, computed } from "vue";
import ConfirmButtonSet from "./ConfirmButtonSet.vue";
export default {
  components: { ConfirmButtonSet },
  props: {
    setting: {
      type: Object,
    },
    drinkOrder: {
      type: Object,
    },
  },
  data() {
    return {
      errorHint: "這裡沒填！",
      drinkOption: [
        {
          text: "冰塊",
          value: "ice",
        },
        {
          text: "甜度",
          value: "sugar",
        },
      ],
      error: {
        who: false,
        name: false,
        quantity: false,
        ice: false,
        sugar: false,
      },
    };
  },
  setup(props, { emit }) {
    const form = reactive(props.drinkOrder);

    const isWhoFilled = computed(() => {
      return form.who === "" ? false : true;
    });
    const isNameFilled = computed(() => {
      return form.name === "" ? false : true;
    });
    const isiceFilled = computed(() => {
      return form.ice === "" ? false : true;
    });
    const issugarFilled = computed(() => {
      return form.sugar === "" ? false : true;
    });
    const isQuantityFilled = computed(() => {
      return form.quantity === "" ||
        form.quantity === 0 ||
        form.quantity === undefined
        ? false
        : true;
    });
    const closeModal = () => {
      const keyArray = ["name", "quantity", "ice", "sugar", "who", "id"];
      keyArray.forEach((key) => (form[key] = ""));
      emit("closeEditor");
    };
    const sentOrderRequest = () => {
      if (
        isWhoFilled.value &&
        isNameFilled.value &&
        issugarFilled.value &&
        isiceFilled.value &&
        isQuantityFilled.value
      ) {
        if (form.id !== "") {
          emit("updateOrderData", form);
        } else {
          emit("addNewOrder", form);
        }
        closeModal();
      } else {
        console.log("validation failed");
      }
    };
    return {
      form,
      isWhoFilled,
      isNameFilled,
      issugarFilled,
      isiceFilled,
      isQuantityFilled,
      sentOrderRequest,
      closeModal,
    };
  },
  methods: {
    orderMoreDrink() {
      // TODO check validation no empty input
      // this.drinkOrders.push(Vue.util.extend({}, this.drinkOrder))
    },
    isShow(i) {
      return !this[`is${i}Filled`];
    },
  },
};
</script>
<style option="scss" scoped>
</style>