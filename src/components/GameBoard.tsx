import { useState } from "react";

const initialGameBoard: Array<Array<string | null>> = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];

export default function GameBoard({ onSelectSquare, activePlayerSymbol}) {
    const [gameBoard, setGameBoard] = useState(initialGameBoard);

    // Select the squares with indexes
    function handleGameBoardChange(rowIndex: number, columnIndex: number) {
        setGameBoard((prevState) => {
            const updatedGameBoard = prevState.map((innerArray) => [...innerArray]); // Create a deep copy
            updatedGameBoard[rowIndex][columnIndex] = activePlayerSymbol; // Update the specific cell
            return updatedGameBoard;
        });
        onSelectSquare();
    }

    return (
        <ol id="game-board">
            {gameBoard.map((row, rowIndex) => (
                <li key={rowIndex}>
                    <ol>
                        {row.map((playerSymbol, colIndex) => (
                            <li key={colIndex}>
                                <button onClick={() => handleGameBoardChange(rowIndex, colIndex)}>
                                    {playerSymbol}
                                </button>
                            </li>
                        ))}
                    </ol>
                </li>
            ))}
        </ol>
    );
}
