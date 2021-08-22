import React, { useState, useContext, useReducer, useEffect } from 'react'

const AppContext = React.createContext();

const initialState = {
    row: 5,
    col: 5,
    entry: null,
    exit: null,
    grid: [],
    path: [],
    visited: [],
    entryIsOpen: false,
    exitIsOpen: false,
    wallIsOpen: false,
    cleanIsOpen: false,
};


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
        const {row, col} = state;
        const grid = [];
        const path = [];
        const visited = [];
        for (let i = 0; i < row; i++) {
            const currentRow = [];
            const currentRowPath = [];
            const currentRowVisited = [];
            for (let j = 0; j < col; j++) {
                currentRow.push('');
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
            visited: visited
        }
    }
}

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const resizeCol = (col) => {
        dispatch({ type: 'RESIZE_X', payload: col });
    }

    const resizeRow = (row) => {
        dispatch({ type: 'RESIZE_Y', payload: row });
    }

    useEffect(() => {
        dispatch({ type: 'GENERATE_GRIDS' });
    }, [state.col, state.row]);

    return (
        <AppContext.Provider
            value={{
                ...state,
                resizeCol,
                resizeRow
            }}>{children}
        </AppContext.Provider>
    )

}

// make sure use
export const useGlobalContext = () => {
    return useContext(AppContext)
}

export { AppContext, AppProvider }