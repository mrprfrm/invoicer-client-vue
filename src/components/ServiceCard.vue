<script setup>
import { defineProps } from "vue";
import DotsIcon from "../icons/DotsIcon.vue";

defineProps(["service"]);
</script>

<template>
  <div
    class="flex flex-col py-6 px-4 space-y-3 bg-violetgray-gradient rounded-2.5xl text-white"
  >
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
</template>
