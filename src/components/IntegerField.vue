<script setup>
/*
 * Positive integer field
 */

import { ref, computed, defineProps, defineEmits } from "vue";

const innerValue = computed({
  get() {
    return props.modelValue?.toString() || "";
  },
  set(value) {
    emit("update:modelValue", value ? parseInt(value) : null);
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

// TODO: add handlers for up and down key press

function onKeydown(evt) {
  // Key codes for Tab, Backspace, Enter, Delete
  const allowedKeys = [8, 9, 13, 46];
  if (
    !allowedKeys.includes(evt.keyCode) && // If not allowed keys press
    (evt.keyCode < 37 || evt.keyCode > 40) && // If non arrow keys press
    (evt.keyCode < 48 || evt.keyCode > 57) // If non digits input
  ) {
    evt.preventDefault();
    return;
  }
}

function onUp() {
  emit("update:modelValue", (props.modelValue || 0) + 1);
}

function onDown() {
  if (props.modelValue > 0) {
    emit("update:modelValue", (props.modelValue || 0) - 1);
  } else {
    emit("update:modelValue", 0);
  }
}

function onInput() {
  // Reset error on user input
  if (props.error) {
    emit("update:error", null);
  }
}

function onBlur() {
  // Validate value when field losing focus
  // Currently validation provided only for required field
  if (props.required && !/^\d+$/.test(props.modelValue)) {
    emit("update:error", "Field is required");
  }
}
</script>

<template>
  <input
    ref="input"
    type="text"
    @keydown.exact="onKeydown"
    @keydown.up.prevent="onUp"
    @keydown.down.prevent="onDown"
    @input="onInput"
    @blur="onBlur"
    v-model="innerValue"
    :name="name"
    :placeholder="props.placeholder"
  />
</template>
