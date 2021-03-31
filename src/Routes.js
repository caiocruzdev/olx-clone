import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/home/index';
import About from './pages/about';
import SignIn from './pages/signin';
import SignUp from './pages/signup';
import AdPage from './pages/adpage/index';
import NotFound from './pages/NotFound/NotFound';

function Routes(){
    return (
        <Switch>
            <Route exact={true} path='/'>
                 <Home/>
            </Route>
            
            <Route exact={true} path='/about'>
                <About/>
            </Route>
            <Route exact = {true} path='/signin'>
                <SignIn/>
            </Route>
            <Route exact = {true} path='/signup'>
                <SignUp/>
            </Route>
            <Route exact = {true} path='/ad/:id'>
                <AdPage/>
            </Route>
            <Route>
                <NotFound/>
            </Route>
        </Switch>
    );//O switch serve para checar as paginas sempre usando o 'OU'.
};

export default Routes;
