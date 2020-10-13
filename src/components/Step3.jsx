import React from 'react';
import { MainContainer } from 'components/MainContainer';
import { Typography } from '@material-ui/core';
import { Form } from 'components/Form';
import { PrimaryButton } from 'components/PrimaryButton';
import { useForm } from 'react-hook-form';
import { FileInput } from 'components/FileInput';
import { useData } from 'context/DataContext';

export const Step3 = ({ history }) => {
    const { data, setValues } = useData(); // наш контекст
    const {
        handleSubmit, // функция обработки данных при сабмите формы
        control
    } = useForm({
        defaultValues: {
            files: data.files
        }
    });
    const onSubmit = (values) => {
        setValues(values); // данные сохраняем в контекст на каждом шаге
        history.push('/result');
    };
    return (
        <MainContainer>
            {' '}
            {/* MainContainer — окошко панелька на которой все будет рендериться,
         прямоугольник со скругелнными полями и тенью */ }
            <Typography component="h2" variant="h5">Шаг 3</Typography>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <FileInput name="files" control={control} />
                <PrimaryButton>Дальше</PrimaryButton>
                <PrimaryButton
                    type="button"
                    onClick={() => history.push('/step2')}
                    color="secondary"
                >
                    Назад
                </PrimaryButton>
            </Form>

        </MainContainer>
    );
};
