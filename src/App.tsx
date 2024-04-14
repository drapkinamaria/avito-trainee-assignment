import React from 'react'
import {MoviesList} from './pages/movies-list';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import {AppRoute} from './const';
import {Movie} from './pages/movie';
import {LoginForm} from "./pages/login-form";
import {RandomMovie} from "./pages/random-movie";
import {PrivateRoute} from "./components/private-route";
import {AuthProvider} from "./components/auth-context";

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path={AppRoute.Login} element={<LoginForm />} />
                    <Route path={AppRoute.Root} element={<MoviesList />} />
                    <Route path={AppRoute.Movie} element={<Movie />} />
                    <Route
                        path={AppRoute.RandomMovie}
                        element={
                            <PrivateRoute>
                                <RandomMovie />
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
