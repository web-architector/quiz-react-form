import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme)=>({
    root: {
        width: "100%",
        marginTop: theme.spacing(1),
    }

}))

export const Form = ({children, ...props}) => {
    const styles = useStyles();
    return (
        // через пропс настраиваем поведение формы, novalidate- отключение валидации на уровне html
        <form {...props} noValidate className={styles.root}>
            {children}
        </form>
    );
}

