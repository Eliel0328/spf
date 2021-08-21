import React from 'react';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { green, purple } from '@material-ui/core/colors';


const EntryButton = withStyles((theme) => ({
    root: {
        borderBottom: 'solid 3px #5EA8E5',
        '&:hover': {
            border: 'solid 1px #86bfee',
        },
    },
}))(Button);

const ExitButton = withStyles((theme) => ({
    root: {
        borderBottom: 'solid 3px #4DB053',
        '&:hover': {
            border: 'solid 1px #1bca27',
        },
    },
}))(Button);

const WallButton = withStyles((theme) => ({
    root: {
        borderBottom: 'solid 3px #a11129',
        '&:hover': {
            border: 'solid 1px #d34d63',
        },
    },
}))(Button);

const ClearButton = withStyles((theme) => ({
    root: {
        borderBottom: 'solid 3px rgb(223, 221, 221)',
        '&:hover': {
            border: 'solid 1px rgb(187, 181, 181)',
        },
    },
}))(Button);

const SearchButton = withStyles((theme) => ({
    root: {
        borderBottom: 'solid 3px rgb(135, 20, 230)',
        '&:hover': {
            border: 'solid 1px rgb(180, 106, 241)',
        },
    },
}))(Button);

const ResetButton = withStyles((theme) => ({
    root: {
        borderBottom: 'solid 3px rgb(44, 9, 199)',
        '&:hover': {
            border: 'solid 1px rgb(80, 58, 182)',
        },
    },
}))(Button);

const RandomButton = withStyles((theme) => ({
    root: {
        borderBottom: 'solid 3px rgb(139, 141, 2)',
        '&:hover': {
            border: 'solid 1px rgb(236, 240, 16)',
        },
    },
}))(Button);

const useStyles = makeStyles((theme) => ({
    margin: {
        width: '90px',
        color: '#000',
        borderRadius: '1%',
        backgroundColor: '#fff',
        textTransform: 'capitalize',
        margin: theme.spacing(0.2),
        fontSize: 'font-size: 40px;',
        fontFamily: '"Georama", sans-serif',
        '&:hover': {
            backgroundColor: '#fff',
        },
    },
    
    
}));


export default function CustomizedButtons() {
    const classes = useStyles();

    return (
        <div>
            <EntryButton variant="contained" color="primary" className={`${classes.margin} ${classes.fontFamily}`}>
                Entrada
            </EntryButton>

            <ExitButton variant="contained" color="primary" className={classes.margin}>
                Salida
            </ExitButton>

            <WallButton variant="contained" color="primary" className={classes.margin}>
                Muro
            </WallButton>

            <ClearButton variant="contained" color="primary" className={classes.margin}>
                Limpiar
            </ClearButton>

            <SearchButton variant="contained" color="primary" className={classes.margin}>
                Buscar
            </SearchButton>

            <ResetButton variant="contained" color="primary" className={classes.margin}>
                Reiniciar
            </ResetButton>
            
            <RandomButton variant="contained" color="primary" className={classes.margin}>
                Generar
            </RandomButton>
            

        </div>
    );
}
