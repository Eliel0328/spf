import React, { useContext, useReducer, useEffect } from 'react'
import reducer from './reducer'
import { useSnackbar } from 'notistack';
import Grow from '@material-ui/core/Grow';

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
    moveCount: null
};

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { enqueueSnackbar } = useSnackbar();

    const resizeCol = (col) => {
        dispatch({ type: 'RESIZE_X', payload: col });
    }

    const resizeRow = (row) => {
        dispatch({ type: 'RESIZE_Y', payload: row });
    }

    useEffect(() => {
        dispatch({ type: 'GENERATE_GRIDS' });
    }, [state.col, state.row]);

    useEffect(() => {
        if(state.moveCount == null){
            return; 
        }
        if (state.moveCount !== -1) {
            enqueueSnackbar(`Salida encontrada ${state.moveCount}`, {
                preventDuplicate: true,
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'left',
                },
                variant: "success",
                autoHideDuration: 3000,
                TransitionComponent: Grow,
            });
        } else {
            enqueueSnackbar(`Salida no encontrada`, {
                preventDuplicate: true,
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'left',
                },
                variant: "warning",
                autoHideDuration: 3000,
                TransitionComponent: Grow,
            });
        }
    }, [state.moveCount]);

    const entryButtonIsOpen = () => {
        dispatch({ type: 'ENTRY_IS_OPEN' });
        enqueueSnackbar(`Seleccionar entrada`, {
            preventDuplicate: true,
            anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'left',
            },
            autoHideDuration: 3000,
            TransitionComponent: Grow,
        });
    }

    const exitButtonIsOpen = () => {
        dispatch({ type: 'EXIT_IS_OPEN' });
        enqueueSnackbar(`Seleccionar salida`, {
            preventDuplicate: true,
            anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'left',
            },
            autoHideDuration: 3000,
            TransitionComponent: Grow,
        });
    }

    const wallButtonIsOpen = () => {
        dispatch({ type: 'WALL_IS_OPEN' });
        enqueueSnackbar(`Seleccionar muros`, {
            preventDuplicate: true,
            anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'left',
            },
            autoHideDuration: 3000,
            TransitionComponent: Grow,
        });
    }

    const cleanButtonIsOpen = () => {
        dispatch({ type: 'CLEAN_IS_OPEN' });
        enqueueSnackbar(`Seleccionar elemento a eliminar`, {
            preventDuplicate: true,
            anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'left',
            },
            autoHideDuration: 3000,
            TransitionComponent: Grow,
        });
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

    const resetBoard = (notification) => {
        dispatch({ type: 'GENERATE_GRIDS' });
        if (notification) {
            enqueueSnackbar(`Reiniciar tablero`, {
                preventDuplicate: true,
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'left',
                },
                autoHideDuration: 3000,
                TransitionComponent: Grow,
            });
        }
    }

    const generateRandom = () => {
        resetBoard(false);

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

        enqueueSnackbar(`Generar laberinto de manera aleatoria`, {
            preventDuplicate: true,
            anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'left',
            },
            autoHideDuration: 3000,
            TransitionComponent: Grow,
        });
    }

    const setSearch = () => {
        if (state.entry && state.exit) {
            dispatch({ type: 'SEARCH_PATH' });
        } else {
            enqueueSnackbar(`No a seleccionado la entrada o salida`, {
                preventDuplicate: true,
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'left',
                },
                variant: "error",
                autoHideDuration: 3000,
                TransitionComponent: Grow,
            });
        }
    }

    const maxSizeNotification = (type, maxSize) => {
        enqueueSnackbar(`Sin espacios ${type}. ${maxSize} Cuadros`, {
            preventDuplicate: true,
            anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'left',
            },
            variant: "warning",
            autoHideDuration: 3000,
            TransitionComponent: Grow,
        });
    };


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
                generateRandom,
                maxSizeNotification,
            }}>{children}
        </AppContext.Provider>
    )

}

// make sure use
export const useGlobalContext = () => {
    return useContext(AppContext)
}

export { AppContext, AppProvider }