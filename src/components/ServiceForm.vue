<script setup>
import { ref } from "vue";

import DropdownSelect from "../components/DropdownSelect.vue";
import TextArea from "./TextArea.vue";

const currencies = ref(["USD", "RUB", "EUR"]);
const dates = ref(["year", "month", "week", "day"]);

const currency = ref(null);
const date = ref(null);
</script>

<template>
  <form
    class="pt-6 pb-5 px-4 space-y-3 rounded-2.5xl text-violetgray-300 bg-violetgray-gradient"
  >
    <div class="flex flex-col space-y-1.5 text-base">
      <label class="text-white">Description</label>
      <TextArea placeholder="Enter description" allow-new-lines="false" />
    </div>

    <div class="flex flex-col space-y-1.5 text-base">
      <span class="text-white">Quantity</span>
      <div
        class="relative flex w-full bg-white rounded-2.5xl shadow-inner-violetgray"
      >
        <input
          type="number"
          class="w-full !rounded-r-none !shadow-none !bg-transparent"
          placeholder="Enter quantity"
        />
        <DropdownSelect
          :default="dates[1]"
          :options="dates"
          v-model="date"
          class="right-0 bg-transparent"
          name="date"
        ></DropdownSelect>
      </div>
    </div>

    <div class="flex flex-col space-y-1 text-base">
      <span class="text-white">Price</span>
      <div
        class="relative flex w-full bg-white rounded-2.5xl shadow-inner-violetgray"
      >
        <input
          type="number"
          class="w-full !rounded-r-none !shadow-none !bg-transparent"
          placeholder="Enter price"
        />

        <DropdownSelect
          :default="currencies[0]"
          :options="currencies"
          v-model="currency"
          class="right-0 bg-transparent"
          name="currency"
        ></DropdownSelect>
      </div>
    </div>

    <div class="flex flex-col space-y-1.5 text-base">
      <label class="text-white">Amount</label>
      <input type="number" placeholder="Enter amount" />
    </div>

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
        class="flex flex-1 py-3.5 justify-center border-none rounded-2.5xl text-white disabled:bg-juicygreen-50"
      >
        Save
      </button>
    </div>
  </form>
</template>
