<script setup>
import { ref, computed, defineProps } from "vue";

import ChevronDown from "../icons/ChevronDown.vue";
import CheckIcon from "../icons/CheckIcon.vue";
import ChevronUp from "../icons/ChevronUp.vue";

const props = defineProps([
  "name",
  "label",
  "options",
  "default",
  "selectClass",
]);

const selected = ref(null);
const isOpened = ref(false);

const current = computed(() => selected.value || props.default || "---");
</script>

<template>
  <div class="relative flex flex-col space-y-1 text-base">
    <label v-if="label" :for="name">{{ label }}</label>
    <button
      @click="isOpened = !isOpened"
      :class="selectClass"
      class="flex items-center justify-between space-x-3.5 py-3.5 px-4 bg-white text-brand-400 rounded-xl cursor-pointer outline-none"
      type="button"
    >
      <span>{{ current }}</span>
      <ChevronDown v-if="!isOpened"></ChevronDown>
      <ChevronUp v-if="isOpened"></ChevronUp>
    </button>
    <div
      v-if="isOpened"
      class="z-10 absolute flex flex-col flex-auto self-end space-y-7.5 top-full mt-2 py-7.5 pl-7.5 pr-4 bg-white rounded-xl text-brand-400"
    >
      <button
        v-for="(option, idx) in options"
        @click="selected = option"
        :key="idx"
        class="flex justify-end items-center space-x-4"
        type="button"
      >
        <span :class="{ 'pr-10': option != current }"> {{ option }} </span>
        <CheckIcon v-if="option === current"></CheckIcon>
      </button>
    </div>
  </div>
</template>
