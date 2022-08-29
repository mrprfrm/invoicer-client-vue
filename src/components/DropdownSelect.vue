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

const select = ref(null);
const selection = ref(null);
const selected = ref(null);
const isOpened = ref(false);
const isBlurable = ref(true);

const current = computed(() => selected.value || props.default || "---");

function blurSelect(evt) {
  if (isBlurable.value) {
    isOpened.value = false;
  } else {
    evt.preventDefault();
  }
}

function disableBlur() {
  isBlurable.value = false;
}

function enableBlur() {
  isBlurable.value = true;
  select.value.focus();
}

function toggleOptions() {
  isOpened.value = !isOpened.value;
  selection.value = props.options.indexOf(selected.value || props.default);
}

function selectOption(option) {
  selected.value = option;
  isOpened.value = false;
}

function incrementSelection() {
  if (selection.value < props.options.length - 1) {
    selection.value++;
  }
}

function decrementSelection() {
  if (selection.value > 0) {
    selection.value--;
  }
}

function spaceHandler() {
  if (isOpened.value) {
    selectOption(props.options[selection.value]);
  } else {
    toggleOptions();
  }
}

function keypressHandler(evt) {
  switch (evt.keyCode) {
    case 8:
      return;
    case 9:
      return;
    case 74:
      evt.preventDefault();
      incrementSelection();
      return;
    case 75:
      evt.preventDefault();
      decrementSelection();
      return;
    default:
      evt.preventDefault();
  }
}
</script>

<template>
  <div class="relative flex flex-col space-y-1 text-base">
    <label v-if="label" :for="name">{{ label }}</label>
    <button
      @click="toggleOptions"
      @blur="blurSelect"
      @keydown.up="decrementSelection"
      @keydown.down="incrementSelection"
      @keydown.space.prevent="spaceHandler"
      @keydown.shift.exact="keypressHandler"
      @keydown.exact="keypressHandler"
      class="flex items-center justify-between space-x-3.5 py-3.5 px-4 bg-white text-brand-400 rounded-xl cursor-pointer outline-none"
      type="button"
      tabindex="0"
      ref="select"
    >
      <span>{{ current }}</span>
      <ChevronDown v-if="!isOpened"></ChevronDown>
      <ChevronUp v-if="isOpened"></ChevronUp>
    </button>
    <div
      v-if="isOpened"
      class="options z-10 absolute flex flex-col flex-auto self-end space-y-7.5 top-full mt-2 py-7.5 pl-7.5 pr-4 bg-white rounded-xl text-brand-400"
    >
      <button
        v-for="(option, idx) in options"
        @mouseup="enableBlur"
        @mousedown="disableBlur"
        @click="selectOption(option)"
        :key="idx"
        :tabindex="-1"
        class="flex justify-end items-center space-x-4"
        type="button"
      >
        <ChevronDown v-if="idx === selection"></ChevronDown>
        <span :class="{ 'pr-10': option != current }"> {{ option }} </span>
        <CheckIcon v-if="option === current"></CheckIcon>
      </button>
    </div>
  </div>
</template>
