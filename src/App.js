import './css/App.css'
import Sliders from './components/sliders'
import Board from './components/boards'
import Buttons from './components/buttons'
// import Prueba from './components/Prueba'

import {useGlobalContext} from './controller/context'


function App() {
    // const {row, col} = useGlobalContext();

    return (
        <div className="App">
            <div className="container-navbar">
                Shortest Path Finder
            </div>
            <div className="selectors">
                <Sliders></Sliders>
                <Buttons></Buttons>
                {/* <Prueba></Prueba> */}
            </div>
            <div className="board">
                <Board></Board>
            </div>
        </div>
    );
}

export default App;
