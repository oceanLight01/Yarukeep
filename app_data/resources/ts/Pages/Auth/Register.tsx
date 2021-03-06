import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Components/Authenticate';
import { useMessage } from '../../Components/FlashMessageContext';

import styles from 'scss/Pages/Auth/Register.modules.scss';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormVaridateMessage from '../../Components/Atoms/FormVaridateMessage';
import FormRule from '../../Components/Atoms/FormRule';
import ValidateCountInput from '../../Components/Atoms/ValidateCountInput';
import axios from 'axios';

type RegisterForm = {
    name: string;
    screen_name: string;
    email: string;
    password: string;
    password_confirmation: string;
};

type ErrorMessage = {
    email: string[];
    screen_name: string[];
};

const Register = () => {
    const auth = useAuth();
    const flashMessage = useMessage();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<ErrorMessage>({ email: [], screen_name: [] });
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
        control,
        watch,
    } = useForm<RegisterForm>({ mode: 'onBlur' });
    const navigate = useNavigate();

    let unmounted = false;
    useEffect(() => {
        return () => {
            unmounted = true;
        };
    }, []);

    const onSubmit: SubmitHandler<RegisterForm> = async (data) => {
        setIsLoading(true);

        try {
            await auth?.register(data);

            navigate('/home');
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const data = error.response.data.errors;
                if (error.response.status >= 500) {
                    flashMessage?.setErrorMessage('', error.response.status);
                } else {
                    setErrorMessage({
                        email: data.email ? data.email : [],
                        screen_name: data.screen_name ? data.screen_name : [],
                    });
                }
            }
        } finally {
            if (!unmounted) {
                setIsLoading(false);
            }
        }
    };

    return (
        <div className={styles.register_container}>
            <div className={styles.register_wrapper}>
                <div className={styles.title}>
                    <h1>?????????????????????</h1>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className={styles.register_form}>
                    <div className={styles.form_input}>
                        <div className={styles.form_label}>
                            <label>??????????????????</label>
                            <ValidateCountInput text={watch('name')} limit={30} />
                        </div>
                        <Controller
                            name="name"
                            control={control}
                            render={() => (
                                <TextField
                                    type="text"
                                    margin="dense"
                                    fullWidth
                                    {...register('name', { required: true, maxLength: 30 })}
                                />
                            )}
                        />
                        {errors.name?.type === 'maxLength' && (
                            <FormVaridateMessage
                                message={'?????????????????????30??????????????????????????????????????????'}
                            />
                        )}
                        {errors.name?.type === 'required' && (
                            <FormVaridateMessage message={'????????????????????????????????????????????????'} />
                        )}
                    </div>
                    <div className={styles.form_input}>
                        <div className={styles.form_label}>
                            <label>???????????????ID</label>
                            <ValidateCountInput text={watch('screen_name')} limit={20} />
                        </div>
                        <Controller
                            name="screen_name"
                            control={control}
                            render={() => (
                                <TextField
                                    type="text"
                                    margin="dense"
                                    fullWidth
                                    {...register('screen_name', {
                                        required: true,
                                        maxLength: 20,
                                        pattern: /^(?=.*?[a-zA-Z\d])[a-zA-Z\d]+$/,
                                    })}
                                />
                            )}
                        />
                        <FormRule rule={'???????????????????????????????????????'} />
                        {errors.screen_name?.type === 'required' && (
                            <FormVaridateMessage message={'???????????????ID??????????????????????????????'} />
                        )}
                        {errors.screen_name?.type === 'maxLength' && (
                            <FormVaridateMessage
                                message={'???????????????ID???20??????????????????????????????????????????'}
                            />
                        )}
                        {errors.screen_name?.type === 'pattern' && (
                            <FormVaridateMessage
                                message={'???????????????ID?????????????????????????????????????????????'}
                            />
                        )}
                        {errorMessage.screen_name.map((str, index) => {
                            return <FormVaridateMessage message={str} key={index} />;
                        })}
                    </div>
                    <div className={styles.form_input}>
                        <div className={styles.form_label}>
                            <label>?????????????????????</label>
                            <ValidateCountInput text={watch('email')} limit={255} />
                        </div>
                        <Controller
                            name="email"
                            control={control}
                            render={() => (
                                <TextField
                                    type="email"
                                    margin="dense"
                                    fullWidth
                                    {...register('email', {
                                        required: true,
                                        maxLength: 255,
                                        pattern:
                                            /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                    })}
                                />
                            )}
                        />
                        {errors.email?.type === 'required' && (
                            <FormVaridateMessage message={'???????????????????????????????????????????????????'} />
                        )}
                        {errors.email?.type === 'maxLength' && (
                            <FormVaridateMessage
                                message={'????????????????????????255??????????????????????????????????????????'}
                            />
                        )}
                        {errors.email?.type === 'pattern' && (
                            <FormVaridateMessage
                                message={'?????????????????????????????????????????????????????????????????????'}
                            />
                        )}
                        {errorMessage.email.map((str, index) => {
                            return <FormVaridateMessage message={str} key={index} />;
                        })}
                    </div>
                    <div className={styles.form_input}>
                        <div className={styles.form_label}>
                            <label>???????????????</label>
                            <ValidateCountInput text={watch('password')} limit={64} />
                        </div>
                        <Controller
                            name="password"
                            control={control}
                            render={() => (
                                <TextField
                                    type="password"
                                    margin="dense"
                                    fullWidth
                                    {...register('password', {
                                        required: true,
                                        minLength: 8,
                                        maxLength: 64,
                                        pattern: /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)[a-zA-Z\d]+$/,
                                    })}
                                />
                            )}
                        />
                        <FormRule
                            rule={
                                '???8????????????64????????????  ??????????????????????????????????????????????????????????????????????????????????????????'
                            }
                        />

                        {errors.password?.type === 'required' && (
                            <FormVaridateMessage message={'?????????????????????????????????????????????'} />
                        )}
                        {errors.password?.type === 'minLength' && (
                            <FormVaridateMessage
                                message={'????????????????????????????????????????????????????????????'}
                            />
                        )}
                        {errors.password?.type === 'maxLength' && (
                            <FormVaridateMessage
                                message={'??????????????????64??????????????????????????????????????????'}
                            />
                        )}
                        {errors.password?.type === 'pattern' && (
                            <FormVaridateMessage
                                message={
                                    '????????????????????????????????????????????????????????????????????????????????????????????????????????????'
                                }
                            />
                        )}
                    </div>
                    <div className={styles.form_input}>
                        <div className={styles.form_label}>
                            <label>?????????????????????</label>
                        </div>
                        <Controller
                            name="password_confirmation"
                            control={control}
                            render={() => (
                                <TextField
                                    type="password"
                                    margin="dense"
                                    fullWidth
                                    {...register('password_confirmation', {
                                        required: true,
                                        validate: (value) => value === getValues('password'),
                                    })}
                                />
                            )}
                        />
                        <FormRule rule={'?????????????????????????????????'} />
                        {errors.password_confirmation?.type === 'required' && (
                            <FormVaridateMessage message={'??????????????????????????????????????????????????????'} />
                        )}
                        {errors.password_confirmation?.type === 'validate' && (
                            <FormVaridateMessage message={'???????????????????????????????????????'} />
                        )}
                    </div>
                    <div className={styles.form_button_wrapper}>
                        <Button type="submit" variant="contained" disabled={isLoading}>
                            ??????
                        </Button>
                    </div>
                </form>
                <div className={styles.link}>
                    <Link to="/login" className={styles.link_name}>
                        ????????????
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
