import {ReactElement,  SetStateAction, useState} from "react";
/// <reference path="../types/types.d.ts" />

export default function Player({initialName, isActive}: PlayerProps) {
    const [playerName, setPlayerName] = useState<string>(initialName);
    const [isEditing, setIsEditing] = useState<boolean>(false);

    function handleEdit() {
        setIsEditing((editing) => !editing);
    }

    function handleChange(event: { target: { value: SetStateAction<string>; }; }) {
        setPlayerName(event.target.value)
    }

    let editablePlayerName: ReactElement = <span className="player-name">{playerName}</span>

    if (isEditing) {
        editablePlayerName = (
            <input type="text" required value={playerName} onChange={handleChange} />
        );
    }

    return (
        <li className={isActive ? "active" : undefined}>
            <span className="player">
{editablePlayerName}
                <span className="player-symbol"></span>
            </span>
            <button onClick={handleEdit}>{isEditing ? "Save" : "Edit"}</button>
        </li>
    )
}