import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useAuth } from '../../Authenticate';
import { useMessage } from '../../FlashMessageContext';

import styles from 'scss/Components/Molecules/Forms/EditHabitForm.modules.scss';
import Button from '../../Atoms/Buttons/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import FormVaridateMessage from '../../Atoms/FormVaridateMessage';

type HabitForm = {
    title: string;
    description: string;
    categoryId: number;
    isPrivate: string;
    habitId: number;
    activeModal: boolean;
    toggleModal: () => void;
    updateHabit: (HabitItem: HabitItem) => void;
};

const EditHabitForm = (props: HabitForm) => {
    const auth = useAuth();
    const flashMessage = useMessage();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        control,
    } = useForm<HabitForm>({ mode: 'onBlur' });

    let unmounted = false;
    useEffect(() => {
        setValue('isPrivate', props.isPrivate);

        return () => {
            unmounted = true;
        };
    }, []);

    const onSubmit: SubmitHandler<HabitForm> = async (data) => {
        setIsLoading(true);

        const habitData = {
            userId: auth?.userData?.id,
            habitId: props.habitId,
            title: data.title,
            description: data.description,
            categoryId: data.categoryId,
            isPrivate: data.isPrivate === 'true',
        };

        try {
            const habit: AxiosResponse = await axios.put(`/api/habits/${props.habitId}`, habitData);

            if (!unmounted) {
                await props.updateHabit(habit.data.data);
                flashMessage?.setMessage('???????????????????????????????????????????????????');
                props.toggleModal();
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                if (!unmounted) {
                    flashMessage?.setErrorMessage(
                        '????????????????????????????????????????????????????????????',
                        error.response.status
                    );
                }
            }
        } finally {
            if (!unmounted) {
                setIsLoading(false);
            }
        }
    };

    return (
        <div
            className={`${styles.habit_edit_form_container} ${props.activeModal && styles.active}`}
        >
            <div className={styles.habit_edit_form_wrapper}>
                <div className={styles.habit_edit_form}>
                    <h3 className={styles.title}>????????????????????????????????????</h3>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className={styles.form_input}>
                            <label className={styles.form_label}>??????</label>
                            <Controller
                                name="title"
                                control={control}
                                render={() => (
                                    <TextField
                                        type="text"
                                        margin="dense"
                                        maxLength={50}
                                        defaultValue={props.title}
                                        fullWidth
                                        {...register('title', { required: true, maxLength: 50 })}
                                    />
                                )}
                            />
                            {errors.title?.type === 'maxLength' && (
                                <FormVaridateMessage message="?????????50??????????????????????????????????????????" />
                            )}

                            {errors.title?.type === 'required' && (
                                <FormVaridateMessage message="????????????????????????????????????" />
                            )}
                        </div>
                        <div className={styles.form_input}>
                            {errors.description?.type === 'maxLength' && (
                                <FormVaridateMessage message="????????????300??????????????????????????????????????????" />
                            )}
                            <label className={styles.form_label}>?????????</label>
                            <Controller
                                name="description"
                                control={control}
                                render={() => (
                                    <TextField
                                        type="text"
                                        margin="dense"
                                        maxLength={300}
                                        defaultValue={props.description}
                                        multiline
                                        fullWidth
                                        {...register('description', { maxLength: 300 })}
                                    />
                                )}
                            />
                        </div>
                        <div className={styles.form_input}>
                            <label className={styles.form_label}>???????????????</label>
                            <Controller
                                name="categoryId"
                                control={control}
                                render={() => (
                                    <Select
                                        defaultValue={props.categoryId}
                                        fullWidth
                                        {...register('categoryId', { required: true })}
                                    >
                                        <MenuItem value={1}>?????????????????????</MenuItem>
                                        <MenuItem value={2}>????????????</MenuItem>
                                        <MenuItem value={3}>??????????????????????????????</MenuItem>
                                        <MenuItem value={4}>??????????????????</MenuItem>
                                        <MenuItem value={5}>????????????</MenuItem>
                                        <MenuItem value={6}>???????????????</MenuItem>
                                        <MenuItem value={7}>??????</MenuItem>
                                        <MenuItem value={8}>??????</MenuItem>
                                        <MenuItem value={9}>?????????</MenuItem>
                                        <MenuItem value={10}>??????</MenuItem>
                                        <MenuItem value={11}>??????</MenuItem>
                                        <MenuItem value={12}>??????</MenuItem>
                                        <MenuItem value={13}>?????????????????????</MenuItem>
                                        <MenuItem value={14}>??????</MenuItem>
                                        <MenuItem value={15}>???????????????</MenuItem>
                                    </Select>
                                )}
                            />
                        </div>
                        <div className={styles.form_input}>
                            <label className={styles.form_label}>????????????</label>
                            <Controller
                                name="categoryId"
                                control={control}
                                render={() => (
                                    <RadioGroup defaultValue={props.isPrivate} row>
                                        <FormControlLabel
                                            value="false"
                                            control={<Radio />}
                                            label="??????"
                                            {...register('isPrivate', { required: true })}
                                        />
                                        <FormControlLabel
                                            value="true"
                                            control={<Radio />}
                                            label="?????????"
                                            {...register('isPrivate', { required: true })}
                                        />
                                    </RadioGroup>
                                )}
                            />
                            {errors.isPrivate?.type === 'required' && (
                                <FormVaridateMessage message="??????????????????????????????????????????" />
                            )}
                        </div>
                        <div className={styles.form_buttons}>
                            <div className={styles.button_wrapper}>
                                <Button value="??????" type="submit" disabled={isLoading} />
                            </div>
                            <div className={styles.button_wrapper}>
                                <Button
                                    value="??????"
                                    variant="outlined"
                                    clickHandler={() => props.toggleModal()}
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditHabitForm;
