<script setup>
import { reactive, computed, defineProps, defineEmits, watch } from "vue";

import { isNull } from "../utils.js";

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

/* Date object configuration */
const dateValues = {
  day: { max: 31, min: 1, initial: { min: 1, max: 31 } },
  month: { max: 12, min: 1, initial: { min: 1, max: 12 } },
  year: {
    max: 9999,
    min: 1,
    initial: { min: new Date().getFullYear(), max: new Date().getFullYear() },
  },
};

const state = reactive({
  currentSection: null,
  inputValue: "",
  reveseFocus: false,
  date: null,
});

const props = defineProps(["modelValue", "currentSection"]);
const emit = defineEmits(["update:modelValue", "update:currentSection"]);

const day = computed({
  get() {
    return props.modelValue?.day;
  },
});

const month = computed(() => {
  return props.modelValue?.month;
});

const year = computed(() => {
  return props.modelValue?.year;
});

const currentSection = computed({
  get() {
    return props.currentSection || state.currentSection;
  },
  set(value) {
    state.inputValue = "";
    state.currentSection = value;
    emit("update:currentSection", value);
  },
});

watch(
  () => state.inputValue,
  (value) => {
    if (isNull(value)) {
      return;
    }

    const data = { ...props.modelValue };
    const sectionKey = Object.keys(dateValues)[currentSection.value];
    const sectionValues = dateValues[sectionKey];
    const maxInputLen = sectionValues.max.toString().length;
    const isYearSection = currentSection.value === 2;

    if (isYearSection && value >= sectionValues.max) {
      /* If year section selected and value bigger than 9999 */
      data.year = parseInt(value.slice(-4));
    } else if (isYearSection && !+value) {
      /* If year section selected and value contains only zeros */
      data.year = parseInt(value.slice(-4));
    } else if (value >= sectionValues.max) {
      /* If value bigger than section max value */
      data[sectionKey] = sectionValues.max;
    } else if (value.length > 1 && !+value) {
      /* If value contains only zeros */
      data[sectionKey] = sectionValues.min;
    } else {
      data[sectionKey] = parseInt(value);
    }

    emit("update:modelValue", data);

    if (isYearSection) {
      /* Do not increment section index if year section selected */
      return;
    }

    if (value >= sectionValues.max) {
      /* If value bigger than section max value  */
      currentSection.value += 1;
    } else if (value.length > 1 && !+value) {
      /* If value contains only zeros */
      currentSection.value += 1;
    } else if (
      (state.inputValue + "0").slice(0, maxInputLen) > sectionValues.max
    ) {
      /* If potential value bigger than section max value */
      currentSection.value += 1;
    } else if (state.inputValue.length >= maxInputLen) {
      currentSection.value += 1;
    }
  }
);

window.addEventListener("keydown", (evt) => {
  if (currentSection.value === null) {
    state.reveseFocus = evt.shiftKey;
  }
});

function onFocus() {
  if (!currentSection.value) {
    currentSection.value = state.reveseFocus ? 2 : 0;
  }
}

function onBlur() {
  currentSection.value = null;
  if (!isNull(props.modelValue?.year) && !+props.modelValue.year) {
    const data = { ...props.modelValue, year: 1 };
    emit("update:modelValue", data);
  }
}

function onClick(evt, idx) {
  evt.stopPropagation();
  currentSection.value = idx;
  state.reveseFocus = false;
}

function cleanValue() {
  const data = { ...props.modelValue };
  const sectionKey = Object.keys(dateValues)[currentSection.value];
  if (!isNull(data[sectionKey])) {
    data[sectionKey] = null;
    emit("update:modelValue", data);
    state.inputValue = "";
  }
}

function cleanAll() {
  const data = { ...props.modelValue };
  const sectionKey = Object.keys(dateValues)[currentSection.value];
  data[sectionKey] = null;
  emit("update:modelValue", null);
  state.inputValue = "";
}

function setCurrentDate() {
  const dt = new Date();
  const data = {
    day: dt.getDate(),
    month: dt.getMonth() + 1,
    year: dt.getFullYear(),
  };
  emit("update:modelValue", data);
  state.inputValue = "";
}

function incrementValue() {
  const data = { ...props.modelValue };
  const sectionKey = Object.keys(dateValues)[currentSection.value];
  if (!data[sectionKey]) {
    data[sectionKey] = dateValues[sectionKey].initial.min;
  } else if (data[sectionKey] >= dateValues[sectionKey].max) {
    data[sectionKey] = dateValues[sectionKey].min;
  } else {
    data[sectionKey] += 1;
  }
  emit("update:modelValue", data);
}

function decrementValue() {
  const data = { ...props.modelValue };
  const sectionKey = Object.keys(dateValues)[currentSection.value];
  if (!data[sectionKey]) {
    data[sectionKey] = dateValues[sectionKey].initial.max;
  } else if (data[sectionKey] <= dateValues[sectionKey].min) {
    data[sectionKey] = dateValues[sectionKey].max;
  } else {
    data[sectionKey] -= 1;
  }
  emit("update:modelValue", data);
}

function incrementSelection(evt) {
  if (currentSection.value < 2) {
    evt.preventDefault();
    currentSection.value += 1;
  }
}

function decrementSelection(evt) {
  if (currentSection.value > 0) {
    evt.preventDefault();
    currentSection.value -= 1;
  }
}

function onKeyDown(evt) {
  if (evt.shiftKey) {
    return;
  }

  if (evt.keyCode > 47 && evt.keyCode < 58) {
    state.inputValue += evt.key;
  } else if (evt.keyCode === 67) {
    cleanAll();
  } else if (evt.keyCode === 72) {
    decrementSelection(evt);
  } else if (evt.keyCode === 74) {
    decrementValue();
  } else if (evt.keyCode === 75) {
    incrementValue();
  } else if (evt.keyCode === 76) {
    incrementSelection(evt);
  } else if (evt.keyCode === 78) {
    setCurrentDate();
  }
}

function onPaste(evt) {
  let dtString = (evt.clipboardData || window.clipboardData).getData("text");
  if (!isNull(dtString)) {
    dtString = dtString.replace(/[\s/.,]{1,2}/g, " ");

    let match = /(?<month>\d{1,2})\s(?<day>\d{1,2})\s(?<year>\d{4})/.exec(
      dtString
    );

    if (!match) {
      match = /(?<year>\d{4})\s(?<month>\d{1,2})\s(?<day>\d{1,2})/.exec(
        dtString
      );
    }

    if (!match) {
      match = /(?<month>\w{3,9})\s(?<day>\d{1,2})\s(?<year>\d{4})/.exec(
        dtString
      );
    }

    if (!match) {
      return;
    }

    let { day, month, year } = match.groups;

    if (!/\d/.test(month)) {
      month = month.toLowerCase();
      const monthsNames = months.map((itm) =>
        itm.slice(0, month.length).toLowerCase()
      );
      if (!monthsNames.includes(month)) {
        return;
      }
      month = monthsNames.indexOf(month) + 1;
    }

    emit("update:modelValue", {
      day: parseInt(day),
      month: parseInt(month),
      year: parseInt(year),
    });
  }
}

function onCopy() {
  navigator.clipboard.writeText(`${month.value}.${day.value}.${year.value}`);
}
</script>

<template>
  <div
    @click="(evt) => onClick(evt, 0)"
    @focus="onFocus"
    @blur="onBlur"
    @keydown.up.prevent="incrementValue"
    @keydown.down.prevent="decrementValue"
    @keydown.right.prevent="incrementSelection"
    @keydown.left.prevent="decrementSelection"
    @keydown.tab.exact="incrementSelection"
    @keydown.shift.tab="decrementSelection"
    @keydown.backspace="cleanValue"
    @keydown.exact="onKeyDown"
    @paste="onPaste"
    @copy="onCopy"
    :class="{
      'text-brand-100': isNull(day) && isNull(month) && isNull(year),
    }"
    tabindex="0"
    class="dateinput relative flex py-5 px-4.5 shadow-inner-brand rounded-2.5xl cursor-default focus:ring-1 focus:ring-juicyblue-100 outline-none"
  >
    <div class="flex w-full h-full text-base">
      <span
        @click="(evt) => onClick(evt, 0)"
        @mousedown.stop
        :class="{ 'selected bg-brand-50': currentSection === 0 }"
        class="day"
        >{{ !isNull(day) ? `0${day}`.slice(-2) : "__" }}</span
      >
      <span>-</span>
      <span
        @mousedown.stop
        @click="(evt) => onClick(evt, 1)"
        :class="{ 'selected bg-brand-50': currentSection === 1 }"
        class="month"
        >{{ !isNull(month) ? `0${month}`.slice(-2) : "__" }}</span
      >
      <span>-</span>
      <span
        @click="(evt) => onClick(evt, 2)"
        @mousedown.stop
        :class="{ 'selected bg-brand-50': currentSection === 2 }"
        class="year"
        >{{ !isNull(year) ? `000${year}`.slice(-4) : "____" }}</span
      >
    </div>
  </div>
</template>
