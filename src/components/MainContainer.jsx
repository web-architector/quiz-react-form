import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';

// кастомный хук для использования стилей
const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(4),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    }
}));

// MainContainer — окошко панелька на которой все будет рендериться — прямоугольник со скругелнными полями и тенью
// props для переопределения чего нидь в MainContainer
export const MainContainer = ({children, ...props}) => {
        const styles = useStyles();
        return (
            <Container className={styles.root} container={'main'} maxWidth={'xs'} {...props}>
                { children }
            </Container>
        );
    }
;

