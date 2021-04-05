import React from 'react';
import { Switch } from 'react-router-dom';
import RouteHandler from './components/RouteHandler';
import Home from './pages/home/index';
import About from './pages/about';
import SignIn from './pages/signin';
import SignUp from './pages/signup';
import AdPage from './pages/adpage/index';
import NotFound from './pages/NotFound/NotFound';

function Routes(){
    return (
        <Switch>
            <RouteHandler exact={true} path='/'>
                 <Home/>
            </RouteHandler>
            
            <RouteHandler exact={true} path='/about'>
                <About/>
            </RouteHandler>
            <RouteHandler exact = {true} path='/signin'>
                <SignIn/>
            </RouteHandler>
            <RouteHandler exact = {true} path='/signup'>
                <SignUp/>
            </RouteHandler>
            <RouteHandler exact = {true} path='/ad/:id'>
                <AdPage/>
            </RouteHandler>
            <RouteHandler private exact = {true} path='/post-an-ad'>
            <About/>
            </RouteHandler>
            <RouteHandler>
                <NotFound/>
            </RouteHandler>
        </Switch>
    );//O switch serve para checar as paginas sempre usando o 'OU'.
};

export default Routes;
