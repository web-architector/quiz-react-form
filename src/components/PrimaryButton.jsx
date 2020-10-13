import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';


// создаем хук стилей
const  useStyles = makeStyles((theme)=>({
    root: {
        margin: theme.spacing(3,0,2)
    }
}))
export const PrimaryButton = ({children, ...props}) =>{
    const styles = useStyles()
    return (
        <Button
            type="submit"
            fullWidth
            variant="contained"
            className={styles.root}
            color="primary"
            {...props}
        >
            {children}
        </Button>
    );
}

