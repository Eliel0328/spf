import './css/App.css'
import Sliders from './components/sliders'
import Board from './components/boards'
import Prueba from './components/Prueba'
import { useState } from 'react';

function App() {
    const [row_col, setRow_Col] = useState({ row: 5, col: 5 });

    return (
        <div className="App">
            <div className="container-navbar">
                Shortest Path Finder
            </div>
            <div className="selectors">
                <Sliders row_col={row_col} setRow_Col={setRow_Col}></Sliders>
                {/* <Prueba></Prueba> */}
            </div>
            <div className="board">
                <Board row_col={row_col}></Board>
            </div>
        </div>
    );
}

export default App;
