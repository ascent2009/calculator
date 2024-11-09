<script setup>
import { useDark, useToggle } from '@vueuse/core'
const isDark = useDark()
const toggleDark = useToggle(isDark)
import Calculator from './components/Calculator.vue'
import Header from './components/Header.vue'
</script>

<template>
  <section class="mx-auto bg-slate-50 dark:bg-slate-800 py-10 dark:h-screen rounded-3xl">
    <Header title="Calculator" @toggleDark="toggleDark" :isDark="isDark" />
    <Calculator />
  </section>
</template>
