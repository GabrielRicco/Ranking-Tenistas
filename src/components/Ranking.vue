<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps(['players', 'torneioCompleto'])

const sortedPlayers = computed(() => [...props.players].sort((a, b) => b.points - a.points));
</script>

<template>
  <section>
    <h2>Lista de Participantes</h2>
    <ul>
      <li v-for="(player, index) in sortedPlayers" :key="player.id" :style="{ color: index === 0 && torneioCompleto ? 'yellow' : '' }">
        {{ player.name }} - Pontuação: {{ player.points }}
        <span v-if="index === 0 && torneioCompleto">--- (Campeão)</span>
      </li>
    </ul>
  </section>
</template>