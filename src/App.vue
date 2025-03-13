<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import Typewriter from './Typewriter/index.vue'

const route = ref('')
const enterAction = ref({})

onMounted(() => {
  window.utools.onPluginEnter((action) => {
    route.value = action.code
    enterAction.value = action
  })
  window.utools.onPluginOut((isKill) => {
    route.value = ''
  })
})
</script>

<template>
  <template v-if="route === 'hello'">
    <Hello :enterAction="enterAction"></Hello>
  </template>
  <template v-if="route === 'read'">
    <Read :enterAction="enterAction"></Read>
  </template>
  <template v-if="route === 'write'">
    <Write :enterAction="enterAction"></Write>
  </template>
  <template v-if="route === 'typewriter'">
    <Typewriter :enterAction="enterAction"></Typewriter>
  </template>
</template>
