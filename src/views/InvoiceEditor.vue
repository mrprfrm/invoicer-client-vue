<script setup>
import { useStore } from "vuex";
import { reactive, computed } from "vue";

import ChevronDown from "@/icons/ChevronDown.vue";
import ChevronUp from "@/icons/ChevronUp.vue";

import TextForm from "@/components/TextForm.vue";
import DateField from "@/components/DateField.vue";
import FlatSelect from "@/components/FlatSelect.vue";
import ContractorDialog from "@/components/ContractorDialog.vue";
import ClientDialog from "@/components/ClientDialog.vue";
import ServiceForm from "@/components/ServiceForm.vue";
import ServiceDiscardDialog from "@/components/ServiceDiscardDialog.vue";

const store = useStore();

const state = reactive({
  termsOpened: false,
});

const clientOpened = computed(() => store.state.clients.opened);
const contractorOpened = computed(() => store.state.contractors.opened);
const discardOpened = computed(() => store.state.services.discardOpened);

// INVOICE MAIN ATTRIBUTES
const invoiceName = computed({
  get() {
    return store.state.invoices.invoiceName;
  },
  set(value) {
    store.commit("SET_INVOICE_NAME", value);
  },
});
const invoiceDate = computed({
  get() {
    return store.state.invoices.invoiceDate;
  },
  set(value) {
    store.commit("SET_INVOICE_DATE", value);
  },
});

// CONTRACT ATTRIBUTES
const contractName = computed({
  get() {
    return store.state.invoices.contractName;
  },
  set(value) {
    store.commit("SET_CONTRACT_NAME", value);
  },
});
const contractDate = computed({
  get() {
    return store.state.invoices.contractDate;
  },
  set(value) {
    store.commit("SET_CONTRACT_DATE", value);
  },
});

// CLIENT ATTRIBUTES
const clients = computed(() => store.state.clients.clients);
const client = computed({
  get() {
    return store.state.invoices.client;
  },
  set(value) {
    store.commit("SET_INVOICE_CLIENT", value);
  },
});

const contractors = computed(() => store.state.contractors.contractors);
const contractor = computed({
  get() {
    return store.state.invoices.contractor;
  },
  set(value) {
    store.commit("SET_INVOICE_CONTRACTOR", value);
  },
});

const services = computed(() => store.state.services.services);
const total = computed(() =>
  services.value
    .filter((itm) => itm.price)
    .reduce((val, itm) => (val += itm.price), 0)
);

const terms = computed({
  get() {
    return store.state.invoices.terms;
  },
  set(value) {
    store.commit("SET_INVOICE_TERMS", value);
  },
});

function toggleClientDialog() {
  store.dispatch("TOGGLE_CLIENT_DIALOG");
}

function toggleContractorDialog() {
  store.dispatch("TOGGLE_CONTRACTOR_DIALOG");
}

function onScroll(evt) {
  if (clientOpened.value || contractorOpened.value) {
    evt.preventDefault();
  }
}
// TODO: add validation for editor fields
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
            <input type="text" placeholder="Enter name" v-model="invoiceName" />
          </div>

          <div class="flex flex-col space-y-1.5">
            <label>Invoice date</label>
            <DateField v-model="invoiceDate" />
          </div>

          <div class="flex flex-col space-y-1.5">
            <label>Contract name</label>
            <input
              type="text"
              placeholder="Enter name"
              v-model="contractName"
            />
          </div>

          <div class="flex flex-col space-y-1.5">
            <label>Contract date</label>
            <DateField v-model="contractDate" />
          </div>
        </fieldset>
      </div>

      <div class="flex flex-col space-y-3">
        <h2 class="text-2xl font-semibold">Choose contractor</h2>
        <FlatSelect
          display="name"
          v-if="contractors.lenght > 0"
          v-model="contractor"
          :options="contractors"
        />
        <button
          @click="toggleContractorDialog"
          type="button"
          class="flex justify-center text-violetgray-100 py-5 px-4.5 rounded-2.5xl border border-dashed border-violetgray-100 outline-none focus:ring-1 focus:ring-juicyblue-100"
        >
          + new contractor
        </button>
      </div>

      <div class="flex flex-col space-y-3">
        <h2 class="text-2xl font-semibold">Choose client</h2>
        <FlatSelect
          display="name"
          v-if="clients.length > 0"
          v-model="client"
          :options="clients"
        />
        <button
          @click="toggleClientDialog"
          type="button"
          class="flex justify-center text-violetgray-100 py-5 px-4.5 rounded-2.5xl border border-dashed border-violetgray-100 outline-none focus:ring-1 focus:ring-juicyblue-100"
        >
          + new client
        </button>
      </div>

      <div class="flex flex-col space-y-3">
        <h2 class="text-2xl font-semibold">Goods and services</h2>
        <ServiceForm
          v-for="{ service, index } in services"
          :key="service?.id"
          :index="index"
        />
        <ServiceForm v-if="services.length === 0" />

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
            v-model="terms"
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

    <ClientDialog v-if="clientOpened" />
    <ContractorDialog v-if="contractorOpened" />
    <ServiceDiscardDialog v-if="discardOpened" />
  </div>
</template>
