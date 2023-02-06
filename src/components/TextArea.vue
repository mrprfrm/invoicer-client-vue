<script setup>
import { computed, defineProps, defineEmits } from "vue";

const props = defineProps([
  "name",
  "class",
  "placeholder",
  "allowNewLines",
  "modelValue",
  "required",
  "error",
]);

const emit = defineEmits(["update:modelValue", "update:error"]);

const text = computed({
  get() {
    return props.modelValue || "";
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

const content = computed(() =>
  (props.modelValue || props.placeholder || "").split("\n")
);

const newLinesAllowed = computed(() =>
  [null, undefined, true, "true"].includes(props.allowNewLines)
);

function onEnter(evt) {
  if (!newLinesAllowed.value) {
    evt.preventDefault();
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
  <div class="flex flex-col space-y-1.5 text-base w-full">
    <div class="relative flex flex-col">
      <div v-if="newLinesAllowed" class="flex flex-col">
        <span
          v-for="(itm, idx) in content"
          :key="idx"
          class="whitespace-pre-wrap break-words first:pt-5 last:pb-5 px-4.5 text-transparent"
        >
          {{ itm || placeholder || "NONE" }}
        </span>
      </div>

      <span
        v-if="!newLinesAllowed"
        class="whitespace-pre-wrap break-words py-5 px-4.5 text-transparent"
        >{{ text || placeholder || "NONE" }}</span
      >
      <textarea
        :name="name"
        :placeholder="placeholder"
        v-model="text"
        @input="onInput"
        @keydown.enter="onEnter"
        @blur="onBlur"
        :class="[
          'absolute inset-0 z-10 py-5 px-4.5 w-full h-full shadow-inner-violetgray rounded-2.5xl border-none placeholder:text-violetgray-100 focus:ring-1 focus:ring-juicyblue-100 resize-none',
          props.class,
        ]"
      />
    </div>
  </div>
</template>
