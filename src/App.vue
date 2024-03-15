<script setup lang="ts">
import { ref } from 'vue';
import Ranking from './components/Ranking.vue';
import Matches from './components/Matches.vue';
import { matchesProps, playerProps } from './service';

const players = ref<playerProps[]>([
  { id: 1, name: 'Roger Federer', points: 0 },
  { id: 2, name: 'Rafael Nadal', points: 0 },
  { id: 3, name: 'Novak Djokovic', points: 0 },
  { id: 4, name: 'Carlos Alcaraz', points: 0 },
  { id: 5, name: 'Jannik Sinner', points: 0 },
  { id: 6, name: 'Ben Shelton', points: 0 },
  { id: 7, name: 'Dominic Thiem', points: 0 },
  { id: 8, name: 'Guga Kuerten', points: 0 },
  // Adicione mais jogadores conforme necessário
]);

const rounds = ref<matchesProps[][]>([]);
const currentRoundIndex = ref<number>(-1);

const prepareMatches = () => {
  const shuffledPlayers = [...players.value].sort(() => Math.random() - 0.5);
  const numRounds = players.value.length - 1;
  const drawnRounds: matchesProps[][] = [];

  for (let roundIndex = 0; roundIndex < numRounds; roundIndex++) {
    const roundMatches: matchesProps[] = [];

    for (let matchIndex = 0; matchIndex < shuffledPlayers.length / 2; matchIndex++) {
      const player1 = Math.random() < 0.5 ? shuffledPlayers[matchIndex] : shuffledPlayers[shuffledPlayers.length - 1 - matchIndex];
      const player2 = player1 === shuffledPlayers[matchIndex] ? shuffledPlayers[shuffledPlayers.length - 1 - matchIndex] : shuffledPlayers[matchIndex];

      roundMatches.push({
        player1, 
        player2,
        id: matchIndex
      });
    }

    drawnRounds.push(roundMatches);

    // Rotate players for the next round
    shuffledPlayers.splice(1, 0, shuffledPlayers.pop()!);
  }

  rounds.value = drawnRounds;
  currentRoundIndex.value = 0;
}

const isRoundComplete = (roundIndex: number): boolean => {
  if (roundIndex < 0 || roundIndex >= rounds.value.length) {
    // Se o índice da rodada for inválido, retorne false ou trate de acordo
    return false;
  }

  const round = rounds.value[roundIndex];
  // Agora com a verificação acima, round deve existir.
  return round.every(match => match.winner !== undefined);
}

const nextRound = () => {
  if (currentRoundIndex.value < rounds.value.length - 1) {
    currentRoundIndex.value++;
  }
}

const isTournamentComplete = (): boolean => {
  return currentRoundIndex.value === rounds.value.length - 1 && isRoundComplete(currentRoundIndex.value);
}
</script>

<template>
  <header>
    <img class="logo" src="./assets/logo.png" alt="Logo do Ranking de Tenistas">
    <h1>Ranking do Clube de Tenistas</h1>
  </header>
  <div>
    <div :class="isTournamentComplete() ? '' : 'wrapper'">
      <Ranking class="component" :torneioCompleto="isTournamentComplete()" :players="players" />

      <Matches
        class="component" 
        :torneioCompleto="isTournamentComplete()" 
        :roundCompleto="isRoundComplete(currentRoundIndex)"
        :players="players" 
        :rounds="rounds"
        :currentRoundIndex="currentRoundIndex"
        @prepararPartidas="prepareMatches"
        @proximaRodada="nextRound"
      />
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding: 0;
  margin-top: 20px;
  min-height: 500px;
}

.logo {
  width: 10%;
  height: auto;
}

.component {
  background-color: #262626;
  padding: 20px;
  border-radius: 50px;
  flex-grow: 1;
  color: #ffffff;
}

main {
  padding: 20px;
}

header {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #1E1E1E;
  width: 100vw;
  height: 300px;
  text-align: center;
  color: #A5D6A7;
}

@media (max-width: 690px) {
  .wrapper {
    display: flex;
    gap: 2rem;
    flex-direction: column;
  }

  .logo {
    width: 40%;
  }

  header {
    border-radius: 0;
  }

  h1 {
    font-size: larger;
  }
}
</style>
