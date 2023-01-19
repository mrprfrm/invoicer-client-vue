<script setup>
import {
  ref,
  computed,
  defineProps,
  defineEmits,
  reactive,
  onMounted,
} from "vue";

import ChevronDown from "../icons/ChevronDown.vue";
import CheckIcon from "../icons/CheckIcon.vue";
import ChevronUp from "../icons/ChevronUp.vue";

const props = defineProps([
  "modelValue",
  "display",
  "placeholder",
  "options",
  "default",
]);

const emit = defineEmits(["update:modelValue"]);

const state = reactive({
  selection: 0,
  blurable: true,
  opened: false,
});

const select = ref(null);

const displayValue = computed(() => {
  if (props.modelValue) {
    return props.display ? props.modelValue[props.display] : props.modelValue;
  } else if (props.default) {
    return props.display ? props.default[props.display] : props.default;
  } else if (props.placeholder) {
    return props.placeholder;
  }
  return "---";
});

onMounted(() => {
  if (props.default && !props.modelValue) {
    emit("update:modelValue", props.default);
  }
});

function onBlur() {
  if (!state.blurable) {
    select.value.focus();
  } else {
    state.opened = false;
  }
}

function onOptionClick({ option }) {
  emit("update:modelValue", option);
  state.selection = props.options.indexOf(option);
  state.opened = false;
}

function incrementSelection() {
  if (state.selection < props.options.length - 1) {
    state.selection++;
  }
}

function decrementSelection() {
  if (state.selection > 0) {
    state.selection--;
  }
}

function onSpace() {
  if (state.opened) {
    const option = props.options[state.selection];
    state.opened = false;
    emit("update:modelValue", option);
  } else {
    state.opened = true;
  }
}

function onRight() {
  const option = props.options[state.selection];
  state.opened = false;
  emit("update:modelValue", option);
}

function onKeyDown(evt) {
  if (evt.keyCode === 74) {
    incrementSelection();
  } else if (evt.keyCode === 75) {
    decrementSelection();
  }
}
</script>

<template>
  <div
    @keydown.esc="state.opened = false"
    @keydown.right="onRight"
    @keydown.up.prevent="decrementSelection"
    @keydown.down.prevent="incrementSelection"
    @keydown.space.prevent="onSpace"
    @keydown.exact="onKeyDown"
    class="relative flex flex-col space-y-1 text-base bg-white rounded-2.5xl text-violetgray-400"
  >
    <!-- Hide dropdown on esc click -->
    <button
      @click="state.opened = !state.opened"
      @blur="onBlur"
      class="flex items-center justify-between space-x-4 py-5 px-4 cursor-pointer outline-none focus:ring-juicyblue-100 focus:ring-1"
      type="button"
      ref="select"
    >
      <span>{{ displayValue }}</span>
      <ChevronDown v-if="!state.opened"></ChevronDown>
      <ChevronUp v-if="state.opened"></ChevronUp>
    </button>

    <div
      v-if="state.opened"
      class="options z-20 absolute flex flex-col flex-auto self-end top-full mt-2 py-3.75 bg-white rounded-2.5xl shadow-ml"
    >
      <button
        v-for="(option, idx) in options"
        @mousedown="state.blurable = false"
        @mouseup="state.blurable = true"
        @click="() => onOptionClick({ option })"
        :key="idx"
        :tabindex="-1"
        :class="{
          'focused bg-violetgray-50': idx === state.selection,
        }"
        class="flex justify-end items-center space-x-4 py-3.75 pl-7.5 pr-4"
        type="button"
      >
        <span :class="{ 'pr-10': option != props.modelValue }">
          {{ props.display ? option[props.display] : option }}
        </span>
        <CheckIcon v-if="option === props.modelValue"></CheckIcon>
      </button>
    </div>
  </div>
</template>
