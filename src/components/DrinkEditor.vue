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
          <span class="text-red-400 text-xs" v-show="error.who">{{
            errorHint
          }}</span>
        </label>
        <div class="flex mt-5">
          <label class="mx-2 w-6/12"
            >品名
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
            <span class="text-red-400 text-xs" v-show="error.name">{{
              errorHint
            }}</span>
          </label>
          <label class="mx-2 w-6/12"
            >數量
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
            <span class="text-red-400 text-xs" v-show="error.quantity">{{
              errorHint
            }}</span>
          </label>
        </div>
        <div class="flex flex-wrap">
          <template v-for="option in drinkOption" :key="option.value">
            <label :for="option.value" class="m-2 flex-1 w-3/12"
              >{{ option.text }}
              <select
                :id="option.value"
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
              <div
                class="text-red-400 text-xs"
                v-show="error[`${option.value}`]"
              >
                {{ errorHint }}
              </div>
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
        @click-confirm="checkValidation"
        @click-cancel="closeModal"
      />
    </div>
  </div>
</template>
<script>
import { reactive } from "vue";
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
      keyArray: ["name", "quantity", "ice", "sugar", "who", "id"],
    };
  },
  setup(props) {
    const error = reactive({
      name: false,
      quantity: false,
      ice: false,
      sugar: false,
      who: false,
    });
    const form = reactive({
      who: props.drinkOrder.who,
      name: props.drinkOrder.who,
      quantity: props.drinkOrder.quantity,
      ice: props.drinkOrder.ice,
      sugar: props.drinkOrder.sugar,
    });
    const errorCheckArray = Object.keys(error);
    return { errorCheckArray, error, form };
  },
  computed: {
    isOrderFilled() {
      // TODO check form , if all is filled, cancel disabled.
      return true;
    },
  },
  methods: {
    checkValidation() {
      // TODO form validation
      this.sentOrderRequest();
    },
    sentOrderRequest() {
      console.log("sentOrderRequest", this.form, typeof this.form);
      this.$emit('addNewOrder', this.form)
      this.closeModal();
    },
    orderMoreDrink() {
      // TODO check validation no empty input
      // this.drinkOrders.push(Vue.util.extend({}, this.drinkOrder))
    },
    closeModal() {
      this.keyArray.forEach((key) => (this.form[key] = ""));
      this.$emit("closeEditor");
    },
  },
};
</script>
<style option="scss" scoped>
</style>