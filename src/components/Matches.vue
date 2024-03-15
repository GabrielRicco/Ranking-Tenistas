<script setup lang="ts">
import { declareWinner } from '../service';

const props = defineProps(['torneioCompleto', 'players', 'rounds', 'currentRoundIndex', 'roundCompleto'])

const emit = defineEmits(['prepararPartidas', 'proximaRodada'])

const emitirEvento = () => {
  emit('prepararPartidas')
}

const emitirEventoNextRound= () => {
  emit('proximaRodada')
}
</script>

<template>
  <section v-if="!torneioCompleto">
    <div v-if="rounds.length > 0">
      <button :disabled="!roundCompleto" @click="emitirEventoNextRound">
        <div v-if="roundCompleto">Próxima Rodada</div>
        <div v-else>Aguardando todos os vencedores...</div>
      </button>
      <h2>Rodada {{ currentRoundIndex + 1 }}</h2>
      <div v-for="(match, matchIndex) in rounds[currentRoundIndex]" :key="matchIndex">
        <p>
          <span :style="{ color: match.winner?.name === match.player1.name ? '#A5D6A7' : '' }">{{ match.player1.name }}</span>
            vs
          <span :style="{ color: match.winner?.name === match.player2.name ? '#A5D6A7' : '' }">{{ match.player2.name }}</span>
        </p>
        <button v-if="!match.winner" @click="declareWinner(matchIndex, 1, props.rounds, props.currentRoundIndex, props.players)">Vencedor: {{ match.player1.name }}</button>
        <button v-if="!match.winner" @click="declareWinner(matchIndex, 2, props.rounds, props.currentRoundIndex, props.players)">Vencedor: {{ match.player2.name }}</button>
      </div>
    </div>

    <div v-else class="empty">
      <p class="emptyText">Nenhuma rodada sorteada ainda. <span>Clique em "Sortear Rodadas"</span></p>
      <button @click="emitirEvento">Sortear Rodadas</button>
    </div>
  </section>
</template>

<style scoped>
.empty {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.emptyText {
  display: flex;
  flex-direction: column;
}
</style>