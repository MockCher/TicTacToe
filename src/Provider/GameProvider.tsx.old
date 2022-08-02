import React, { createContext, useEffect, useState } from 'react'

const initPlayerConfiguration = {
    player1: {
        name: 'Player 1',
        color: 'yellow',
        type: 'CPU',
        icon: 'X'
    },
    player2: {
        name: 'Player 2',
        color: 'lightblue',
        type: 'CPU',
        icon: 'O'
    },
}

const initialTilesState =  {
    '1': null,
    '2': null,
    '3': null,
    '4': null,
    '5': null,
    '6': null,
    '7': null,
    '8': null,
    '9': null,
}

const gameStates = {
    new: 'NEW',
    finished: 'FINISHED'
}

const initialResultTracker = { PLAYER1: 0, PLAYER2: 0, TIES: 0 }

// const initialGameState = {
//     playerConfiguration: initPlayerConfiguration,
//     tiles: initialTilesState,
//     moveHistory: [],
//     gameState: gameStates.new,
//     results: initialResultTracker,

//     updateGameState: ({id}) => {},
//     reset: () => {},
//     endGame: () => {},
// }

type Tiles = {
    1: string | null,
    2: string | null,
    3: string | null,
    4: string | null,
    5: string | null,
    6: string | null,
    7: string | null,
    8: string | null,
    9: string | null,
}

type PlayerConfig = {
    name: string
    color: string
    type: 'CPU' | 'Player'
    icon: string
}

type GameState = {
    tiles: Tiles,
    activePlayer: string,
    players: Array<PlayerConfig>,
    moveHistory: Array<string>,
    gameIsFinished: boolean,
    resultTracker: { PLAYER1: number, PLAYER2: number, TIES: number }
}
export const initialGameState = {
    tiles: initialTilesState,
    activePlayer: initPlayerConfiguration.player1.icon,
    players: initPlayerConfiguration,
    moveHistory: [],
    updateGameState: ({id, value}: { id: number, value: string }) => {},
    reset: () => {},
    endGame: () => {},
    gameIsFinished: false,
    resultTracker: initialResultTracker
}

const winningCompositions = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['1', '4', '7'],
    ['2', '5', '8'],
    ['3', '6', '9'],
    ['1', '5', '9'],
    ['7', '5', '3'],
]

export const GameContext = createContext(initialGameState)

type GameProviderProps = {
    children: React.ReactChild | React.ReactChildren
}

const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
    
    const [gameState, setGameState] = useState(initialGameState.tiles)
    const [activePlayer, setActivePlayer] = useState(initialGameState.activePlayer)
    const [gameIsFinished, setGameIsFinished] = useState(initialGameState.gameIsFinished)
    const [gameResults, setGameResults] = useState(initialGameState.resultTracker)
    const [players, setPlayer] = useState(initialGameState.players)
    
    const reset = () => {
        setGameState(initialGameState.tiles)
        setActivePlayer(initialGameState.activePlayer)
        setGameIsFinished(false)
    }

    const checkWinState = () => {
        for (const x of winningCompositions){
            let curr: Array<string | number | null> = []
            x.map(i => curr.push(gameState[i]))
            if (curr[0] != null && curr[0] === curr[1] && curr[1] === curr[2]){
                setGameState(prev => ({...prev, [x[0]]: 'W', [x[1]]: 'I', [x[2]]: 'N'}))

                if (curr[0] === 'X'){ setGameResults(prev => ({...prev, PLAYER1: prev.PLAYER1 + 1})) }
                else if (curr[0] === 'O'){ 
                    setGameResults(prev => ({...prev, PLAYER2: prev.PLAYER2 + 1})) 
                }
                
                endGame()
            }
        }
        if ( Object.entries(gameState).filter((item) => item[1] === null).length === 0 && !gameIsFinished){
            console.log("It's a tie!")
            setGameResults(prev => ({...prev, TIES: prev.TIES + 1}))
            endGame()
        }
    }

    const endGame = () => {
        setGameIsFinished(true)
    }

    const updateGameState = ({id}: {id: string | number | null}) => {
        if (gameState[id] !== null || gameIsFinished){
            return
        }
        else {
            setGameState(prev => ({...prev, [id]: activePlayer}))
            setActivePlayer(prev => prev === 'X' ? 'O' : 'X')
        }
    }
    
    useEffect(() => {
        checkWinState()
    },[gameState])
    

    return (
    <GameContext.Provider value={{tiles: gameState, activePlayer, gameIsFinished, updateGameState, reset, resultTracker: gameResults, players}}>
      <>{children}</>
    </GameContext.Provider>
  )
}

export default GameProvider