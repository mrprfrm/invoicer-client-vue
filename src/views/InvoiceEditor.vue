<script setup>
import { useStore } from "vuex";
import { reactive, computed } from "vue";

import ChevronDown from "@/icons/ChevronDown.vue";
import ChevronUp from "@/icons/ChevronUp.vue";

import TextForm from "@/components/TextForm.vue";
import DateField from "@/components/DateField.vue";
import FlatSelect from "@/components/FlatSelect.vue";
import ContractorModal from "@/components/ContractorModal.vue";
import ClientModal from "@/components/ClientModal.vue";
import ServiceForm from "@/components/ServiceForm.vue";

const store = useStore();

const state = reactive({
  termsOpened: false,
});

const toggleClientModal = () => store.dispatch("TOGGLE_CLIENT_MODAL");
const toggleContractorModal = () => store.dispatch("TOGGLE_CONTRACTOR_MODAL");

const total = computed(() =>
  store.state.services.services
    .filter((itm) => itm.price)
    .reduce((val, itm) => (val += itm.price), 0)
);

function onScroll(evt) {
  if (store.state.clients.opened || store.state.contractors.opened) {
    evt.preventDefault();
  }
}
</script>

<template>
  <div
    @scroll="onScroll"
    class="flex flex-col flex-1 px-4 pt-15 pb-6 bg-white overflow-scroll"
  >
    <form class="flex flex-col text-violetgray-300 space-y-10">
      <h1 class="text-3xl font-bold">Invoice</h1>
      <div class="flex flex-col space-y-3">
        <h2 class="text-2xl font-semibold">Invoice information</h2>
        <fieldset id="invoice-fields" class="space-y-3 flex flex-col">
          <div class="flex flex-col space-y-1.5">
            <label>Invoice name</label>
            <input
              type="text"
              placeholder="Enter name"
              v-model="store.state.invoices.invoiceName"
            />
          </div>

          <div class="flex flex-col space-y-1.5">
            <label>Invoice date</label>
            <DateField v-model="store.state.invoices.invoiceDate" />
          </div>

          <div class="flex flex-col space-y-1.5">
            <label>Contract name</label>
            <input
              type="text"
              placeholder="Enter name"
              v-model="store.state.invoices.contractName"
            />
          </div>

          <div class="flex flex-col space-y-1.5">
            <label>Contract date</label>
            <DateField v-model="store.state.invoices.contractDate" />
          </div>
        </fieldset>
      </div>

      <div class="flex flex-col space-y-3">
        <h2 class="text-2xl font-semibold">Choose contractor</h2>
        <FlatSelect
          v-if="store.state.contractors.contractors.lenght > 0"
          v-model="store.state.invoices.contractor"
          display="name"
          :options="store.state.contractors.contractors"
        />
        <button
          @click="toggleContractorModal"
          type="button"
          class="flex justify-center text-violetgray-100 py-5 px-4.5 rounded-2.5xl border border-dashed border-violetgray-100 outline-none focus:ring-1 focus:ring-juicyblue-100"
        >
          + new contractor
        </button>
      </div>

      <div class="flex flex-col space-y-3">
        <h2 class="text-2xl font-semibold">Choose client</h2>
        <FlatSelect
          v-if="store.state.clients.clients.length > 0"
          v-model="store.state.invoices.client"
          display="name"
          :options="store.state.clients.clients"
        />
        <button
          @click="toggleClientModal"
          type="button"
          class="flex justify-center text-violetgray-100 py-5 px-4.5 rounded-2.5xl border border-dashed border-violetgray-100 outline-none focus:ring-1 focus:ring-juicyblue-100"
        >
          + new client
        </button>
      </div>

      <div class="flex flex-col space-y-3">
        <h2 class="text-2xl font-semibold">Goods and services</h2>
        <ServiceForm
          v-for="{ service, index } in store.state.invoices.services"
          :key="service?.id"
          :index="index"
        />
        <ServiceForm v-if="store.state.services.services.length === 0" />

        <button
          type="button"
          class="flex justify-center text-violetgray-100 py-5 px-4.5 rounded-2.5xl border border-dashed border-violetgray-100"
        >
          + add item
        </button>
      </div>

      <span
        class="self-end text-xl font-semibold p-4 border-2 border-violetgray-100 rounded-2.5xl"
        >Total {{ total.toFixed(2) }} USD</span
      >

      <div class="flex flex-col space-y-2.5">
        <button
          @click="state.termsOpened = !state.termsOpened"
          class="flex flex-row justify-between items-center"
          type="button"
        >
          <h2 class="text-xl font-bold">Terms & Conditions</h2>
          <ChevronDown v-if="!state.termsOpened"></ChevronDown>
          <ChevronUp v-if="state.termsOpened"></ChevronUp>
        </button>
        <div v-if="state.termsOpened">
          <TextForm
            name="terms"
            placeholder="Enter terms and conditions"
            v-model="store.state.invoices.terms"
          ></TextForm>
        </div>
      </div>

      <button
        type="button"
        class="flex flex-1 p-4 justify-center rounded-2.5xl bg-accept-200 text-xl leading-6 text-white"
      >
        See preview
      </button>
    </form>

    <ClientModal v-if="store.state.clients.opened"></ClientModal>
    <ContractorModal v-if="store.state.contractors.opened"></ContractorModal>
  </div>
</template>
