import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';
import { Template } from './components/MainComponents';
import Header from './components/partials/Header/index';
import Footer from './components/partials/Header/Footer/index'

const Page = (props) => {
  return (
    <BrowserRouter>
      <Template>
        <Header/>
         <Routes/>
        <Footer/>
      </Template>
    </BrowserRouter>
  );
};

const mapStateToProps = (state) =>{
  return {
    user:state.user
  };
};

const mapDispatchToProps = (dispatch) =>{
  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Page);
