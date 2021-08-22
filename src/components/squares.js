import { useGlobalContext } from "../controller/context";
import "../css/squares.css";

const Square = ({ square }) => {
    const { entryIsOpen, setEntry,
        exitIsOpen, setExit,
        wallIsOpen, setWall,
        cleanIsOpen, cleanSquare
    } = useGlobalContext();
    
    const handleClick = (action) => {
        if (entryIsOpen) {
            setEntry({ x: action[0], y: action[1] })
        }
        if (exitIsOpen) {
            setExit({ x: action[0], y: action[1] })
        }
        if (wallIsOpen) {
            setWall({ x: action[0], y: action[1] })
        }
        if (cleanIsOpen) {
            cleanSquare({ x: action[0], y: action[1] })
        }
    }

    return (
        <button className={`square 
        ${square[2] === 'S' ? 'entry' :
                (square[2] === 'E' ? 'exit' :
                    (square[2] === '#' ? 'wall' : null))}`}
            onClick={() => handleClick(square)}>
        </button>
    );
}

export default Square;