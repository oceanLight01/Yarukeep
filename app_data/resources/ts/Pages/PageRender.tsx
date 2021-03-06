import React from 'react';
import Circular from '../Components/Atoms/Circular';

type Props = {
    children: JSX.Element;
    status: number;
};

const PageRender = ({ children, status }: Props) => {
    switch (status) {
        case 0:
            return <Circular />;
        case 400:
            return <p>データの取得に失敗しました。</p>;
        case 404:
            return <p>お探しのページは存在しません。すでに削除された可能性があります。</p>;
        case 500:
            return <p>サーバーエラーが発生しました。時間を置いて再度アクセスしてください。</p>;
        default:
            return children;
    }
};

export default PageRender;
