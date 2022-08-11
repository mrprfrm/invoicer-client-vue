<script setup>
import TextInput from "../components/TextInput.vue";
import DateInput from "../components/DateInput.vue";
import FlatSelect from "../components/FlatSelect.vue";
import { ref } from "vue";

const date = ref("");
const contractors = ref([
  {
    id: 1,
    name: "IE Petrov Anton Sergeevich",
  },
  {
    id: 2,
    name: "IE Petrov",
  },
]);
const clients = ref([
  {
    id: 1,
    name: "NITKA, INC., Virgin Islands, British",
  },
]);
</script>

<template>
  <div class="flex flex-col flex-1 px-4 py-15 bg-brand-100">
    <form class="flex flex-col text-brand-400 space-y-10">
      <h1 class="text-3xl font-bold">Invoice</h1>
      <div class="flex flex-col space-y-2.5">
        <h2 class="text-2xl font-semibold">Invoice information</h2>
        <fieldset id="invoice-fields" class="space-y-2.5">
          <TextInput
            name="invoice-name"
            label="Invoice name"
            placeholder="Enter name"
          ></TextInput>
          <DateInput
            name="invoice-date"
            label="Invoice date"
            placeholder="Enter date"
            v-model="date"
          ></DateInput>
          <TextInput
            name="contract-name"
            label="Contract name"
            placeholder="Enter name"
          ></TextInput>
          <DateInput
            name="contract-name"
            label="Contract date"
            placeholder="Enter date"
          ></DateInput>
        </fieldset>
      </div>

      <div class="flex flex-col space-y-2.5">
        <h2 class="text-2xl font-semibold">Choose contractor</h2>
        <FlatSelect :options="contractors"></FlatSelect>
        <button
          type="button"
          class="flex justify-center text-brand-300 p-4 rounded-xl border border-dashed border-brand-300"
        >
          + new contractor
        </button>
      </div>

      <div class="flex flex-col space-y-2.5">
        <h2 class="text-2xl font-semibold">Choose client</h2>
        <FlatSelect :options="clients"></FlatSelect>
        <button
          class="flex justify-center text-brand-300 p-4 rounded-xl border border-dashed border-brand-300"
        >
          + new client
        </button>
      </div>

      <div id="invoice-services" class="space-y-4">
        <h2 class="text-xl font-bold">Goods and services</h2>
        <div class="services__description">
          <span>There is no added goods or services yet.</span>
          <span class="flex flex-row items-center">
            Do you want to
            <button
              id="add-service"
              class="p-1 ml-1 text-base font-bold rounded-md focus:ring-2 ring-blue-600 outline-none branded-text focus:ring-brand"
            >
              Add new item
            </button>
            ?
          </span>
        </div>
      </div>

      <div
        id="invoice-buttons"
        class="flex flex-row items-center justify-end space-x-2"
      >
        <button id="invoice-cancel" type="button" class="btn focus:ring-brand">
          Cancel
        </button>
        <button
          id="invoice-save"
          type="submit"
          class="btn text-white branded-bg focus:ring-brand"
        >
          Save
        </button>
      </div>
    </form>
  </div>
</template>
