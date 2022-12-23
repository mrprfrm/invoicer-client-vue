<script setup>
import { ref, defineProps, defineEmits, reactive } from "vue";
import CheckIcon from "../icons/CheckIcon.vue";

const props = defineProps(["modelValue", "options", "display"]);
const emit = defineEmits(["update:modelValue"]);

const state = reactive({
  selection: null,
});

const elements = ref([]);

window.addEventListener("keydown", (evt) => {
  if (state.selection === null) {
    state.reveseFocus = evt.shiftKey;
  }
});

function setSelected() {
  const value = props.options[state.selection];
  emit("update:modelValue", value);
}

function toggleSelected() {
  const value = props.options[state.selection];
  if (value === props.modelValue) {
    emit("update:modelValue", null);
  } else {
    const value = props.options[state.selection];
    emit("update:modelValue", value);
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

function onClick({ idx }) {
  state.selection = idx;
  toggleSelected();
}

function onKeyDown(evt) {
  if (evt.shiftKey) {
    evt.preventDefault();
    return;
  }

  if (evt.keyCode === 72) {
    emit("update:modelValue", null);
  } else if (evt.keyCode === 74) {
    incrementSelection();
  } else if (evt.keyCode === 75) {
    decrementSelection();
  } else if (evt.keyCode === 76) {
    const value = props.options[state.selection];
    emit("update:modelValue", value);
  }
}

function onFocus() {
  if (!state.selection) {
    state.selection = state.reveseFocus ? props.options.length - 1 : 0;
  }
}
</script>

<template>
  <div
    class="flex flex-col space-y-3 outline-none"
    :tabindex="0"
    @focus="onFocus"
    @blur="state.selection = null"
    @keydown.left.prevent="$emit('update:modelValue', null)"
    @keydown.right.prevent="setSelected"
    @keydown.down.prevent="incrementSelection"
    @keydown.up.prevent="decrementSelection"
    @keydown.space.prevent="toggleSelected"
    @keydown.exact="onKeyDown"
  >
    <button
      v-for="(option, idx) in options"
      :key="option.toString()"
      :tabindex="-1"
      :class="{
        'focused bg-violetgray-50': idx === state.selection,
        'selected text-white bg-juicyblue-100': option == props.modelValue,
        'focused selected text-white bg-juicyblue-200':
          idx === state.selection && option == props.modelValue,
      }"
      @click="() => onClick({ idx })"
      @mouseover="state.selection = idx"
      type="button"
      class="flex justify-between py-5 px-4.5 rounded-2.5xl border border-none shadow-ml outline-none focus:ring-1 focus:ring-juicyblue-100"
      ref="elements"
    >
      <span>{{ props.display ? option[props.display] : option }}</span>
      <CheckIcon v-if="option == props.modelValue"></CheckIcon>
    </button>
  </div>
</template>
