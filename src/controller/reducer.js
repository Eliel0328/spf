import board from './bfsAlgo'

const reducer = (state, action) => {
    if (action.type === 'RESIZE_X') {
        return {
            ...state,
            col: action.payload,
        }
    }
    if (action.type === 'RESIZE_Y') {
        return {
            ...state,
            row: action.payload
        }
    }
    if (action.type === 'GENERATE_GRIDS') {
        const { row, col } = state;
        const grid = [];
        const path = [];
        const visited = [];
        for (let i = 0; i < row; i++) {
            const currentRow = [];
            const currentRowPath = [];
            const currentRowVisited = [];
            for (let j = 0; j < col; j++) {
                currentRow.push([i, j, '']);
                currentRowPath.push('');
                currentRowVisited.push(false);
            }
            grid.push(currentRow);
            path.push(currentRowPath);
            visited.push(currentRowVisited);
        }

        return {
            ...state,
            grid: grid,
            path: path,
            visited: visited,
            entryIsOpen: false,
            exitIsOpen: false,
            wallIsOpen: false,
            cleanIsOpen: false,
            searchIsOpen: false,
            entry: null,
            exit: null,
        }
    }
    if (action.type === 'ENTRY_IS_OPEN') {
        let aux = state.entryIsOpen;
        return {
            ...state,
            entryIsOpen: !aux,
            exitIsOpen: false,
            wallIsOpen: false,
            cleanIsOpen: false,
        }
    }
    if (action.type === 'EXIT_IS_OPEN') {
        let aux = state.exitIsOpen;
        return {
            ...state,
            entryIsOpen: false,
            exitIsOpen: !aux,
            wallIsOpen: false,
            cleanIsOpen: false,
        }
    }
    if (action.type === 'WALL_IS_OPEN') {
        let aux = state.wallIsOpen;
        return {
            ...state,
            entryIsOpen: false,
            exitIsOpen: false,
            wallIsOpen: !aux,
            cleanIsOpen: false,
        }
    }
    if (action.type === 'CLEAN_IS_OPEN') {
        let aux = state.cleanIsOpen;
        return {
            ...state,
            entryIsOpen: false,
            exitIsOpen: false,
            wallIsOpen: false,
            cleanIsOpen: !aux,
        }
    }
    if (action.type === 'SET_ENTRY') {
        let aux = action.payload;
        state.grid[aux.x][aux.y][2] = 'S';

        if (state.entry !== null && !(state.entry.x === aux.x && state.entry.y === aux.y)) {
            let old = state.entry;
            state.grid[old.x][old.y][2] = '';
        }

        return {
            ...state,
            entry: aux,
        }
    }
    if (action.type === 'SET_EXIT') {
        let aux = action.payload;
        state.grid[aux.x][aux.y][2] = 'E';

        if (state.exit !== null && !(state.exit.x === aux.x && state.exit.y === aux.y)) {
            let old = state.exit;
            state.grid[old.x][old.y][2] = '';
        }

        return {
            ...state,
            exit: aux,
        }
    }
    if (action.type === 'SET_WALL') {
        let aux = action.payload;
        state.grid[aux.x][aux.y][2] = '#';

        return {
            ...state,
        }
    }
    if (action.type === 'CLEAN_SQUARE') {
        let aux = action.payload;
        state.grid[aux.x][aux.y][2] = '';
        return {
            ...state,
        }
    }
    if (action.type === 'GENERATE_RANDOM') {
        const { row, col } = state;
        for (let i = 0; i < row; i++) {
            for (let j = 0; j < col; j++) {
                let ran1 = Math.round(Math.random());
                let ran2 = Math.round(Math.random());
                if (ran1 === ran2 && ran1) {
                    state.grid[i][j][2] = '#';
                } else {
                    state.grid[i][j][2] = '';
                }
            }
        }
        return {
            ...state,
            searchIsOpen: false
        }
    }
    if (action.type === 'SEARCH_PATH') {
        let aux;
        let newWay = null;
        const { row, col, entry, exit, grid, visited, path } = state;

        if (entry && exit) {
            aux = board(row, col, entry, exit, grid, visited, path);
            if (aux !== -1) {
                newWay = aux.way;
                
                for(let i = 1; i < newWay.length - 1; ++i){
                    let element = newWay[i];
                    state.grid[element.x][element.y][2] = 'P';
                }
            }
        }

        return {
            ...state,
            searchIsOpen: true,
            moveCount: aux,
            path: newWay,
        }
    }    
    throw new Error('no matching action type')
}

export default reducer;