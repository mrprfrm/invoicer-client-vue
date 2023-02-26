<script setup>
import { defineProps } from "vue";

import AlertIcon from "@/icons/AlertIcon.vue";

const props = defineProps(["label", "error"]);
</script>

<template>
  <div class="flex flex-col space-y-1 text-base">
    <label class="text-white">{{ props.label }}</label>
    <div class="flex flex-col">
      <div
        :class="[
          props.error ? '!rounded-b-none' : '',
          'relative flex w-full bg-white rounded-2.5xl shadow-inner-violetgray',
        ]"
      >
        <slot />
      </div>

      <div
        v-if="props.error"
        class="flex items-center space-x-2.5 bg-juicyred-100 text-sm text-white rounded-b-2.5xl px-4.5 py-2.5"
      >
        <AlertIcon class="w-5" />
        <small>{{ props.error }}</small>
      </div>
    </div>
  </div>
</template>
