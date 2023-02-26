<script setup>
import { ref, defineProps } from "vue";
import TextArea from "./TextArea.vue";

const opened = ref(false);

defineProps(["name", "placeholder"]);
</script>

<template>
  <div class="flex flex-col">
    <div v-if="opened" class="flex flex-col space-y-3">
      <TextArea :name="name" :placeholder="placeholder"></TextArea>
      <div class="flex space-x-2.5">
        <button
          class="flex flex-1 py-3.5 justify-center border rounded-2.5xl border-violetgray-100 text-violetgray-200"
          @click="opened = false"
        >
          Cancel
        </button>
        <button
          class="flex flex-1 py-3.5 justify-center bg-juicyblue-100 border-none rounded-2.5xl text-white"
        >
          Save
        </button>
      </div>
    </div>
    <span v-if="!opened" class="text-violetgray-100" @click="opened = true"
      >There is nothing yet here.</span
    >
  </div>
</template>
