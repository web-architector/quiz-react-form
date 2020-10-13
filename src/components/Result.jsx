import React, { useState } from 'react';
import {
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { InsertDriveFile } from '@material-ui/icons';
import { MainContainer } from 'components/MainContainer';
import { useData } from 'context/DataContext';
import { PrimaryButton } from 'components/PrimaryButton';
import * as Swal from 'sweetalert2';
import Confetti from 'react-confetti';

const useStyles = makeStyles({
    root: {
        marginBottom: '30px'
    },
    table: {
        marginBottom: '30px'
    }
});

export const Result = ({ history }) => {
    const { data } = useData();
    const [success, setSuccess] = useState(false); // state for Confetti
    // entries будет хранить обычные поля формы без файлов
    const entries = Object.entries(data).filter((entry) => entry[0] !== 'files');
    const { files } = data; // чисто тока файлы
    const styles = useStyles();
    // отправка данных формы
    const onSubmit = async () => {
        const formData = new FormData();
        if (data.files) {
            data.files.forEach((file) => {
                formData.append('files', file, file.name);
            });
            console.log('###: Files in formData= ', formData);
        }
        entries.forEach((entry) => {
            formData.append(entry[0], entry[1]);
        });
        console.log('###: Send form data= ', formData);
        const proxyCorsUrl = 'https://api.allorigins.win/get?url=';
        const targetUrl = 'https://postman-echo.com/post';
        const encodeURL = (url) => {
            if (Object) return url;
            return encodeURIComponent(url); // TODO: поиграться - не всегда срабатывало через кодирование url
        };

        const res = await fetch(`${proxyCorsUrl}${encodeURL(targetUrl)}`, {
            method: 'POST',
            body: formData,
            headers: {
                'Content-type': 'multipart/form-data; charset=UTF-8'
            }
        });

        if (res.status === 200) {
            setSuccess(true); // для запуска  конфетти
            await Swal.fire('Урааа!!!', 'Данные успешно отправлены', 'success');
        }
    };

    if (success) return <Confetti />;
    return (
        <MainContainer>
            <Typography component="h2" variant="h5">
                <span role="img" aria-label="emoji">📋</span>
                {' '}
                Проверьте Ваши данные
            </Typography>
            <TableContainer className={styles.root} component={Paper}>
                <Table className={styles.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                Наименование
                            </TableCell>
                            <TableCell align="right">
                                Значение
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            entries.map((entry) => (
                                <TableRow key={entry[0]}>
                                    <TableCell>{ entry[0] }</TableCell>
                                    <TableCell align="right">{ entry[1].toString() }</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            {
                files && (
                    <>
                        <Typography component="h2" variant="h5">
                            <span role="img" aria-label="emoji">📦</span>
                            {' '}
                            Files
                        </Typography>
                        <List>
                            {
                                files.map((f, index) => (
                                    <ListItem key={f.name + index}>
                                        <ListItemIcon>
                                            <InsertDriveFile />
                                        </ListItemIcon>
                                        <ListItemText primary={f.name} secondary={f.size} />
                                    </ListItem>
                                ))
                            }
                        </List>
                    </>
                )
            }
            <PrimaryButton
                    onClick={onSubmit}
            >
                Отправить
            </PrimaryButton>
            <PrimaryButton
                    type="button"
                    onClick={() => history.push('/step3')}
                    color="secondary"
            >
                Назад
            </PrimaryButton>
        </MainContainer>
    );
};
