import {ReactElement,  useState} from "react";
// Lifting the state up????
export default function Player({initialName, symbol, isActive}) {
    const [playerName, setPlayerName] = useState(initialName);
    const [isEditing, setIsEditing] = useState(false);

    function handleEdit() {
        setIsEditing((editing) => !editing);
    }

    function handleChange(event) {
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