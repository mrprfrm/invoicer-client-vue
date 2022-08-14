<script setup>
import { useStore } from "vuex";
import TextInput from "../components/TextInput.vue";
import TextArea from "../components/TextArea.vue";

const store = useStore();
const closeContractorModal = () => store.dispatch("CLOSE_CONTRACTOR_MODAL");
</script>

<template>
  <div class="fixed flex flex-col justify-center inset-0 text-brand-400">
    <div class="absolute inset-0 opacity-80 bg-brand-500"></div>
    <div class="z-10 flex flex-col p-4 max-h-screen">
      <div
        class="flex flex-col space-y-2.5 py-7.5 rounded-2.5xl bg-brand-100 max-h-full"
      >
        <h2 class="text-2xl font-semibold mx-4">New contractor</h2>
        <div
          class="flex flex-col space-y-2.5 px-4 overflow-scroll scroll-hidden"
        >
          <TextInput
            name="name"
            label="Name"
            placeholder="Enter name"
          ></TextInput>
          <TextInput name="inn" label="INN" placeholder="Enter INN"></TextInput>
          <TextArea
            name="address"
            label="Registration address"
            placeholder="Enter address"
          ></TextArea>
          <TextInput
            name="bank"
            label="Beneficiary bank"
            placeholder="Enter name"
          ></TextInput>
          <TextArea
            name="bankAddress"
            label="Bank address"
            placeholder="Enter address"
          ></TextArea>
          <TextInput
            name="swift"
            label="SWIFT/BIC"
            placeholder="Enter number"
          ></TextInput>
          <TextInput
            name="account"
            label="Account"
            placeholder="Enter number"
          ></TextInput>
        </div>
        <div class="flex space-x-2.5 mx-4">
          <button
            @click="closeContractorModal"
            type="button"
            class="py-3.5 border border-brand-400 flex-1 rounded-xl"
          >
            Cancel
          </button>
          <button
            class="py-3.5 border border-brand-200 flex-1 rounded-xl bg-brand-200 text-white"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
