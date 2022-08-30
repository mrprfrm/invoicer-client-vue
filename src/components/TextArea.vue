<script setup>
import { ref, computed, defineProps } from "vue";

const props = defineProps(["name", "placeholder", "label", "allowNewLines"]);

const content = ref(null);
const text = computed(() =>
  (content.value || props.placeholder || "").split("\n")
);

const isNewLinesAllowed = computed(() =>
  [null, undefined, true, "true"].includes(props.allowNewLines)
);

function enterHandler(evt) {
  if (!isNewLinesAllowed.value) {
    evt.preventDefault();
  }
}
</script>

<template>
  <div class="flex flex-col space-y-1 text-base">
    <label :for="name">{{ label }}</label>
    <div class="relative flex flex-col">
      <div v-if="isNewLinesAllowed" class="flex flex-col">
        <span
          v-for="(itm, idx) in text"
          :key="idx"
          class="whitespace-pre-line break-all first:pt-3.5 last:pb-3.5 px-4 text-transparent"
        >
          {{ itm || placeholder }}
        </span>
      </div>

      <span
        v-if="!isNewLinesAllowed"
        class="whitespace-pre-line break-all first:py-3.5 px-4 text-transparent"
        >{{ content || placeholder }}</span
      >
      <textarea
        :id="name"
        :name="name"
        :placeholder="placeholder"
        @input="content = $event.target.value"
        @keydown.enter="enterHandler"
        type="text"
        class="absolute inset-0 z-10 py-3.5 px-4 border-none resize-none rounded-xl focus:ring-brand-400 focus:border-brand-400 placeholder:text-brand-200 selection:text-brand-400 selection:bg-brand-100"
      />
    </div>
  </div>
</template>
