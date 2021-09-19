<template>
  <div class="bg-gray-800 bg-opacity-25 absolute bottom-0 left-0 w-screen h-screen flex justify-center items-center">
    <!-- TODO tainwaid how to show minus -->
    <div
      class="
        bg-white
        px-5
        py-6
        m-4
        rounded-lg
      "
    >
      <div class="mb-8">
        <label class="mx-2"
          >誰要喝？
          <span class="text-red-400 text-xs" v-show="!isWhoFilled">{{ errorHint }}</span>
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
            <span class="text-red-400 text-xs" v-show="!isNameFilled">{{ errorHint }}</span>
            <select v-model="form.name" class="w-4/5 text-center">
              <option
                v-for="item in setting.drinkMenu"
                :key="item.value"
                :value="parseInt(item.value)"
              >
                {{ item.text }}
              </option>
            </select>
          </label>
          <label class="mx-2 w-6/12"
            >數量
            <span class="text-red-400 text-xs" v-show="!isQuantityFilled">{{ errorHint }}</span>
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
              <select v-model="form[`${option.value}`]" class="w-4/5 text-center">
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
      <ConfirmButtonSet @click-confirm="sentOrderRequest" @click-cancel="closeModal" />
    </div>
  </div>
</template>
<script>
import { ref, computed } from 'vue';
import ConfirmButtonSet from './ConfirmButtonSet.vue';

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
      errorHint: '這裡沒填！',
      drinkOption: [
        {
          text: '冰塊',
          value: 'ice',
        },
        {
          text: '甜度',
          value: 'sugar',
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
    const form = ref(props.drinkOrder);

    const isWhoFilled = computed(() => form.value.who !== '');
    const isNameFilled = computed(() => form.value.name !== '');
    const isiceFilled = computed(() => form.value.ice !== '');
    const issugarFilled = computed(() => form.value.sugar !== '');
    const isQuantityFilled = computed(
      () => !(form.value.quantity === '' || form.value.quantity === 0 || form.value.quantity === undefined),
    );
    const closeModal = () => {
      const keyArray = ['name', 'quantity', 'ice', 'sugar', 'who', 'id'];
      keyArray.forEach((key) => (
        form.value[key] = ''
      ));
      emit('closeEditor');
    };
    const sentOrderRequest = () => {
      if (
        isWhoFilled.value
        && isNameFilled.value
        && issugarFilled.value
        && isiceFilled.value
        && isQuantityFilled.value
      ) {
        if (form.value.id !== '') {
          const order = {
            data: {
              name: form.value.name,
              quantity: form.value.quantity,
              ice: form.value.ice,
              sugar: form.value.sugar,
              who: form.value.who,
            },
            id: form.value.id,
          };
          emit('updateOrderData', order);
        } else {
          emit('addNewOrder', form.value);
        }
        closeModal();
      } else {
        console.log('validation failed');
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
    isShow(i) {
      return !this[`is${i}Filled`];
    },
  },
};
</script>
<style option="scss" scoped></style>
