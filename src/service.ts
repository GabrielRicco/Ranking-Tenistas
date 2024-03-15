interface playerProps {
  id: number
  name: string
  points: number
}

interface matchesProps {
  id: number,
  player1: playerProps,
  player2: playerProps,
  winner?: playerProps
}

const declareWinner = (matchIndex: number, winner: number, rounds: matchesProps[][], currentRoundIndex: number, players: playerProps[]) => {
  const round = rounds[currentRoundIndex];
  const match = round[matchIndex];
  const winningPlayer = winner === 1 ? match.player1 : match.player2;

  // Definindo o vencedor no objeto da partida
  match.winner = winningPlayer;

  // Atualizando os pontos dos jogadores no array geral de jogadores
  const playerIndex = players.findIndex((p: { name: string; }) => p.name === winningPlayer.name);
  if(playerIndex !== -1) {
    players[playerIndex].points += 20;
  }
}

export type { matchesProps, playerProps }
export { declareWinner }
