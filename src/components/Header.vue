<template>
  <header
    class="flex items-center justify-center sm:justify-around sm:space-x-5 space-x-10 mx-auto max-w-screen-sm"
  >
    <img class="size-8" src="../assets/logo.svg" alt="logo" @click="console.log('Click!')" />
    <h1
      class="bg-emerald-600 dark:bg-slate-50 text-white dark:text-emerald-600 px-7 py-2 text-xl text-center rounded-full w-fit justify-end"
    >
      {{ title }}
    </h1>
    <div>
      <div v-if="isDark">
        <img
          class="size-9 cursor-pointer"
          :src="LightModeSwitcher"
          alt="logo"
          @click="$emit('toggleDark')"
        />
      </div>
      <div v-else>
        <img
          class="size-11 cursor-pointer"
          :src="DarkModeSwitcher"
          alt="logo"
          @click="$emit('toggleDark')"
        />
      </div>
    </div>
  </header>
</template>

<script setup>
defineProps(['title', 'isDark'])
defineEmits(['toggleDark'])
import DarkModeSwitcher from '../assets/dark.svg'
import LightModeSwitcher from '../assets/light.svg'
</script>
