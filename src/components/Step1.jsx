import React from 'react';
import { MainContainer } from 'components/MainContainer';
import { Typography } from '@material-ui/core';
import { Form } from 'components/Form';
import { Input } from 'components/Input';
import { PrimaryButton } from 'components/PrimaryButton';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useData } from 'context/DataContext';

const schema = yup.object().shape({
    firstName: yup
        .string()
        .matches(/^([^0-9]*)$/, 'Имя не должно содержать цифры')
        .required('Имя - обязательный параметр'),
    lastName: yup
        .string()
        .matches(/^([^0-9]*)$/, 'Фамилия не должна содержать цифры')
        .required('Фамилия - обязательный параметр')

});
export const Step1 = ({ history }) => {
    const { data, setValues } = useData(); // наш контекст со стейтом
    const {
        register, // ref контроль за формой
        handleSubmit, // функция обработки данных при сабмите формы
        errors
    } = useForm({
        mode: 'onBlur', // элемент начинает валидацию при расфокусировке
        resolver: yupResolver(schema),
        defaultValues: { firstName: data.firstName, lastName: data.lastName }
    });
    const onSubmit = (values) => {
        setValues(values); // данные сохраняем в контекст на каждом шаге
        history.push('/step2');
    };
    return (
        <MainContainer>
            {' '}
            {/* MainContainer — окошко панелька на которой все будет рендериться,
         прямоугольник со скругелнными полями и тенью */ }
            <Typography component="h2" variant="h5">Шаг 1</Typography>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    ref={register}
                    id="firstName"
                    type="text"
                    label="Имя"
                    name="firstName" // имя поля данных в объекте handleSubmit
                    error={!!errors.firstName}
                    helperText={errors?.firstName?.message}
                />
                <Input
                    ref={register}
                    id="lastName"
                    type="text"
                    label="Фамилия"
                    name="lastName" // имя поля данных в объекте handleSubmit
                    error={!!errors.lastName}
                    helperText={errors?.lastName?.message}
                />
                <PrimaryButton>Вперед</PrimaryButton>
            </Form>

        </MainContainer>
    );
};
