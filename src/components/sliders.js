//  Componente para los sliders

import { useState, useEffect } from "react";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

import '../css/selector.css'

//  Caracteristicas especias de los slider(modificando Material UI)
const PrettoSlider = withStyles({
    root: {
        color: '#52af77',
        height: 8,
    },
    thumb: {
        height: 24,
        width: 24,
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
        height: 4,
        borderRadius: 4,
    },
    rail: {
        height: 5,
        borderRadius: 4,
    },
})(Slider);

//  Componentes en los que estan incrustrados los sliders para las filas y columnas
const Sliders = ({ row_col, setRow_Col }) => {
    //  Variables para asignar los valores a las filas y columnas
    const [row, setRow] = useState(5);
    const [col, setCol] = useState(5);
    //  Variables para determinar el tamaño maximo de pantalla y por lo tanto el maximo del tablero
    const [sizeX, setSizeX] = useState(window.innerWidth);
    const [sizeY, setSizeY] = useState(window.innerHeight);

    // Reasignar tamaño en el Y
    const checkSizeY = () => {
        setSizeY(window.innerHeight);
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
        let aux = Math.floor(sizeY / 37);

        if (newValue < 5) {
            setRow(5);
        } else if (newValue > aux) {
            setRow(aux);
        } else {
            setRow(newValue);
        }
        
        setRow_Col({ ...row_col, row: row })
    };

    // Reasignar tamaño en el X
    const checkSizeX = () => {
        setSizeX(window.innerWidth);
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
        
        if (newValue < 5) {
            setCol(5);
        } else if (newValue > aux) {
            setCol(aux);
        } else {
            setCol(newValue);
        }
      
        setRow_Col({ ...row_col, col: col })
    };

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
                            />
                        </Grid>
                    </Grid>
                </div>
            </div>
        </div>


    );
}

export default Sliders;