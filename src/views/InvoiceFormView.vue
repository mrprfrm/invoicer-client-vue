<script setup>
import TextInput from "../components/TextInput.vue";
import DateInput from "../components/DateInput.vue";
import FlatSelect from "../components/FlatSelect.vue";
import ContractorModal from "../components/ContractorModal.vue";
import ClientModal from "../components/ClientModal.vue";
import ServiceCard from "../components/ServiceCard.vue";
import { useStore } from "vuex";
import { ref, computed } from "vue";
import TextArea from "@/components/TextArea.vue";
import ChevronDown from "@/icons/ChevronDown.vue";
import ChevronUp from "@/icons/ChevronUp.vue";

const store = useStore();

const isTermsOpened = ref(false);

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

const services = ref([
  {
    id: 1,
    description: "Payment by contract NTK-AP-1",
    quantity: 2,
    range: "month",
    amount: 1,
    price: 9873.0,
  },
]);

const clientModalOpened = computed(() => store.state.clientModalOpened);
const contractorModalOpened = computed(() => store.state.contractorModalOpened);

const toggleClientModal = () => store.dispatch("TOGGLE_CLIENT_MODAL");
const toggleContractorModal = () => store.dispatch("TOGGLE_CONTRACTOR_MODAL");

const total = computed(() =>
  services.value
    .filter((itm) => itm.price)
    .reduce((val, itm) => (val += itm.price), 0)
);

function scrollHandler(evt) {
  if (clientModalOpened.value || contractorModalOpened.value) {
    evt.preventDefault();
  }
}
</script>

<template>
  <div
    v-on:scroll="scrollHandler"
    @scroll="scrollHandler"
    class="flex flex-col flex-1 px-4 pt-15 pb-6 bg-white overflow-scroll"
  >
    <form class="flex flex-col text-brand-300 space-y-10">
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
          @click="toggleContractorModal"
          type="button"
          class="flex justify-center text-brand-100 p-4 rounded-2.5xl border border-dashed border-brand-100 outline-none focus:ring-1 focus:ring-juicyblue-100"
        >
          + new contractor
        </button>
      </div>

      <div class="flex flex-col space-y-2.5">
        <h2 class="text-2xl font-semibold">Choose client</h2>
        <FlatSelect :options="clients"></FlatSelect>
        <button
          @click="toggleClientModal"
          type="button"
          class="flex justify-center text-brand-100 p-4 rounded-2.5xl border border-dashed border-brand-100 outline-none focus:ring-1 focus:ring-juicyblue-100"
        >
          + new client
        </button>
      </div>

      <div class="flex flex-col space-y-2.5">
        <h2 class="text-xl font-bold">Goods and services</h2>
        <ServiceCard
          v-for="service in services"
          :key="service.id"
          :service="service"
        ></ServiceCard>

        <ServiceCard :service="service" :edit="true"></ServiceCard>

        <button
          type="button"
          class="flex justify-center text-brand-300 p-4 rounded-xl border border-dashed border-brand-300"
        >
          + add item
        </button>
        <span
          class="self-end text-xl font-semibold p-4 border-2 border-brand-300 rounded-xl"
          >Total {{ total.toFixed(2) }} USD</span
        >
      </div>

      <div class="flex flex-col space-y-2.5">
        <button
          @click="isTermsOpened = !isTermsOpened"
          class="flex flex-row justify-between items-center"
          type="button"
        >
          <h2 class="text-xl font-bold">Terms & Conditions</h2>
          <ChevronDown v-if="!isTermsOpened"></ChevronDown>
          <ChevronUp v-if="isTermsOpened"></ChevronUp>
        </button>
        <div v-if="isTermsOpened">
          <TextArea
            name="terms"
            placeholder="Enter terms and conditions"
          ></TextArea>
        </div>
      </div>

      <button
        type="button"
        class="flex flex-1 p-4 justify-center rounded-2.5xl bg-accept-200 text-xl leading-6 text-white"
      >
        See preview
      </button>
    </form>

    <ClientModal v-if="clientModalOpened"></ClientModal>
    <ContractorModal v-if="contractorModalOpened"></ContractorModal>
  </div>
</template>
