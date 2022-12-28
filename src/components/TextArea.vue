<script setup>
import { ref, computed, defineProps } from "vue";

const props = defineProps(["name", "placeholder", "allowNewLines"]);

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
  <div class="flex flex-col space-y-1.5 text-base">
    <div class="relative flex flex-col">
      <div v-if="isNewLinesAllowed" class="flex flex-col">
        <span
          v-for="(itm, idx) in text"
          :key="idx"
          class="whitespace-pre-wrap break-words first:pt-5 last:pb-5 px-4.5 text-transparent"
        >
          {{ itm || placeholder || "NONE" }}
        </span>
      </div>

      <span
        v-if="!isNewLinesAllowed"
        class="whitespace-pre-wrap break-words first:py-5 px-4.5 text-transparent"
        >{{ content || placeholder || "NONE" }}</span
      >
      <textarea
        :id="name"
        :name="name"
        :placeholder="placeholder"
        @input="content = $event.target.value"
        @keydown.enter="enterHandler"
        type="text"
        class="absolute inset-0 z-10 py-5 px-4.5 shadow-inner-violetgray rounded-2.5xl border-none placeholder:text-violetgray-100 focus:ring-1 focus:ring-juicyblue-100"
      />
    </div>
  </div>
</template>
