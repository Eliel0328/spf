import { useGlobalContext } from "../controller/context";
import Square from './squares'
import "../css/board.css";


const Board = () => {
    const { grid } = useGlobalContext();
    return (
        <div className="board">
            {grid.map((row, index) => {
                return (
                    <div className="board-row" key={index}>
                        {row.map((square, indexS) => {
                            return <Square key={indexS} square={square}></Square>
                        })}
                    </div>
                );
            })}
        </div>
    );
}

export default Board;