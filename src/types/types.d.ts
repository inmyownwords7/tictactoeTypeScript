export {};
declare global {

    interface PlayerProps {
        initialName: string;
        symbol: string;
        isActive: boolean;
        onChangeName: (symbol: string, playerName: string) => void;
    }

    interface GameBoardProps {
        onSelectSquare: (rowIndex: number, colIndex: number) => void;
        board: Array<number, []>;
        turns?: Turn[];
    }

    interface Square {
        row: number;
        col: number;
    }

    interface Turn {
        square: Square;
        player: string;
    }

    type GameBoardState = (string | null)[][];

    interface GameOverProps {
        winner: string | null;
        onRestart: () => void;
    }

    interface PlayerSymbol {
        X: string;
        O: string;
        null?: null;
    }
}
