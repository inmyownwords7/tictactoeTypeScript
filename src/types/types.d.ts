export {};
declare global {

    interface PlayerProps {
        initialName: string;
        symbol: string;
        isActive: boolean;
    }

    interface GameBoardProps {
        onSelectSquare: (rowIndex: number, colIndex: number) => void;
        board: Array<number, []>;
        turns?: Turn[];
    }

    interface Square {
        row:number;
        col:number;
    }

    interface Turn {
        square: Square;
        player: string;
    }

    type GameBoardState = (string | null)[][];
    type playerSymbolType = "X" | "O" | null


}
