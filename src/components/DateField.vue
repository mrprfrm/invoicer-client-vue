<script setup>
import { reactive, ref, watch } from "vue";

import DatePicker from "@/components/DatePicker.vue";
import DateInput from "@/components/DateInput.vue";

const field = ref(null);
const value = ref({ day: 5, month: 2, year: 2020 });
const state = reactive({
  lastNonEmptyValue: null,
  currentSection: false,
  blurable: true,
  opened: false,
});

watch(
  () => state.currentSection,
  (value) => {
    if (value) {
      state.lastNonEmptySection = value;
    }
  }
);

function onBlur() {
  if (!state.blurable) {
    field.value.querySelector(".dateinput").focus();
    state.currentSection = state.lastNonEmptySection;
  } else {
    state.opened = false;
  }
}
</script>

<template>
  <div class="relative" ref="field">
    <DateInput
      @blur="onBlur"
      @focus="state.opened = true"
      @keydown.esc="state.opened = !state.opened"
      @click="state.opened = !state.opened"
      v-model="value"
    />
    <DatePicker
      @mousedown="state.blurable = false"
      @mouseup="state.blurable = true"
      v-show="state.opened"
      v-model="value"
      class="z-20 absolute top-full mt-1"
    />
  </div>
</template>
