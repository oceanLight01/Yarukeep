import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './Authenticate';

import styles from '../../scss/Header.modules.scss';
import NavigationNotification from './NavigationNotification';
import SearchIcon from '@mui/icons-material/Search';
import Navigation from './Navigation';
import SpMenu from './SpMenu';

const Header = () => {
    const auth = useAuth();

    return (
        <header className={styles.header}>
            <div className={styles.header_wrapper}>
                <div className={styles.header_logo_wrapper}>
                    <Link to="/" className={styles.header_logo}>
                        Yarukeep
                    </Link>
                </div>
                <div className={styles.header_menu_wrapper}>
                    {auth?.userData && (
                        <>
                            <div className={styles.header_search}>
                                <Link to={'/search'}>
                                    <SearchIcon />
                                    検索
                                </Link>
                            </div>
                            <div className={styles.header_notification}>
                                <NavigationNotification />
                            </div>
                        </>
                    )}

                    <div className={styles.header_user_name}>
                        <Navigation />
                    </div>
                    <SpMenu />
                </div>
            </div>
        </header>
    );
};

export default Header;
