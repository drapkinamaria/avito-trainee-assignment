import React from 'react'
import {MoviesList} from './pages/movies-list';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import {AppRoute} from './const';
import {Movie} from './pages/movie';
import {LoginForm} from "./pages/login-form";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={AppRoute.Login} element={<LoginForm />}></Route>
                <Route path={AppRoute.Root} element={<MoviesList />}/>
                <Route path={AppRoute.Movie} element={<Movie />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;
