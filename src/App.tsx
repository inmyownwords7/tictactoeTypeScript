import {ReactElement, useState} from 'react';
import Player from "./components/Player.tsx";
import GameBoard from "./components/GameBoard.tsx";
import Log from "./components/Log.tsx";
import './App.css';
import WINNING_COMBINATIONS from "./winning-combinations.ts";
import GameOver from "./components/GameOver.tsx";

const PLAYERS: PlayerSymbol = {
    X: "Player 1",
    O: "Player 2",
};

const INITIAL_GAME_BOARD: GameBoardState = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];

function derivedActivePlayer(gameTurns: Turn[]) {
    let currentPlayer: string = "X";
    if (gameTurns.length > 0 && gameTurns[0].player === "X") {
        currentPlayer = "O";
    }
    return currentPlayer;
}

function deriveGameBoard(gameTurns: Turn[]) {
    const gameBoard: GameBoardState = [...INITIAL_GAME_BOARD.map((array) => [...array])];
    for (const turn of gameTurns) {
        const {square, player} = turn;
        const {row, col} = square;

        gameBoard[row][col] = player;
    }
    return gameBoard;
}

function deriveWinner(gameBoard: GameBoardState, players: { X: string, O: string }): string | null {
    let winner: string | null = null;

    for (const combination of WINNING_COMBINATIONS) {
        const firstSquareSymbol = gameBoard[combination[0].row][combination[0].col];
        const secondSquareSymbol = gameBoard[combination[1].row][combination[1].col];
        const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].col];

        if (firstSquareSymbol &&
            (firstSquareSymbol === "X" || firstSquareSymbol === "O") &&
            firstSquareSymbol === secondSquareSymbol &&
            firstSquareSymbol === thirdSquareSymbol) {
            winner = players[firstSquareSymbol];
        }
    }
    return winner;
}

function App(): ReactElement {
    /* instead of using useState({"x": Players1, "O": "Players:2"})
    * I can set PLAYERS as a constant. This allows to make the player names dynamic
    */
    const [players, setPlayers] = useState(PLAYERS);

    const [gameTurns, setGameTurns] = useState<Turn[]>([]);

    const activePlayer = derivedActivePlayer(gameTurns);

    const gameBoard = deriveGameBoard(gameTurns);
    const winner = deriveWinner(gameBoard, players);

    const hasDraw: number | boolean = gameTurns.length === 9 && !winner;

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

    function handleRestart() {
        setGameTurns([]);
    }

    function handlePlayerNameChange(symbol: string, newName: string) {
        setPlayers(prevPlayers => {
            return {
                ...prevPlayers,
                [symbol]: newName,
            };
        });
    }

    return (
        <main>
            <div id="game-container">
                <ol id="players" className="highlight-player">
                    <Player
                        initialName={PLAYERS.X}
                        symbol="X"
                        isActive={activePlayer === "X"}
                        onChangeName={handlePlayerNameChange}
                    />
                    <Player initialName={PLAYERS.O}
                            symbol="O"
                            isActive={activePlayer === "O"}
                            onChangeName={handlePlayerNameChange}
                    />
                </ol>
                {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart}/>}
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
