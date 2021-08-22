import React, { useState, useContext, useReducer, useEffect } from 'react'
import reducer from './reducer'

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
    searchIsOpen: false,
    moveCount: 0
};


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

    const entryButtonIsOpen = () => {
        dispatch({ type: 'ENTRY_IS_OPEN' });
    }

    const exitButtonIsOpen = () => {
        dispatch({ type: 'EXIT_IS_OPEN' });
    }

    const wallButtonIsOpen = () => {
        dispatch({ type: 'WALL_IS_OPEN' });
    }

    const cleanButtonIsOpen = () => {
        dispatch({ type: 'CLEAN_IS_OPEN' });
    }

    const setEntry = (newEntry) => {
        dispatch({ type: 'SET_ENTRY', payload: newEntry });
    }

    const setExit = (newExit) => {
        dispatch({ type: 'SET_EXIT', payload: newExit });
    }

    const setWall = (newWall) => {
        dispatch({ type: 'SET_WALL', payload: newWall });
    }

    const cleanSquare = (newWall) => {
        dispatch({ type: 'CLEAN_SQUARE', payload: newWall });
    }

    const resetBoard = () => {
        dispatch({ type: 'GENERATE_GRIDS' });
    }

    const generateRandom = () => {
        resetBoard();

        const { row, col } = state;
        dispatch({ type: 'GENERATE_RANDOM' });

        let x = Math.round((row - 1) * Math.random());
        let y = Math.round((col - 1) * Math.random());
        dispatch({ type: 'SET_ENTRY', payload: { x: x, y: y } });

        let x1;
        let y1;

        do {
            x1 = Math.round((row - 1) * Math.random());
            y1 = Math.round((col - 1) * Math.random());
        } while (x === x1 && y === y1);

        dispatch({ type: 'SET_EXIT', payload: { x: x1, y: y1 } });

    }

    const setSearch = () => {
        dispatch({ type: 'SEARCH_PATH' });
    }

    return (
        <AppContext.Provider
            value={{
                ...state,
                resizeCol,
                resizeRow,
                entryButtonIsOpen,
                exitButtonIsOpen,
                wallButtonIsOpen,
                cleanButtonIsOpen,
                setEntry,
                setExit,
                setWall,
                cleanSquare,
                resetBoard,
                setSearch,
                generateRandom
            }}>{children}
        </AppContext.Provider>
    )

}

// make sure use
export const useGlobalContext = () => {
    return useContext(AppContext)
}

export { AppContext, AppProvider }