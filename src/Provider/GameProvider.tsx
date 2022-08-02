import React, { createContext, useEffect, useReducer, useState } from 'react'

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
    type: string
    icon: string
}

type PlayerConfigurations = {
    player1: PlayerConfig,
    player2: PlayerConfig,
}

type GameResults = {
    PLAYER1: number, 
    PLAYER2: number, 
    TIES: number
}

type GameState = {
    tiles: Tiles,
    activePlayer: string,
    players: PlayerConfigurations,
    moveHistory: Array<string>,
    gameIsFinished: boolean,
    gameResults: GameResults,
    updateGameState: ({ id, value }: { id: number, value: string }) => void,
    reset: () => void,
}

export const initialGameState: GameState = {
    tiles: initialTilesState,
    activePlayer: initPlayerConfiguration.player1.icon,
    players: initPlayerConfiguration,
    moveHistory: [],
    updateGameState: ({id, value}) => {},
    reset: () => {},
    gameIsFinished: false,
    gameResults: initialResultTracker
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

type Action = 
    | { type: 'MOVE', tiles: Tiles, activePlayer: string }
    | { type: 'FINISH', gameResults: GameResults, gameIsFinished: boolean  }
    | { type: 'RESET', tiles: Tiles, gameIsFinished: boolean }

const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
    const gameReducer = (state: GameState, action: Action): GameState => {
        switch(action.type){
            case 'MOVE': return {...state, tiles: action.tiles, activePlayer: action.activePlayer}
            case 'FINISH': return {...state, gameResults: action.gameResults, gameIsFinished: true }
            case 'RESET': return {...state, tiles: initialTilesState, gameIsFinished: false }
        }
    }
    
    const [state, dispatch] = useReducer(gameReducer, initialGameState)

    const [players, setPlayer] = useState(initialGameState.players)
    
    const reset = () => dispatch({ type: 'RESET' })

    const checkWinState = () => {
        for (const x of winningCompositions){
            let curr: Array<string | number | null> = []
            x.map(i => curr.push(state.tiles[i]))
            if (curr[0] != null && curr[0] === curr[1] && curr[1] === curr[2]){
                dispatch({ type: 'MOVE', tiles: {...state.tiles, [x[0]]: 'W', [x[1]]: 'I', [x[2]]: 'N'}, activePlayer: state.players.player1.icon })
                if (curr[0] === 'X'){ 
                    dispatch({ type: 'FINISH', gameResults: {...state.gameResults, PLAYER1: state.gameResults.PLAYER1 + 1 } })
                }
                else if (curr[0] === 'O'){ 
                    dispatch({ type: 'FINISH', gameResults: {...state.gameResults, PLAYER2: state.gameResults.PLAYER2 + 1 } })
                }
                return
            }
        }
        if ( Object.entries(state.tiles).filter((item) => item[1] === null).length === 0 && !state.gameIsFinished){
            console.log("It's a tie!")
            dispatch({ type: 'FINISH', gameResults: {...state.gameResults, TIES: state.gameResults.TIES + 1 } })
        }
    }

    const updateGameState = ({id}: {id: string | number | null}) => {
        if (state.tiles[id] !== null || state.gameIsFinished){
            return
        }
        else {
            dispatch({ type: 'MOVE', tiles: {...state.tiles, [id]: state.activePlayer}, activePlayer: state.activePlayer === 'X' ? 'O' : 'X' })
        }
    }
    
    useEffect(() => {
        checkWinState()
        console.log('state: ', state)
    },[state])
    
    return (
    <GameContext.Provider value={{...state, updateGameState, reset, players}}>
      <>{children}</>
    </GameContext.Provider>
  )
}

export default GameProvider