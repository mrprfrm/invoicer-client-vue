<script setup>
import { ref, watch, defineProps, defineEmits, reactive, computed } from "vue";
import CheckIcon from "../icons/CheckIcon.vue";

const props = defineProps(["modelValue", "options"]);
const emit = defineEmits(["update:modelValue"]);

const state = reactive({
  selection: 0,
  selected: null,
});

const elements = ref([]);

const selectedIndex = computed(() => {
  const idx = props.options.indexOf(props.modelValue);
  return idx === -1 ? 0 : idx;
});

function toggleSelection(val) {
  if (val === props.modelValue) {
    emit("update:modelValue", null);
    /* state.selected = null; */
  } else {
    emit("update:modelValue", val);
    /* state.selected = val; */
  }
}

function onKeyDown(evt, option) {
  if (evt.shiftKey) {
    evt.preventDefault();
    return;
  }

  if (evt.keyCode === 72) {
    emit("update:modelValue", null);
    /* state.selected = null; */
  } else if (evt.keyCode === 74) {
    incrementSelection();
  } else if (evt.keyCode === 75) {
    decrementSelection();
  } else if (evt.keyCode === 76) {
    emit("update:modelValue", option);
    /* state.selected = option; */
  }
}

function incrementSelection() {
  if (state.selection < props.options.length - 1) {
    state.selection++;
  }
}

function decrementSelection() {
  if (state.selection > 0) {
    state.selection--;
  }
}

watch(
  () => state.selection,
  (selection) => {
    elements.value[selection].focus();
  }
);
</script>

<template>
  <div class="flex flex-col space-y-3">
    <button
      v-for="(option, idx) in options"
      :key="option.toString()"
      :tabindex="idx == selectedIndex ? 0 : -1"
      :class="{
        'bg-brand-400 text-white bg-juicyblue-100 shadow-ml':
          option == props.modelValue,
        focused: idx === state.selection,
      }"
      @focus="state.selection = idx"
      @click="toggleSelection(option)"
      @keydown.left.prevent="$emit('update:modelValue', null)"
      @keydown.right.prevent="$emit('update:modelValue', option)"
      @keydown.down.prevent="incrementSelection"
      @keydown.up.prevent="decrementSelection"
      @keydown.space.prevent="toggleSelection(option)"
      @keydown.exact="(evt) => onKeyDown(evt, option)"
      type="button"
      class="flex justify-between py-5 px-4.5 rounded-2.5xl border border-none shadow-ml outline-none focus:ring-1 focus:ring-juicyblue-100"
      ref="elements"
    >
      <span>{{ option.name }}</span>
      <CheckIcon v-if="option == props.modelValue"></CheckIcon>
    </button>
  </div>
</template>
