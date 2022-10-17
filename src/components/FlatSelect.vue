<script setup>
import { ref, watch, defineProps } from "vue";
import CheckIcon from "../icons/CheckIcon.vue";

const props = defineProps({
  options: Array,
});

const selection = ref(0);
const selected = ref(null);
const optionsElements = ref([]);

function toggleSelection(val) {
  if (val === selected.value) {
    selected.value = null;
  } else {
    selected.value = val;
  }
}

function keypressHandler(evt, optionId) {
  switch (evt.keyCode) {
    case 8:
      return;
    case 9:
      return;
    case 72:
      evt.preventDefault();
      selected.value = null;
      return;
    case 74:
      evt.preventDefault();
      incrementSelection();
      return;
    case 75:
      evt.preventDefault();
      decrementSelection();
      return;
    case 76:
      evt.preventDefault();
      selected.value = optionId;
      return;
    default:
      evt.preventDefault();
  }
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

watch(selection, (newSelection) => {
  optionsElements.value[newSelection].focus();
});
</script>

<template>
  <div class="flex flex-col space-y-3">
    <button
      v-for="(option, idx) in options"
      :key="option.id"
      :tabindex="idx == 0 ? 0 : -1"
      :class="{
        'selected bg-brand-400 text-white bg-juicyblue-100 shadow-ms':
          option.id === selected,
      }"
      @focus="selection = idx"
      @click="toggleSelection(option.id)"
      @keydown.left="selected = null"
      @keydown.right="selected = option.id"
      @keydown.down="incrementSelection"
      @keydown.up="decrementSelection"
      @keydown.space.prevent="toggleSelection(option.id)"
      @keydown.shift.exact="keypressHandler($event, option.id)"
      @keydown.exact="keypressHandler($event, option.id)"
      type="button"
      class="flex justify-between p-4 rounded-2.5xl border border-none shadow-ml outline-none focus:ring-1 focus:ring-juicyblue-100"
      ref="optionsElements"
    >
      <span>{{ option.name }}</span>
      <CheckIcon v-if="option.id === selected"></CheckIcon>
    </button>
  </div>
</template>
