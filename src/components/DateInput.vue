<script setup>
import { ref, defineProps, defineEmits, computed, watch } from "vue";

// Constants

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

const SelectionRange = {
  DAY: 0,
  MONTH: 1,
  YEAR: 2,
};

// Hooks

const props = defineProps({
  name: String,
  label: String,
  modelValue: String,
  required: {
    type: Boolean,
    default: true,
  },
  lastYear: {
    type: Number,
    default: new Date().getFullYear(),
  },
  yearsNumber: {
    type: Number,
    default: 30,
  },
});

const emit = defineEmits(["update:modelValue"]);

// Reactive data

const input = ref(null);

const isBlurable = ref(true);
const isFocused = ref(false);
const isReverseFocus = ref(false);

// current selection range
const csr = ref(null);
const csrInterval = ref(null);

const day = ref(null);
const month = ref(null);
const year = ref(null);
const pressCount = ref(0);

const value = computed(() => {
  const d = day.value ? `0${day.value}`.slice(-2) : "__";
  const m = month.value ? `0${month.value}`.slice(-2) : "__";
  const y = year.value ? `000${year.value}`.slice(-4) : "____";
  return `${d}-${m}-${y}`;
});

// Global events listeners

window.addEventListener("keydown", (evt) => {
  if (!isFocused.value) {
    isReverseFocus.value = evt.shiftKey;
  }
});

window.addEventListener("click", () => {
  isReverseFocus.value = false;
});

// Watchers

watch(csr, (newCSR, oldCSR) => {
  if (newCSR !== oldCSR) {
    pressCount.value = 0;
  }
});

// Methods

function setYear(val) {
  csr.value = SelectionRange.YEAR;
  year.value = val;
}

function setMonth(val) {
  csr.value = SelectionRange.MONTH;
  month.value = val;
}

function setDay(val) {
  csr.value = SelectionRange.DAY;
  day.value = val;
}

function cleanValue() {
  if (csr.value === SelectionRange.DAY) {
    day.value = null;
  } else if (csr.value === SelectionRange.MONTH) {
    month.value = null;
  } else if (csr.value === SelectionRange.YEAR) {
    year.value = null;
  }
}

function setValue(evt) {
  if (evt.keyCode === 9) {
    return;
  }

  evt.preventDefault();

  if (evt.keyCode < 47 || evt.keyCode > 57) {
    return;
  }

  pressCount.value++;
  if (csr.value === SelectionRange.DAY) {
    if (pressCount.value === 1) {
      day.value = evt.key;
    } else {
      const newDay = day.value + evt.key;
      day.value = newDay < 31 ? newDay : 31;
      csr.value = SelectionRange.MONTH;
    }
  } else if (csr.value === SelectionRange.MONTH) {
    if (pressCount.value === 1) {
      month.value = evt.key;
    } else {
      const newMonth = month.value + evt.key;
      month.value = newMonth < 12 ? newMonth : 12;
      csr.value = SelectionRange.YEAR;
    }
  } else if (csr.value === SelectionRange.YEAR) {
    if (pressCount.value === 1) {
      year.value = evt.key;
    } else {
      year.value += evt.key;
    }
  }
}

function incrementValue() {
  if (csr.value === SelectionRange.DAY) {
    day.value = day.value < 31 ? day.value + 1 : 1;
  } else if (csr.value === SelectionRange.MONTH) {
    month.value = month.value < 12 ? month.value + 1 : 1;
  } else if (csr.value === SelectionRange.YEAR) {
    year.value++;
  }
}

function decrementValue() {
  if (csr.value === SelectionRange.DAY) {
    day.value = day.value > 1 ? day.value - 1 : 31;
  } else if (csr.value === SelectionRange.MONTH) {
    month.value = month.value > 1 ? month.value - 1 : 12;
  } else if (csr.value === SelectionRange.YEAR) {
    year.value = year.value > 1 ? year.value - 1 : props.lastYear;
  }
}

function refreshSelection() {
  // When user click on input, event with preventDefault(),
  // sometimes browser can allow user to set cursor to specific position.
  // With current implementation based on interval,
  // event if user will set cursor in specific position,
  // this user selection will be changed with current interval function.

  if (csr.value === SelectionRange.DAY) {
    input.value.setSelectionRange(0, 2);
  } else if (csr.value === SelectionRange.MONTH) {
    input.value.setSelectionRange(3, 5);
  } else if (csr.value === SelectionRange.YEAR) {
    input.value.setSelectionRange(6, 10);
  }
}

function incrementCSR() {
  if (csr.value < SelectionRange.YEAR) {
    csr.value++;
  }
}

function decrementCSR() {
  if (csr.value > SelectionRange.DAY) {
    csr.value--;
  }
}

function nextSelectionRange(evt) {
  if (csr.value < SelectionRange.YEAR) {
    evt.preventDefault();
  }
  csr.value++;
}

function prevSelectionRange(evt) {
  if (csr.value > SelectionRange.DAY) {
    evt.preventDefault();
  }
  csr.value--;
}

function selectDateSection(evt) {
  // Takes current cursor position on input
  // and sets appropriate selection range

  if (isFocused.value) {
    evt.preventDefault();
  }

  const inputStyle = window.getComputedStyle(input.value, null);
  const fontSize = parseFloat(inputStyle.getPropertyValue("font-size"));
  const paddingLeft = parseFloat(inputStyle.getPropertyValue("padding-left"));

  const charSize = fontSize * 0.6;
  const dayLimit = paddingLeft + charSize * 2;
  const monthLimit = dayLimit + charSize + charSize * 2;
  const yearLimit = monthLimit + charSize + charSize * 4;

  const posX = evt.clientX - input.value.getBoundingClientRect().left;

  if (posX > paddingLeft && evt.layerX < dayLimit) {
    csr.value = SelectionRange.DAY;
  } else if (posX > dayLimit && evt.layerX < monthLimit) {
    csr.value = SelectionRange.MONTH;
  } else if (posX > monthLimit && evt.layerX < yearLimit) {
    csr.value = SelectionRange.YEAR;
  }
}

function focusInput() {
  input.value.setSelectionRange(0, 0);

  isFocused.value = true;
  if (!csr.value) {
    csr.value = isReverseFocus.value ? SelectionRange.YEAR : SelectionRange.DAY;
  }

  if (isBlurable.value) {
    csrInterval.value = setInterval(refreshSelection, 50);
  }
}

function blurInput() {
  if (!isBlurable.value) {
    return;
  }
  // TODO If required validate input has not empty
  emit("update:modelValue", input.value.value);
  clearInterval(csrInterval);
  csrInterval.value = null;
  isFocused.value = false;
  csr.value = null;
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
      :value="value"
      :required="required"
      @keydown.tab.exact="nextSelectionRange"
      @keydown.shift.tab="prevSelectionRange"
      @keydown.right.prevent="incrementCSR"
      @keydown.left.prevent="decrementCSR"
      @keydown.up.prevent="incrementValue"
      @keydown.down.prevent="decrementValue"
      @keydown.backspace.prevent="cleanValue"
      @mousedown="selectDateSection"
      @keydown.exact="setValue"
      @focus="focusInput"
      @blur="blurInput"
      @paste.prevent
      type="text"
      ref="input"
      class="text-sm py-3 px-4 border rounded-md focus:ring-brand focus:border-brand cursor-default text-transparent text-shadow-black"
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
          <div class="max-h-32 overflow-scroll scroll-hidden">
            <button
              v-for="i in 31"
              :key="name + '-day-' + i"
              @mousedown="disableInputBlur"
              @mouseup="enableInputBlur"
              @click="setDay(i)"
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
          <div class="max-h-32 overflow-scroll scroll-hidden">
            <button
              v-for="(monthText, index) in months"
              :key="name + '-month-' + index"
              @click="setMonth(index + 1)"
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
          <div class="max-h-32 overflow-scroll scroll-hidden">
            <button
              v-for="i in yearsNumber"
              :key="name + '-year-' + i"
              @click="setYear(lastYear - i + 1)"
              type="button"
              tabindex="-1"
              class="block px-4 py-2"
            >
              {{ lastYear - i + 1 }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
