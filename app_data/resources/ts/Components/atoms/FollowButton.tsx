import axios from 'axios';
import React, { useState } from 'react';
import { useAuth } from '../Authenticate';
import { useMessage } from '../FlashMessageContext';

type Props = {
    following_id: number;
    following: boolean;
    index?: number;
    updateFollowInfo?: (userItem: UserItem, index: number) => void;
    getUserData?: () => void;
};

const FollowButton = (props: Props) => {
    const auth = useAuth();
    const flashMessage = useMessage();
    const [clicked, setClicked] = useState<boolean>(false);

    const followUser = () => {
        setClicked(true);
        const data = {
            user_id: auth?.userData?.id,
            following_user_id: props.following_id,
        };
        axios
            .post(`/api/follow`, data)
            .then((res) => {
                if (props.updateFollowInfo) {
                    props.updateFollowInfo(res.data.data, props.index!);
                }

                if (props.getUserData) {
                    props.getUserData();
                }
            })
            .catch((error) => {
                flashMessage?.setErrorMessage('フォローに失敗しました。', error.response.status);
            })
            .finally(() => {
                setClicked(false);
            });
    };

    const unFollowUser = () => {
        setClicked(true);
        const data = {
            user_id: auth?.userData?.id,
            following_user_id: props.following_id,
        };
        axios
            .post(`/api/unfollow`, data)
            .then((res) => {
                if (props.updateFollowInfo) {
                    props.updateFollowInfo(res.data.data, props.index!);
                }

                if (props.getUserData) {
                    props.getUserData();
                }
            })
            .catch((error) => {
                flashMessage?.setErrorMessage(
                    'フォロー解除に失敗しました。',
                    error.response.status
                );
            })
            .finally(() => {
                setClicked(false);
            });
    };

    const handleClick = props.following ? unFollowUser : followUser;

    return (
        <button onClick={() => handleClick()} disabled={clicked}>
            {props.following ? 'フォロー中' : 'フォロー'}
        </button>
    );
};

export default FollowButton;
