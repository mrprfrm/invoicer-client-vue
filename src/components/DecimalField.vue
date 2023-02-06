<script setup>
import { ref, computed, reactive, defineProps, defineEmits } from "vue";

const state = reactive({
  cursorPosition: 0,
});

const innerValue = computed({
  get() {
    return formatDecimal(props.modelValue?.toString() || "");
  },
  set(value) {
    const newValue = formatDecimal(value || "");

    state.cursorPosition = !/^[0.]{1}$/.test(value)
      ? input.value.selectionStart
      : 2;

    input.value.value = newValue;
    emit("update:modelValue", parseFloat(newValue));
  },
});

const input = ref(null);

const props = defineProps([
  "modelValue",
  "class",
  "placeholder",
  "required",
  "error",
]);
const emit = defineEmits(["update:modelValue", "update:error"]);

function formatDecimal(value) {
  // If value zero or period symbol
  if (/^[0.]{1}$/.test(value)) {
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

// TODO: add handlers for up and down key press

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

  // If user trying to delete a single diggit,
  if (
    evt.metaKey ||
    ((cursorPosition === 1 || cursorPosition === 2) &&
      /^\d{1}\.[0]*/.test(value))
  ) {
    emit("update:modelValue", null);
    evt.target.value = "";
  }

  // If user trying to delete period symbol,
  if (cursorPosition === periodPosition + 1) {
    const position = periodPosition - 0;
    evt.target.setSelectionRange(position, position);
    evt.preventDefault();
    return;
  }
}

function onDelete(evt) {
  // Prevent duplication call for cmd+backspace
  if (evt.keyCode === 8) {
    return;
  }

  const cursorPosition = evt.target.selectionStart;
  const periodPosition = evt.target.value.indexOf(".");

  // If user trying to delete single diggit,
  if (cursorPosition === 0 && /^\d{1}\.[0]*/.test(evt.target.value)) {
    emit("update:modelValue", null);
    evt.target.value = "";
  }

  // If user trying to delete period symbol
  const value = evt.target.value;
  if (/^\d*\.[0]{2}/.test(value)) {
    if (cursorPosition === periodPosition) {
      const position = periodPosition + 1;
      evt.target.setSelectionRange(position, position);
      evt.preventDefault();
      return;
    } else if (cursorPosition > periodPosition) {
      const position = cursorPosition + 1;
      evt.target.setSelectionRange(position, position);
      evt.preventDefault();
      return;
    }
  }
}

function onInput(evt) {
  if (props.error) {
    emit("update:error", null);
  }
  evt.target.setSelectionRange(state.cursorPosition, state.cursorPosition);
}

function onBlur() {
  if (props.required && !props.modelValue) {
    emit("update:error", `Field is required`);
  }
}
</script>

<template>
  <input
    ref="input"
    type="text"
    @keydown.up="
      $emit('update:modelValue', props.modelValue ? props.modelValue + 1 : 1)
    "
    @keydown.down="
      $emit('update:modelValue', props.modelValue ? props.modelValue - 1 : 0)
    "
    @keydown.exact="onKeydown"
    @keydown.meta.backspace.exact="onBackspace"
    @keydown.backspace.exact="onBackspace"
    @keydown.delete.exact="onDelete"
    @input="onInput"
    @blur="onBlur"
    v-model="innerValue"
    :class="props.class"
    :placeholder="props.placeholder"
  />
</template>
