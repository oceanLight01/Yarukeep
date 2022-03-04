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
import Diary from './Diary';
import Settings from './Settings';

const App = () => {
    return (
        <ProvideAuth>
            <Loading>
                <BrowserRouter>
                    <Header />
                    <Navigation />
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
                            path="/user/:screenName/habit/:id"
                            element={
                                <PrivateRoute>
                                    <HabitStatus />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/user/:screenName/habit/:id/diary/:did"
                            element={
                                <PrivateRoute>
                                    <Diary />
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
                    </Routes>
                    <Footer />
                </BrowserRouter>
            </Loading>
        </ProvideAuth>
    );
};

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
