import React from 'react';
import Header from './components/Header'
import './App.css';
import NavBar from './components/NavBar';
import { Router } from "@reach/router";
import ArticleList from './components/ArticleList';
import ArticleContent from './components/ArticleContent';
import ErrorDisplay from './components/ErrorDisplay';

function App() {
  return (
    <div className="App">
      <Header />
      <NavBar />
      <Router>
        <ArticleList path='/' />
        <ArticleList path='/topics/:topic_slug' />
        <ArticleContent path='/articles/:article_id' />
        <ErrorDisplay default status={404} message="This page doesn't exist" />
      </Router>
    </div >
  );
}

export default App;
