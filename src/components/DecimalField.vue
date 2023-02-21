<script setup>
/*
 * Positive decimal field
 */

import {
  ref,
  watch,
  computed,
  reactive,
  defineProps,
  defineEmits,
  nextTick,
} from "vue";

const state = reactive({
  cursorPosition: 0,
});

const innerValue = computed({
  get() {
    return formatDecimal(props.modelValue?.toString() || "");
  },
  set(value) {
    const newValue = formatDecimal(value || "");

    // If user input 0 or . then move cursor to the decimal section
    state.cursorPosition = !/^[0|.]{1}$/.test(value)
      ? input.value.selectionStart
      : 2;

    input.value.value = newValue;
    emit("update:modelValue", parseFloat(newValue));
  },
});

const input = ref(null);

const props = defineProps([
  "name",
  "modelValue",
  "placeholder",
  "required",
  "error",
]);
const emit = defineEmits(["update:modelValue", "update:error"]);

watch(
  () => state.cursorPosition,
  async (value) => {
    // If we will try to rid of this additional logic inside input method
    // and move it to the innerValue set method, it will not work
    // because we can move cursor position only after input was happen
    // otherwise default behaviour of the input element will set cursor position
    // as it should based on user actions ignoring component state

    await nextTick();
    input.value?.setSelectionRange(value, value);
  }
);

function formatDecimal(value) {
  // If value zero or period symbol
  if (/^[0|.]{1}$/.test(value)) {
    return "0.00";
  }

  const regex = /(?<integer>\d*)\.*(?<decimal>\d*)/;
  const match = value.match(regex);
  let integer = match?.groups?.integer || "";
  let decimal = match?.groups?.decimal || "";

  // If value is not integer or decimal format string
  if (!(integer || decimal)) {
    return "";
  }

  // Remove leading zeros from integer part
  integer = integer?.replace(/^[0]+/, "0");
  // Format decimal part with 2 decimal places
  decimal = `${decimal}00`.slice(0, 2);

  return integer ? `${integer}.${decimal}` : `0.${decimal}`;
}

function onKeydown(evt) {
  // Key codes for Tab, Backspace, Enter, Delete and period
  const allowedKeys = [8, 9, 13, 46, 190];
  if (
    !allowedKeys.includes(evt.keyCode) && // If not allowed keys press
    (evt.keyCode < 37 || evt.keyCode > 40) && // If non arrow keys press
    (evt.keyCode < 48 || evt.keyCode > 57) // If non digits input
  ) {
    evt.preventDefault();
    return;
  }
}

function onBackspace(evt) {
  const value = evt.target.value;
  const cursorPosition = evt.target.selectionStart;
  const periodPosition = evt.target.value.indexOf(".");

  // If user trying to delete a single diggit or zero,
  if (
    evt.metaKey ||
    /^0{1}\.0{2}$/.test(value) ||
    ((cursorPosition === 1 || cursorPosition === 2) &&
      /^\d{1}\.[0]*/.test(value))
  ) {
    state.cursorPosition = 0;
    emit("update:modelValue", null);
    evt.target.value = "";
  }

  // If user trying to delete period symbol,
  if (cursorPosition === periodPosition + 1) {
    state.cursorPosition = periodPosition - 0;
    evt.preventDefault();
    return;
  }
}

function onDelete(evt) {
  // Prevent duplication call for cmd+backspace
  if (evt.keyCode === 8) {
    return;
  }
  const value = evt.target.value;

  const cursorPosition = evt.target.selectionStart;
  const periodPosition = evt.target.value.indexOf(".");

  // If user trying to delete a single diggit,
  if (
    /^0{1}\.0{2}$/.test(value) ||
    (cursorPosition === 0 && /^\d{1}\.[0]*/.test(value))
  ) {
    emit("update:modelValue", null);
    evt.target.value = "";
  }

  // If user trying to delete a period symbol
  if (/^\d*\.[0]{2}/.test(value)) {
    if (cursorPosition === periodPosition) {
      state.cursorPosition = periodPosition + 1;
      evt.preventDefault();
      return;
    } else if (cursorPosition > periodPosition) {
      state.cursorPosition = cursorPosition + 1;
      evt.preventDefault();
      return;
    }
  }
}

async function onUp(evt) {
  evt.preventDefault();
  state.cursorPosition = null;

  // Wait untill state will be updated
  await nextTick();

  // Set curor position before period symbol
  const periodPosition = evt.target.value.indexOf(".");
  state.cursorPosition = periodPosition != -1 ? periodPosition : 1;
  emit("update:modelValue", (props.modelValue || 0) + 1);
}

async function onDown(evt) {
  evt.preventDefault();
  state.cursorPosition = null;

  // Wait untill state will be updated
  await nextTick();

  // Set curor position before period symbol
  const periodPosition = evt.target.value.indexOf(".");
  state.cursorPosition = periodPosition != -1 ? periodPosition : 1;

  // Set value as 0.00 if modelValue is null
  const delta = props.modelValue > 0 ? 1 : 0;
  emit("update:modelValue", (props.modelValue || 0) - delta);
}

function onInput() {
  // Reset error on user input
  if (props.error) {
    emit("update:error", null);
  }
}

function onBlur() {
  // Validate value when field losing focus
  // Currenty validation provided only for required field
  if (props.required && !/^[\d|.]+$/.test(props.modelValue)) {
    emit("update:error", "Field is required");
  }
}
</script>

<template>
  <input
    ref="input"
    type="text"
    @keydown.up.prevent="onUp"
    @keydown.down="onDown"
    @keydown.exact="onKeydown"
    @keydown.meta.backspace.exact="onBackspace"
    @keydown.backspace.exact="onBackspace"
    @keydown.delete.exact="onDelete"
    @input="onInput"
    @blur="onBlur"
    v-on:change="onChange"
    v-model="innerValue"
    :name="name"
    :placeholder="props.placeholder"
  />
</template>
