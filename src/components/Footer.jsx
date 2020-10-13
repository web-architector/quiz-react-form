import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { useData } from 'context/DataContext';

// создаем хук для стилей
const useStyles = makeStyles((theme) => ({
    // theme -темная /светлая темы
    root: {
        fontFamily: 'Permanent Marker',
        margin: theme.spacing(3, 0, 2), // отсупы сетки
        textAlign: 'center',
        fontSize: '20px',
        color: 'deeppink',
        textShadow: '1px 1px darkmagenta'
    }
}));
export const Footer = () => {
    const styles = useStyles();
    const { resetState } = useData(); // наш контекст со стейтом
    return (
        <Typography className={styles.root} component="h3" variant="h3">
            {/* компонент управления стилями */}
            <Link to="/" onClick={resetState}>Сбросить все и начать сначала</Link>
        </Typography>
    );
};
