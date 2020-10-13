import React from 'react';
import { Typography } from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

//создаем хук для стилей
const useStyles = makeStyles((theme)=>({
    // theme -темная /светлая темы
    root: {
        fontFamily: "Permanent Marker",
        margin: theme.spacing(3,0,2), // отсупы сетки
        textAlign: "center",
        fontSize: "40px",
        color: "deeppink",
        textShadow: "1px 1px darkmagenta"
    }
    })

)
export const Header = () => {
    const styles = useStyles();
    return (
        <Typography className={styles.root} component={"h1"} variant={"h2"}> {/* компонент управления стилями */}
            Форма ввода данных
        </Typography>
    );
}

export default Header;
