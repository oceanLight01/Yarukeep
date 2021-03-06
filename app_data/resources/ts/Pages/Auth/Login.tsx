import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../Components/Authenticate';
import { useMessage } from '../../Components/FlashMessageContext';

import styles from 'scss/Pages/Auth/Login.modules.scss';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import FormVaridateMessage from '../../Components/Atoms/FormVaridateMessage';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

const Login = () => {
    const auth = useAuth();
    const flashMessage = useMessage();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
    } = useForm<LoginForm>({ mode: 'onBlur' });
    const navigate = useNavigate();

    let unmounted = false;
    useEffect(() => {
        return () => {
            unmounted = true;
        };
    }, []);

    const onSubmit: SubmitHandler<LoginForm> = async (data) => {
        setIsLoading(true);

        await axios
            .get('/sanctum/scrf-cookie')
            .then(() => {
                auth?.login(data)
                    .then(() => {
                        navigate('/home');
                    })
                    .catch((error) => {
                        if (!unmounted) {
                            flashMessage?.setErrorMessage(
                                'ログインに失敗しました。メールアドレスとパスワードが正しいかもう一度お確かめください。',
                                error.response.status
                            );
                        }
                    })
                    .finally(() => {
                        if (!unmounted) {
                            setIsLoading(false);
                        }
                    });
            })
            .catch((error) => {
                if (!unmounted) {
                    flashMessage?.setErrorMessage('認証に失敗しました。', error.response.status);
                    setIsLoading(false);
                }
            });
    };

    return (
        <div className={styles.login_container}>
            <div className={styles.login_wrapper}>
                <div className={styles.title}>
                    <h1>ログイン</h1>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className={styles.login_form}>
                    <div className={styles.form_input}>
                        <div className={styles.form_label}>
                            <label>メールアドレス</label>
                        </div>
                        <Controller
                            name="email"
                            control={control}
                            render={() => (
                                <TextField
                                    type="email"
                                    margin="dense"
                                    fullWidth
                                    {...register('email', { required: true })}
                                />
                            )}
                        />
                        {errors.email && (
                            <FormVaridateMessage message={'メールアドレスを入力してください。'} />
                        )}
                    </div>
                    <div className={styles.form_input}>
                        <div className={styles.form_label}>
                            <label>パスワード</label>
                        </div>
                        <Controller
                            name="password"
                            control={control}
                            render={() => (
                                <TextField
                                    type="password"
                                    margin="dense"
                                    fullWidth
                                    {...register('password', { required: true })}
                                />
                            )}
                        />
                        {errors.password && (
                            <FormVaridateMessage message={'パスワードを入力してください。'} />
                        )}
                    </div>
                    <div>
                        <label>
                            ログイン状態を保存する
                            <Controller
                                name="remember"
                                control={control}
                                render={() => <Checkbox {...register('remember')} />}
                            />
                        </label>
                    </div>
                    <div className={styles.form_button_wrapper}>
                        <Button type="submit" variant="contained" disabled={isLoading}>
                            ログイン
                        </Button>
                    </div>
                </form>
                <div className={styles.links}>
                    <Link to="/register" className={styles.links_item}>
                        アカウント作成
                    </Link>
                    <Link to="/password/forgot" className={styles.links_item}>
                        パスワードを忘れた
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
