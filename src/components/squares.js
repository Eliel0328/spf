import { useGlobalContext } from "../controller/context";
import "../css/squares.css";

const Square = ({ square }) => {
    const { entryIsOpen, setEntry,
        exitIsOpen, setExit,
        wallIsOpen, setWall,
        cleanIsOpen, cleanSquare,
        visited,
    } = useGlobalContext();

    const x = square[0];
    const y = square[1];
    const z = square[2];

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
        ${z === 'S' ? 'entry' :
                (z === 'E' ? 'exit' :
                    (z === '#' ? 'wall' :
                        (z === 'P' ? 'way' : (visited[x][y] === true ? 'visited' : null
                        ))

                    )
                )
            }`
        }
            onClick={() => handleClick(square)}>
        </button>
    );
}

export default Square;