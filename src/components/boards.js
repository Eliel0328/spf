import { useGlobalContext } from "../controller/context";
import "../css/board.css";


const Board = () => {
    const {grid} = useGlobalContext();
    return (
        <div className="board">
            {
                grid.map((row, index) => {
                    return (
                        <div className="board-row" key={index}>
                            {row.map((square, indexS) => {
                                return <Square key={indexS}></Square>
                            })}
                        </div>
                    );
                })
            }
        </div>
    );
}

const Square = () => {
    return (
        <button className="square">
        </button>
    );
}

export default Board;