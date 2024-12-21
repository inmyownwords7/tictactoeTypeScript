

export default function GameBoard({onSelectSquare, board}: GameBoardProps) {

//TODO Use anonymous functions as much as possible for events
    return (
        <ol id="game-board">
            {board.map((row: [], rowIndex: number) => (
                <li key={rowIndex}>
                    <ol>
                        {row.map((playerSymbol, colIndex) => (
                            <li key={colIndex}>
                                <button onClick={() => onSelectSquare(rowIndex, colIndex)}
                                        disabled={playerSymbol !== null}
                                >
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
