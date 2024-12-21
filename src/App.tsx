import {useState} from 'react'
import Player from './components/Player.tsx'
import GameBoard from "./components/GameBoard.tsx"
import Log from "./components/Log.tsx";
import "../public/bg-pattern-dark.png"
import "../public/game-logo.png"
import "../public/bg-pattern.png"
import './App.css'
import WINNING_COMBINATIONS from "./winning-combinations.ts";

const initialGameBoard: GameBoardState = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];

function derivedActivePlayer(gameTurns: Turn[]) {
    let currentPlayer: string | number = "X"
    if (gameTurns.length > 0 && gameTurns[0].player === "X") {
        currentPlayer = 0
    }
    return currentPlayer
}

function App(): Element {
    const [gameTurns, setGameTurns] =
        useState<Turn[]>([]);
// const [hasWinner, setWinner] = useState<boolean>(false);

    const activePlayer = derivedActivePlayer(gameTurns);
    const gameBoard = initialGameBoard;

    for (const turn of gameTurns) {
        const {square, player} = turn;
        const {row, col} = square;
        gameBoard[row][col] = player;
    }
    for (const combination of WINNING_COMBINATIONS) {
        const firstSquareSymbol = gameBoard[combination[0].row][combination[0].col];
        const secondSquareSymbol = gameBoard[combination[1].row][combination[1].col];
        const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].col];
    }

    function handleSelectSquare(rowIndex: number, colIndex: number) {
        setGameTurns((prevTurns) => {
            const currentPlayer = derivedActivePlayer(prevTurns)
            // const currentPlayer = prevTurns.length > 0 && prevTurns[0].player === 'X' ? 'O' : 'X';
            const updatedTurns: Turn[] = [
                {square: {row: rowIndex, col: colIndex}, player: currentPlayer},
                ...prevTurns,
            ];
            return updatedTurns;
        });
    }

    return (
        <main>
            <div id="game-container">
                <ol id="players" className="highlight-player">
                    <Player
                        initialName="Player 1"
                        symbol="X"
                        isActive={activePlayer === "X"}
                    />
                    <Player initialName="Player 2"
                            symbol="O"
                            isActive={activePlayer === "O"}
                    />
                </ol>
                <GameBoard
                    onSelectSquare={handleSelectSquare}
                    board={gameBoard}
                />
            </div>
            <Log turns={gameTurns}/>
        </main>
    );
}

export default App
