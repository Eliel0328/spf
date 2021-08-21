import "../css/board.css";


const Board = ({ row_col }) => {
    const { row, col } = row_col;

    const grid = [];
    for (let i = 0; i < row; i++) {
        const currentRow = [];
        for (let j = 0; j < col; j++) {
            currentRow.push([i, j]);
        }
        grid.push(currentRow);
    }

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