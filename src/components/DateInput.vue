<script setup>
import { ref, defineProps } from "vue";

const days = Array.from({ length: 31 }, (_, i) => `0${i + 1}`.slice(-2));

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

const currentYear = new Date().getFullYear();
const years = Array.from(
  { length: currentYear - 1990 },
  (_, i) => currentYear - i
);

const input = ref(null);

const props = defineProps({
  name: String,
  label: String,
});
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
      type="date"
      ref="input"
      class="text-sm py-3 px-4 border rounded-md focus:ring-brand focus:border-brand"
    />

    <div
      class="datepicker z-20 absolute top-full flex mt-3 bg-white border border-gray-500 rounded-md"
      @click="input.focus()"
    >
      <div class="datepicker__days">
        <small
          class="absolute -mt-2 text-xs px-0.5 ml-2.5 bg-white text-gray-500"
        >
          Day
        </small>
        <div class="pt-5 pb-2">
          <div class="max-h-32 overflow-scroll">
            <button
              v-for="(d, index) in days"
              @click="day = index + 1"
              :key="index"
              type="button"
              tabindex="-1"
              class="block px-4 py-2"
            >
              {{ d }}
            </button>
          </div>
        </div>
      </div>

      <div class="datepicker__months">
        <small
          class="absolute -mt-2 text-xs px-0.5 ml-2.5 bg-white text-gray-500"
        >
          Month
        </small>
        <div class="pt-5 pb-2">
          <div class="max-h-32 overflow-scroll">
            <button
              v-for="(month, index) in months"
              :data-value="index + 1"
              :key="index"
              type="button"
              tabindex="-1"
              class="block px-4 py-2"
            >
              {{ month }}
            </button>
          </div>
        </div>
      </div>

      <div class="datepicker__years">
        <small
          class="absolute -mt-2 text-xs px-0.5 ml-2.5 bg-white text-gray-500"
        >
          Year
        </small>

        <div class="pt-5 pb-2">
          <div class="max-h-32 overflow-scroll">
            <button
              v-for="(year, index) in years"
              :key="index"
              type="button"
              tabindex="-1"
              class="block px-4 py-2"
            >
              {{ year }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
