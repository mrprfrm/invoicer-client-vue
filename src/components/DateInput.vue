<script setup>
import { ref, defineProps, defineEmits, computed } from "vue";

const props = defineProps({
  name: String,
  label: String,
  modelValue: String,
  required: {
    type: Boolean,
    default: true,
  },
  yearsNumber: {
    type: Number,
    default: 30,
  },
});

const emit = defineEmits(["update:modelValue"]);

const currentYear = new Date().getFullYear();

// const days = Array.from({ length: 31 }, (_, i) => `0${i + 1}`.slice(-2));

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Reactive data

const input = ref(null);
const isBlurable = ref(true);
const isFocused = ref(false);

const day = computed({
  get() {
    return props.modelValue ? props.modelValue.getDay() : null;
  },
  set() {
    emit("update:modelValue", "1111-11-11");
  },
});

const month = computed({
  get() {
    return props.modelValue ? props.modelValue.getMonth() : null;
  },
});

const year = computed({
  get() {
    return props.modelValue ? props.modelValue.getFullYear() : null;
  },
});

function blurInput() {
  if (!isBlurable.value) {
    return;
  }
  // TODO If required validate input has not empty
  emit("update:modelValue", input.value.value);
  isFocused.value = false;
}

function disableInputBlur() {
  isBlurable.value = false;
}

function enableInputBlur() {
  isBlurable.value = true;
  input.value.focus();
}
</script>

<template>
  <div class="relative flex flex-col">
    <label
      :for="name"
      class="z-10 absolute -mt-2 text-xs px-0.5 ml-2.5 bg-white text-gray-500"
    >
      {{ label }}
    </label>
    <input
      :id="name"
      :name="name"
      :value="modelValue"
      :required="required"
      @focus="isFocused = true"
      @blur="blurInput"
      type="date"
      ref="input"
      class="text-sm py-3 px-4 border rounded-md focus:ring-brand focus:border-brand"
    />

    <div
      v-show="isFocused"
      @mousedown="disableInputBlur"
      @mouseup="enableInputBlur"
      class="z-20 absolute top-full flex mt-3 bg-white border border-gray-500 rounded-md"
    >
      <div class="datepicker-days">
        <small
          class="absolute -mt-2 text-xs px-0.5 ml-2.5 bg-white text-gray-500"
        >
          Day
        </small>
        <div class="pt-5 pb-2">
          <div class="max-h-32 overflow-scroll">
            <button
              v-for="i in 31"
              :key="name + '-day-' + i"
              @mousedown="disableInputBlur"
              @mouseup="enableInputBlur"
              @click="day = i"
              type="button"
              tabindex="-1"
              class="block px-4 py-2"
            >
              {{ `0${i}`.slice(-2) }}
            </button>
          </div>
        </div>
      </div>

      <div class="datepicker-months">
        <small
          class="absolute -mt-2 text-xs px-0.5 ml-2.5 bg-white text-gray-500"
        >
          Month
        </small>
        <div class="pt-5 pb-2">
          <div class="max-h-32 overflow-scroll">
            <button
              v-for="(monthText, index) in months"
              :key="name + '-month-' + index"
              @click="month = index + 1"
              type="button"
              tabindex="-1"
              class="block px-4 py-2"
            >
              {{ monthText }}
            </button>
          </div>
        </div>
      </div>

      <div class="datepicker-years">
        <small
          class="absolute -mt-2 text-xs px-0.5 ml-2.5 bg-white text-gray-500"
        >
          Year
        </small>

        <div class="pt-5 pb-2">
          <div class="max-h-32 overflow-scroll">
            <button
              v-for="i in yearsNumber"
              :key="name + '-year-' + i"
              @click="year = currentYear - i + 1"
              type="button"
              tabindex="-1"
              class="block px-4 py-2"
            >
              {{ currentYear - i + 1 }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
