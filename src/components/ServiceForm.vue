<script setup>
import { ref } from "vue";

import DropdownSelect from "../components/DropdownSelect.vue";
import TextInput from "../components/TextInput.vue";

const currencies = ref(["USD", "RUB", "EUR"]);
const dates = ref(["year", "month", "week", "day"]);
</script>

<template>
  <from
    class="pt-6 pb-5 px-4 space-y-3 rounded-2.5xl text-brand-300 bg-brand-gradient"
  >
    <TextInput
      name="description"
      label="Description"
      placeholder="Enter description"
      class="text-white"
    ></TextInput>

    <div class="flex flex-col space-y-1.5 text-base">
      <span class="text-white">Quantity</span>
      <div class="relative flex w-full bg-white rounded-2.5xl">
        <TextInput
          name="quantity"
          placeholder="Enter quantity"
          class="flex-1 min-w-0"
        ></TextInput>
        <DropdownSelect
          :default="dates[1]"
          :options="dates"
          class="z-10 !absolute right-0"
          select-class="bg-transparent"
          name="date"
        ></DropdownSelect>
      </div>
    </div>

    <div class="flex flex-col space-y-1 text-base">
      <span class="text-white">Price</span>
      <div class="relative flex w-full bg-white rounded-xl">
        <TextInput
          name="price"
          placeholder="Enter price"
          class="flex-1 min-w-0"
        ></TextInput>
        <DropdownSelect
          :default="currencies[0]"
          :options="currencies"
          class="z-10 !absolute right-0"
          select-class="bg-transparent"
          name="currency"
        ></DropdownSelect>
      </div>
    </div>

    <TextInput
      name="amount"
      label="Amount"
      placeholder="Enter amount"
      class="text-white"
    ></TextInput>

    <div class="flex space-x-2.5">
      <button
        type="button"
        class="flex flex-1 py-3.5 justify-center border rounded-2.5xl border-white text-white"
      >
        Cancel
      </button>
      <button
        disabled
        type="button"
        class="flex flex-1 py-3.5 justify-center bg-juicyblue-100 border rounded-2.5xl text-white disabled:bg-juicygreen-50"
      >
        Save
      </button>
    </div>
  </from>
</template>
