import React, { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useAuth } from '../../Authenticate';
import { useMessage } from '../../FlashMessageContext';

import styles from 'scss/Components/Molecules/Forms/SettingsForm.modules.scss';
import TextField from '@mui/material/TextField';
import Button from '../../Atoms/Buttons/Button';
import FormVaridateMessage from '../../Atoms/FormVaridateMessage';
import ValidateCountInput from '../../Atoms/ValidateCountInput';
import axios from 'axios';

type SettingsForm = {
    name: string;
    screen_name: string;
    profile: string;
};

type ErrorMessage = {
    name: string[];
    screen_name: string[];
    profile: string[];
};

const UserSettingsForm = () => {
    const auth = useAuth();
    const flashMessage = useMessage();
    const [errorMessage, setErrorMessage] = useState<ErrorMessage>({
        name: [],
        screen_name: [],
        profile: [],
    });
    const [clicked, setClicked] = useState<boolean>(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        control,
        watch,
    } = useForm<SettingsForm>({ mode: 'onBlur' });

    let unmounted = false;
    useEffect(() => {
        if (!unmounted) {
            setValue('name', auth?.userData?.name!);
            setValue('screen_name', auth?.userData?.screen_name!);
            setValue('profile', auth?.userData?.profile!);
        }

        return () => {
            unmounted = true;
        };
    }, []);

    const onSubmit: SubmitHandler<SettingsForm> = async (data) => {
        setClicked(true);

        const editData = {
            ...data,
            id: auth?.userData?.id,
        };

        const user = await auth?.edit(editData);
        const editResponse = user[0];
        setClicked(false);

        if (unmounted) {
            return;
        }

        if (editResponse !== undefined) {
            flashMessage?.setErrorMessage(
                'ユーザー情報の更新に失敗しました。',
                editResponse.data.status
            );
            const error = editResponse.data.errors;
            setErrorMessage({
                name: error.name ? error.name : [],
                screen_name: error.screen_name ? error.screen_name : [],
                profile: error.profile ? error.profile : [],
            });
            return;
        }

        flashMessage?.setMessage('ユーザー情報を更新しました。');
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.form_input}>
                <div className={styles.form_label}>
                    <label>アカウント名</label>
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
                    <FormVaridateMessage message="アカウント名は30文字以下で入力してください。" />
                )}
                {errors.name?.type === 'required' && (
                    <FormVaridateMessage message="アカウント名を入力してください。" />
                )}
                {errorMessage.name.map((str, index) => {
                    return <FormVaridateMessage message={str} key={index} />;
                })}
            </div>
            <div className={styles.form_input}>
                <div className={styles.form_label}>
                    <label>アカウントID</label>
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
                {errors.screen_name?.type === 'required' && (
                    <FormVaridateMessage message="アカウントIDを入力してください。" />
                )}
                {errors.screen_name?.type === 'maxLength' && (
                    <FormVaridateMessage message="アカウントIDは20文字以下で入力してください。" />
                )}
                {errors.screen_name?.type === 'pattern' && (
                    <FormVaridateMessage message="アカウントIDは半角英数字のみ使用できます。" />
                )}
                {errorMessage.screen_name.map((str, index) => {
                    return <FormVaridateMessage message={str} key={index} />;
                })}
            </div>
            <div className={styles.form_input}>
                <div className={styles.form_label}>
                    <label>プロフィール</label>
                    <ValidateCountInput text={watch('profile')} limit={300} />
                </div>
                <Controller
                    name="profile"
                    control={control}
                    render={() => (
                        <TextField
                            type="text"
                            margin="dense"
                            fullWidth
                            multiline
                            {...register('profile', { maxLength: 300 })}
                        />
                    )}
                />
                {errors.profile?.type === 'maxLength' && (
                    <FormVaridateMessage message="プロフィールは300文字以下で入力してください。" />
                )}
                {errorMessage.profile.map((str, index) => {
                    return <FormVaridateMessage message={str} key={index} />;
                })}
            </div>
            <div className={styles.form_button_wrapper}>
                <Button type="submit" value="変更" disabled={clicked} />
            </div>
        </form>
    );
};

export default UserSettingsForm;
