<script setup>
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
  "class",
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

function onInput() {
  emit("update:error", null);
}

function onBlur() {
  if (props.required && !props.modelValue) {
    emit("update:error", "Field is required");
  }
}
</script>

<template>
  <input
    ref="input"
    type="text"
    @keydown.exact="onKeydown"
    @input="onInput"
    @blur="onBlur"
    v-model="innerValue"
    :name="name"
    :class="props.class"
    :placeholder="props.placeholder"
  />
</template>
