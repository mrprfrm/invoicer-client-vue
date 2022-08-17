<script setup>
import { ref, defineProps } from "vue";

import DropdownSelect from "../components/DropdownSelect.vue";
import TextInput from "../components/TextInput.vue";
import DotsIcon from "../icons/DotsIcon.vue";

defineProps(["service", "edit"]);

const dates = ref(["year", "month", "week", "day"]);

const currencies = ref(["USD", "RUB", "EUR"]);
</script>

<template>
  <div
    class="flex flex-col py-6 px-4 bg-brand-gradient rounded-2.5xl text-white"
  >
    <div v-if="!edit" class="flex flex-col space-y-2.5">
      <div class="flex space-x-6 items-start justify-between">
        <span class="text-xl font-semibold leading-6">{{
          service.description
        }}</span>
        <button type="button">
          <DotsIcon></DotsIcon>
        </button>
      </div>
      <span class="text-base leading-none"
        >{{ service.quantity }} {{ service.range }}</span
      >
      <div class="flex justify-between">
        <span>{{ service.amount }}</span>
        <span class="text-xl leading-none font-semibold">{{
          service.price.toFixed(2)
        }}</span>
      </div>
    </div>

    <form v-if="edit" class="space-y-2.5">
      <TextInput
        name="description"
        label="Description"
        placeholder="Enter description"
      ></TextInput>

      <div class="flex flex-col space-y-1 text-base">
        <span>Quantity</span>
        <div class="flex w-full bg-white rounded-xl">
          <TextInput
            name="quantity"
            placeholder="Enter quantity"
            input-class="rounded-r-none"
            class="flex-1 min-w-0"
          ></TextInput>
          <DropdownSelect
            :default="dates[1]"
            :options="dates"
            select-class="rounded-l-none"
            name="date"
          ></DropdownSelect>
        </div>
      </div>

      <div class="flex flex-col space-y-1 text-base">
        <span>Price</span>
        <div class="flex w-full bg-white rounded-xl">
          <TextInput
            name="price"
            placeholder="Enter price"
            input-class="rounded-r-none"
            class="flex-1 min-w-0"
          ></TextInput>
          <DropdownSelect
            :default="currencies[0]"
            :options="currencies"
            select-class="rounded-l-none"
            name="currency"
          ></DropdownSelect>
        </div>
      </div>

      <TextInput
        name="amount"
        label="Amount"
        placeholder="Enter amount"
      ></TextInput>

      <div class="flex space-x-2.5">
        <button
          type="button"
          class="flex flex-1 py-3.5 justify-center border rounded-xl border-white"
        >
          Cancel
        </button>
        <button
          disabled
          type="button"
          class="flex flex-1 py-3.5 justify-center bg-accept-200 border rounded-xl disabled:bg-accept-100"
        >
          Save
        </button>
      </div>
    </form>
  </div>
</template>
