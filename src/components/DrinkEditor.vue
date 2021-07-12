<template>
  <div
    class="
      drink__detail__bg
      bg-gray-500
      bg-opacity-25
      absolute
      bottom-0
      left-0
      w-screen
      h-screen
    "
  >
    <!-- TODO tainwaid how to show minus -->
    <div
      class="
        drink__detail
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
      <div class="flex mb-8">
        <label for="who" class="flex-1 mx-2"
          >誰要喝？
          <input
            type="text"
            id="who"
            v-model="form.who"
            class="
              w-full
              content-center
              text-base
              py-2
              border-b border-gray-300
              focus:outline-none
              focus:border-indigo-500
            "
          />
          <span class="text-red-400 text-xs" v-show="error.who">{{ errorHint }}</span>
        </label>
        <label for="name" class="flex-1 mx-2"
          >品名
          <input
            type="text"
            id="name"
            v-model="form.name"
            class="
              w-full
              content-center
              text-base
              py-2
              border-b border-gray-300
              focus:outline-none
              focus:border-indigo-500
            "
          />
          <span class="text-red-400 text-xs" v-show="error.name">{{ errorHint }}</span>

        </label>
        <label for="quantity" class="flex-1 mx-2"
          >數量
          <input
            type="number"
            id="quantity"
            v-model="form.quantity"
            min="1"
            class="
              w-full
              content-center
              text-base
              py-2
              border-b border-gray-300
              focus:outline-none
              focus:border-indigo-500
            "
          />
          <span class="text-red-400 text-xs" v-show="error.quantity">{{ errorHint }}</span>
        </label>
      </div>
      <div class="flex mb-8">
        <template v-for="lang in defaultTitle" :key="lang.value">
          <label :for="lang.value" class="flex-1 block mx-2"
            >{{ lang.text }}
            <select :id="lang.value" v-model="form[lang.value]" class="w-4/5">
              <option
                v-for="item in setting[`${lang.value}`]"
                :key="item.value"
                :value="parseInt(item.value)"
              >
                {{ item.text }}
              </option>
            </select>
            <div class="text-red-400 text-xs" v-show="error[`${lang.value}`]">{{ errorHint }}</div>
          </label>
        </template>
      </div>
      {{ form }}
      <confirm-button-set @click-confirm="checkValidation" @click-cancel="closeModal" />
    </div>
  </div>
</template>
<script>
import {reactive } from 'vue';
import ConfirmButtonSet from "./ConfirmButtonSet.vue";
export default {
  components: { ConfirmButtonSet },
  props: {
    setting: {
      type: Object,
    },
    editOrderData: {
      type: Object
    }
  },
  data() {
    return {
      errorHint: "這裡沒填！",
      defaultTitle: [
        {
          text: "冰塊",
          value: "drinkIce",
        },
        {
          text: "甜度",
          value: "drinkSugar",
        },
        {
          text: "配料",
          value: "drinkTopping",
        },
      ],
      keyArray: ['name', 'quantity', 'drinkIce', 'drinkSugar', 'drinkTopping', 'who', 'id']
    };
  },
  setup(props) {
    const error = reactive({
      name: false,
      quantity: false,
      drinkIce: false,
      drinkSugar: false,
      drinkTopping: false,
      who: false,
    })
    const form = reactive({
        name: props.editOrderData.name,
        quantity: props.editOrderData.quantity,
        drinkIce: props.editOrderData.drinkIce,
        drinkSugar: props.editOrderData.drinkSugar,
        drinkTopping: props.editOrderData.drinkTopping,
        who: props.editOrderData.who,
        id: props.editOrderData.id,
      })
    console.log('form', form)
    const errorCheckArray = Object.keys(error);
    return { errorCheckArray, error, form }
  },
  methods: {
    checkValidation() {
      const errorArray = []
      this.errorCheckArray.forEach(key => this.error[key] = false)
      this.errorCheckArray.forEach(key => {
        if (this.form[key] === '') errorArray.push(key)
      })
      if (errorArray.length !== 0) errorArray.forEach(key => this.error[key] = true )
      else this.sentOrderRequest()
    },
    sentOrderRequest() {
      console.log('edited form', this.form)
      if (this.form.id !== '') {
        this.$emit('updateOrderData', this.form)
      } else {
        this.$emit('addNewOrder', this.form)
      }
      this.closeModal()
    },
    closeModal() {
      this.keyArray.forEach(key => this.form[key] = '')
      this.$emit('closeEditorModal')
    }
  }
};
</script>
<style lang="scss" scoped>
</style>