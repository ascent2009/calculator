<script setup>
import { ref, onMounted } from 'vue'
import { buttons } from '../constants'

let equation = ref('')
let resultCalled = ref(false)
let lastResult = ref(0)

function buttonSwitch(val) {
  switch (val) {
    case this.buttons[0].title:
      clear()
      break
    case this.buttons[1].title:
      backspace()
      break
    case this.buttons[12].title:
      useNumber(val)
      break
    case this.buttons[13].title:
      useNumber(val)
      break
    case this.buttons[14].title:
      useNumber(val)
      break
    case this.buttons[8].title:
      useNumber(val)
      break
    case this.buttons[9].title:
      useNumber(val)
      break
    case this.buttons[10].title:
      useNumber(val)
      break
    case this.buttons[4].title:
      useNumber(val)
      break
    case this.buttons[5].title:
      useNumber(val)
      break
    case this.buttons[6].title:
      useNumber(val)
      break
    case this.buttons[17].title:
      useNumber(val)
      break
    case this.buttons[18].title:
      if (!equation.value) return
      useNumber(val)
      break
    case percentOperator:
      percent(val)
      break
    case minusOperator:
      minus()
      break
    case plusOperator:
      plus()
      break
    case minusPlusOperator:
      minusPlus()
      break
    case multiplyOperator:
      multiply()
      break
    case divideOperator:
      divide()
      break
    case '=':
      result()
      break
    default:
      break
  }
}

const useNumber = (num) => {
  equation.value = resultCalled.value
    ? num
    : equation.value.search(/^0/g)
      ? equation.value + num
      : equation.value.search(/^[-]$/g) !== -1
        ? equation.value + num
        : num

  resultCalled.value = false
}
const plusOperator = '+'
const plus = () => {
  if (!equation.value) return
  if (equation.value.includes('+')) return
  if (equation.value.includes('-')) equation.value.replace('-', '+')
  equation.value = checkOperator(equation.value, plusOperator)
}
const minusOperator = '-'
const minus = () => {
  if (equation.value.includes('-')) return
  if (equation.value.includes('+')) equation.value.replace('+', '-')
  equation.value = checkOperator(equation.value, minusOperator)
}
const percentOperator = '%'
const percent = () => {
  if (!equation.value) return
  if (equation.value.includes('%')) return
  equation.value = equation.value / 100
  // equation.value += String(equation.value)
  resultCalled.value = true
  equation.value = checkOperator(equation.value, percentOperator)

  // equation.value = String(equation.value / 100)
}
const minusPlusOperator = '+/-'
const minusPlus = () => {
  equation.value = -equation.value
  resultCalled.value = true
  equation.value = checkOperator(equation.value)
  // equation.value = tempVal
}
const multiplyOperator = '*'
const multiply = () => {
  if (!equation.value) return
  if (equation.value.includes('*')) return
  equation.value = checkOperator(equation.value, multiplyOperator)
}
const divideOperator = '/'
const divide = () => {
  if (!equation.value) return
  if (equation.value.includes('/')) return
  equation.value = checkOperator(equation.value, divideOperator)
  // equation.value = equation.value / equation.value
}

const checkOperator = (equation, requestedOperator = null) => {
  if (equation.search(/^0$/g) !== -1) {
    if (requestedOperator.search(/( [/*] )$/g) !== -1) return '0'
    else return requestedOperator.replace(/ /g, '')
  } else {
    if (resultCalled.value) {
      resultCalled.value = false
      return lastResult.value + requestedOperator
    } else {
      return equation.replace(/( [+\-/*%] )$/g, '') + requestedOperator
    }
  }
}
const result = () => {
  let finalEqn = equation.value.replace(/( [+\-/*] )$/g, '')
  resultCalled.value = finalEqn.search(/( [+\-/*] )/g) !== -1
  let eqResult = Function('"use strict";return (' + finalEqn.replace(/( \x+ )/g, ' * ') + ')')()
  equation.value = `${eqResult.toLocaleString()}`
  lastResult.value = eqResult
  // resultCalled.value = false
}
const clear = () => {
  equation.value = ''
  lastResult.value = '0'
}
const backspace = () => {
  equation.value = equation.value.substring(0, equation.value.length - 1)
}
const handleKeyDown = (e) => {
  if (e.key === 'Enter') {
    result()
    // equation.value = ''
  }
  if (e.key === 'Escape') {
    clear()
    equation.value = ''
  }
  let tempEqValue = e.key
  equation.value += tempEqValue
  console.log('e.key: ', e.key)
}
console.log('this.equation.value: ', equation.value)
onMounted(() => window.addEventListener('keydown', handleKeyDown))
</script>

<template>
  <section class="max-w-screen-sm overflow-x-hidden mx-auto px-10 sm:px-20">
    <div
      class="mt-10 sm:mt-20 rounded-xl text-slate-400 text-3xl sm:text-5xl text-right align-middle min-h-10 sm:min-h-20 break-all overflow-y-hidden"
    >
      {{ equation }}
    </div>
    <div
      class="min-h-20 sm:min-h-30 text-7xl sm:text-9xl font-medium text-right align-middle break-all overflow-y-hidden dark:text-slate-50"
    >
      {{ lastResult }}
    </div>
  </section>
  <section class="pt-10 sm:pt-20 mb-20 mx-auto rounded-xl w-fit grid grid-cols-4 gap-3">
    <li
      class="list-none bg-transparent hover:bg-slate-400 hover:rounded-full flex items-center justify-center dark:first:text-white dark:nth-last-child(2):slate-400"
      v-for="({ title, id, color, src, alt, show, dark }, index) in buttons"
      :key="id + index"
      @keydown="handleKeyDown()"
    >
      <button
        type="button"
        @click="buttonSwitch(title)"
        class="text-3xl sm:text-6xl size-16 sm:size-32 font-semibold flex items-center justify-center rounded-full"
        :class="[`text-${color}`, `bg-${dark}`, `hover:bg-slate-300`]"
      >
        <img v-show="show" :src="src" :alt="alt" />
        <p v-show="!show">{{ title }}</p>
      </button>
    </li>
  </section>
</template>
