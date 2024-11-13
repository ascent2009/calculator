<script setup>
import { buttons } from '@/constants'
import { useCalculator } from '@/hooks/useCalculator'

const { equation, lastResult, handleKeyDown, buttonSwitch } = useCalculator()
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
