<script setup>
import { useStore } from "vuex";
import TextInput from "../components/TextInput.vue";
import TextArea from "./TextArea.vue";

const store = useStore();
const closeDialog = () => store.dispatch("CLOSE_CLIENT_DIALOG");
</script>

<template>
  <div class="fixed flex flex-col justify-center inset-0 text-violetgray-300">
    <div class="absolute inset-0 opacity-90 bg-violetgray-300"></div>
    <div class="z-10 flex flex-col p-4 max-h-screen">
      <div
        class="flex flex-col space-y-3 pt-7.5 pb-4 rounded-2.5xl bg-white max-h-full"
      >
        <h2 class="text-2xl mx-4 font-semibold">New client</h2>
        <div class="flex flex-col space-y-3 px-4 overflow-scroll scroll-hidden">
          <TextInput
            name="name"
            label="Name"
            placeholder="Enter name"
          ></TextInput>
          <TextArea
            name="address"
            label="Registration address"
            allow-new-lines="false"
            placeholder="Enter address"
          ></TextArea>
          <TextArea
            name="bankAddress"
            label="Bank address"
            allow-new-lines="false"
            placeholder="Enter address"
          ></TextArea>
          <TextInput
            name="swift"
            label="SWIFT"
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
            @click="closeDialog"
            type="button"
            class="py-3.5 border border-violetgray-100 flex-1 rounded-2.5xl text-violetgray-200"
          >
            Cancel
          </button>
          <button
            class="py-3.5 border-none flex-1 rounded-2.5xl bg-juicyblue-100 text-white"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
