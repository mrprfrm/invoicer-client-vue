<script setup>
import { ref, watch, defineProps, reactive, computed } from "vue";
import CheckIcon from "../icons/CheckIcon.vue";

const props = defineProps({
  options: Array,
});

const state = reactive({
  selection: 0,
  selected: null,
});

const elements = ref([]);

const selectedIndex = computed(() => {
  const options = props.options.map((itm) => itm.id.toString());
  const index = options.indexOf(state.selected?.toString());
  return index !== -1 ? index : 0;
});

function toggleSelection(val) {
  if (val === state.selected) {
    state.selected = null;
  } else {
    state.selected = val;
  }
}

function onKeyDown(evt) {
  if (evt.shiftKey) {
    evt.preventDefault();
    return;
  }

  if (evt.keyCode === 72) {
    state.selected = null;
  } else if (evt.keyCode === 74) {
    incrementSelection();
  } else if (evt.keyCode === 75) {
    decrementSelection();
  } else if (evt.keyCode === 76) {
    state.selected = evt.target.dataset.id;
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
      :key="option.id"
      :tabindex="idx == selectedIndex ? 0 : -1"
      :class="{
        'selected bg-brand-400 text-white bg-juicyblue-100 shadow-ml':
          option.id == state.selected,
      }"
      @focus="state.selection = idx"
      @click="toggleSelection(option.id)"
      @keydown.left.prevent="state.selected = null"
      @keydown.right.prevent="state.selected = option.id"
      @keydown.down.prevent="incrementSelection"
      @keydown.up.prevent="decrementSelection"
      @keydown.space.prevent="toggleSelection(option.id)"
      @keydown.exact="onKeyDown"
      :data-id="option.id"
      type="button"
      class="flex justify-between py-5 px-4.5 rounded-2.5xl border border-none shadow-ml outline-none focus:ring-1 focus:ring-juicyblue-100"
      ref="elements"
    >
      <span>{{ option.name }}</span>
      <CheckIcon v-if="option.id == state.selected"></CheckIcon>
    </button>
  </div>
</template>
