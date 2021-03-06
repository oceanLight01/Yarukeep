import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import NotificationItem from '../Components/Atoms/NotificationItem';
import { useMessage } from '../Components/FlashMessageContext';

import styles from 'scss/Pages/NotificationPage.modules.scss';
import Circular from '../Components/Atoms/Circular';
import Button from '../Components/Atoms/Buttons/Button';

const Notification = () => {
    const flashMessage = useMessage();
    const [clicked, setClicked] = useState<boolean>(false);
    const [notification, setNotification] = useState<NotificationItem[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [paginate, setPaginate] = useState({
        nextCursor: '',
        hasNext: false,
    });
    let unmounted = false;

    const getNotificationData = async (nextCursor?: string) => {
        setClicked(true);

        let cursor = '';
        if (nextCursor !== undefined) {
            cursor = `?cursor=${nextCursor}`;
        }

        try {
            const res: AxiosResponse = await axios.get(`/api/notifications${cursor}`);

            if (!unmounted) {
                const data = res.data;
                setNotification([...notification, ...data.notification]);
                setPaginate({
                    ...paginate,
                    nextCursor: data.next_cursor,
                    hasNext: data.has_next,
                });
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                if (!unmounted) {
                    flashMessage?.setErrorMessage(
                        '通知情報の取得に失敗しました。',
                        error.response.status
                    );
                }
            }
        } finally {
            if (!unmounted) {
                setClicked(false);
                setIsLoading(false);
            }
        }
    };

    useEffect(() => {
        getNotificationData();

        return () => {
            unmounted = true;
        };
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <h1 className={styles.title}>通知</h1>
                {isLoading ? (
                    <Circular />
                ) : (
                    <>
                        <ul>
                            {notification.map((item, index) => {
                                return <NotificationItem {...item} key={index} />;
                            })}
                        </ul>
                        {paginate.hasNext && (
                            <div className={styles.button_wrapper}>
                                {clicked ? (
                                    <Circular />
                                ) : (
                                    <Button
                                        value="さらに通知を表示"
                                        variant="text"
                                        clickHandler={() =>
                                            getNotificationData(paginate.nextCursor)
                                        }
                                        disabled={clicked}
                                    />
                                )}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Notification;
