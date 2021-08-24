//  Componente para los sliders

import { useState, useEffect } from "react";
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

import '../css/sliders.css'

import { useGlobalContext } from '../controller/context'

//  Caracteristicas especias de los slider(modificando Material UI)
const PrettoSlider = withStyles({
    root: {
        color: '#52af77',
        height: 8,
    },
    thumb: {
        height: 20,
        width: 20,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        marginTop: -8,
        marginLeft: -12,
        '&:focus, &:hover, &$active': {
            boxShadow: 'inherit',
        },
    },
    active: {},
    valueLabel: {
        left: 'calc(-50% + 4px)',
    },
    track: {
        height: 2,
        borderRadius: 4,
    },
    rail: {
        height: 3,
        borderRadius: 4,
    },
})(Slider);

//  Componentes en los que estan incrustrados los sliders para las filas y columnas
const Sliders = () => {
    const { resizeCol, resizeRow, maxSizeNotification } = useGlobalContext();

    //  Variables para asignar los valores a las filas y columnas
    const [row, setRow] = useState(5);
    const [col, setCol] = useState(5);
    //  Variables para determinar el tamaño maximo de pantalla y por lo tanto el maximo del tablero
    const [sizeX, setSizeX] = useState(window.innerWidth);
    const [sizeY, setSizeY] = useState(window.innerHeight);

    // Reasignar tamaño en el Y
    const checkSizeY = () => {
        setSizeY(window.innerHeight);
        let aux = Math.floor(sizeY / 34);
        resizeBoard(col, aux, 'Y');
    };

    // Monitorizar el tamaño en el Y
    useEffect(() => {
        window.addEventListener('resize', checkSizeY);
        return () => {
            window.removeEventListener('resize', checkSizeY);
        };
    }, []);

    // Cambiar el valor para las filas y verificar las posibles
    const handleSliderChangeRow = (event, newValue) => {
        let aux = Math.floor(sizeY / 34);
        resizeBoard(newValue, aux, 'Y');
    };

    // Reasignar tamaño en el X
    const checkSizeX = () => {
        setSizeX(window.innerWidth);
        let aux = Math.floor(sizeX / 27);
        resizeBoard(col, aux, 'X');
    };

    // Monitorizar el tamaño en el X
    useEffect(() => {
        window.addEventListener('resize', checkSizeX);
        return () => {
            window.removeEventListener('resize', checkSizeX);
        };
    }, []);

    // Cambiar el valor para las columnas y verificar las posibles
    const handleSliderChangeCol = (event, newValue) => {
        let aux = Math.floor(sizeX / 27);
        resizeBoard(newValue, aux, 'X');
    };

    //  Reasignar el valor de tablero
    const resizeBoard = (newValue, maxSize, axis) => {
        if (axis === 'X') {
            if (newValue < 5) {
                setCol(5);
            } else if (newValue > maxSize) {
                setCol(maxSize);
                maxSizeNotification('horizontales', maxSize);
            } else {
                setCol(newValue);
            }

            resizeCol(col)

        } else if (axis === 'Y') {
            if (newValue < 5) {
                setRow(5);
            } else if (newValue > maxSize) {
                setRow(maxSize);
                maxSizeNotification('verticales', maxSize);
            } else {
                setRow(newValue);
            }

            resizeRow(row)
        }
    }

    //  Retorno de componentes
    return (
        <div className="selectores">
            <div className="size-selector">
                <div className="size">
                    <Grid container spacing={2} alignItems="center">
                        <Typography id="input-slider" gutterBottom>
                            Filas
                        </Typography>

                        <Grid item xs>
                            <PrettoSlider
                                value={typeof row === 'number' ? row : 5}
                                onChange={handleSliderChangeRow}
                                aria-labelledby="input-slider"
                                valueLabelDisplay="auto"
                                max={60}
                                step={1}
                            />
                        </Grid>

                    </Grid>

                </div>

                <div className="size">
                    <Grid container spacing={2} alignItems="center">
                        <Typography id="input-slider" gutterBottom>
                            Columnas
                        </Typography>

                        <Grid item xs>
                            <PrettoSlider
                                value={typeof col === 'number' ? col : 5}
                                onChange={handleSliderChangeCol}
                                aria-labelledby="input-slider"
                                valueLabelDisplay="auto"
                                max={60}
                                step={1}
                            />
                        </Grid>
                    </Grid>
                </div>
            </div>
        </div>


    );
}

export default Sliders;