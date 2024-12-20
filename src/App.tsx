import {useState} from 'react'
import Player from './components/Player.tsx'
import GameBoard from "./components/GameBoard.tsx"
import "../public/bg-pattern-dark.png"
import "../public/game-logo.png"
import "../public/bg-pattern.png"
import './App.css'

function App() {
    const [activePlayer, setActivePlayer] = useState("X");

    function handleUpdate() {
        setActivePlayer((selectedActivePlayer: string) => selectedActivePlayer === "X" ? "O" : "X")

    }

    return (
        <main>
            <div id="game-container">
                <ol id="players" className="highlight-player">
                    <Player initialName="Player 1" symbol="X" isActive={activePlayer === "X"} />
                    <Player initialName="Player 2" symbol="O" isActive={activePlayer === "O"} />
                </ol>
                <GameBoard onSelectSquare={handleUpdate} activePlayerSymbol={activePlayer} />
            </div>
            LOG
        </main>
    );
}

export default App
