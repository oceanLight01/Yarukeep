import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProvideAuth, {
    EmailVerifiedRoute,
    PrivateRoute,
    PublicRoute,
} from '../Components/Authenticate';

import Loading from './../Components/Loading';
import Header from '../Components/Header';
import Navigation from '../Components/Navigation';
import Top from './Top';
import Login from './Auth/Login';
import Register from './Auth/Register';
import EmailVerified from './Auth/EmailVerified';
import Home from './Home';
import Footer from '../Components/Footer';
import User from './User';
import HabitPost from './HabitPost';
import HabitStatus from './HabitStatus';
import Settings from './Settings';
import FollowingUser from './FollowingUser';
import FollowedUser from './FollowedUser';
import Search from './Search';
import Notification from './Notification';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
import ProvideMessage, { FlashMessage } from '../Components/FlashMessageContext';

import '../../scss/app.scss';

const App = () => {
    return (
        <ProvideAuth>
            <ProvideMessage>
                <Loading>
                    <BrowserRouter>
                        <Header />
                        <Navigation />
                        <FlashMessage />
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <PublicRoute>
                                        <Top />
                                    </PublicRoute>
                                }
                            />
                            <Route
                                path="/login"
                                element={
                                    <PublicRoute>
                                        <Login />
                                    </PublicRoute>
                                }
                            />
                            <Route
                                path="/register"
                                element={
                                    <PublicRoute>
                                        <Register />
                                    </PublicRoute>
                                }
                            />
                            <Route
                                path="/password/forgot"
                                element={
                                    <PublicRoute>
                                        <ForgotPassword />
                                    </PublicRoute>
                                }
                            />
                            <Route
                                path="/password/reset/:token"
                                element={
                                    <PublicRoute>
                                        <ResetPassword />
                                    </PublicRoute>
                                }
                            />
                            <Route
                                path="/verified"
                                element={
                                    <EmailVerifiedRoute>
                                        <EmailVerified />
                                    </EmailVerifiedRoute>
                                }
                            />
                            <Route
                                path="/home"
                                element={
                                    <PrivateRoute>
                                        <Home />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/user/:screenName"
                                element={
                                    <PrivateRoute>
                                        <User />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/post/habit"
                                element={
                                    <PrivateRoute>
                                        <HabitPost />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/user/:screenName/habit/:id/*"
                                element={
                                    <PrivateRoute>
                                        <HabitStatus />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/user/:screenName/following"
                                element={
                                    <PrivateRoute>
                                        <FollowingUser />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/user/:screenName/followed"
                                element={
                                    <PrivateRoute>
                                        <FollowedUser />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/search"
                                element={
                                    <PrivateRoute>
                                        <Search />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/settings"
                                element={
                                    <PrivateRoute>
                                        <Settings />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/notifications"
                                element={
                                    <PrivateRoute>
                                        <Notification />
                                    </PrivateRoute>
                                }
                            />
                        </Routes>
                        <Footer />
                    </BrowserRouter>
                </Loading>
            </ProvideMessage>
        </ProvideAuth>
    );
};

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
