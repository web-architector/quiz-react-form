import React from 'react';
import { MainContainer } from 'components/MainContainer';
import { Typography } from '@material-ui/core';
import { Form } from 'components/Form';
import { Input } from 'components/Input';
import { PrimaryButton } from 'components/PrimaryButton';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { useData } from 'context/DataContext';

const schema = yup.object().shape({
    email: yup
        .string()
        .email('Email должен быть корректного формата')
        .required('Email - обязательный параметр')

});

const normalizePhoneNumber = (value) => {
    const phoneNumber = parsePhoneNumberFromString(value);
    if (!phoneNumber) return value;
    return phoneNumber.formatInternational();
    // return phoneNumber.formatNational()
};

export const Step2 = ({ history }) => {
    const { data, setValues } = useData(); // наш контекст
    const {
        register, // ref контроль за формой
        handleSubmit, // функция обработки данных при сабмите формы
        errors,
        watch
    } = useForm({
        mode: 'onBlur', // элемент начинает валидацию при расфокусировке
        resolver: yupResolver(schema),
        defaultValues: { email: data.email, phoneNumber: data.phoneNumber, hasPhone: data.hasPhone }
    });
    const onSubmit = (values) => {
        setValues(values); // данные сохраняем в контекст на каждом шаге
        history.push('/step3');
    };
    const hasPhone = watch('hasPhone');
    return (
        <MainContainer>
            {' '}
            {/* MainContainer — окошко панелька на которой все будет рендериться,
         прямоугольник со скругелнными полями и тенью */ }
            <Typography component="h2" variant="h5">Шаг 2</Typography>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    ref={register}
                    id="email"
                    type="email"
                    label="Email"
                    name="email" // имя поля данных в объекте handleSubmit
                    required
                    error={!!errors.email}
                    helperText={errors?.email?.message}
                />
                <FormControlLabel
                    control={(
                        <Checkbox
                            name="hasPhone"
                            defaultValue={data.hasPhone}
                            defaultChecked={data.hasPhone}
                            inputRef={register}
                            color="primary"
                        />
                    )}
                    label="У вас есть номер телефона?"
                />
                {
                    hasPhone && (
                        <Input
                            ref={register}
                            id="phoneNumber"
                            type="tel"
                            label="Телефон"
                            name="phoneNumber"
                            onChange={(event) => {
                                event.target.value = normalizePhoneNumber(event.target.value);
                            }}
                        />
                    )
                }
                <PrimaryButton>Дальше</PrimaryButton>
                <PrimaryButton
                    type="button"
                    onClick={() => history.push('/')}
                    color="secondary"
                >
                    Назад
                </PrimaryButton>
            </Form>

        </MainContainer>
    );
};
