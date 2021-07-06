<template>
  <div class="drink__function__wrapper">
    <button
      class="
        drink__function__btn-create
        px-6
        py-2
        mr-6
        bg-green-400
        hover_bg-green-500
        rounded
      "
      @click="$emit('orderNewDrink')"
    >
      訂一杯
    </button>
    <button
      class="
        drink__function__btn-delete
        px-6
        py-2
        mr-6
        bg-gray-300
        hover_bg-red-500
        rounded
      "
      @click="$emit('deleteDrink')"
    >
      刪一杯
    </button>
  </div>
</template>
<script>
export default {
  setup() {},
};
</script>