import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from './src/components/App';
import data from './src/testData.json';

export default function serverRenderer() {
  return (req, res, next) => {
    res.status(200).render('index', {
      initialState: data.contests,
      prod: process.env.NODE_ENV === 'production',
      initialMarkup: ReactDOMServer.renderToStaticMarkup(<App initialContests={data.contests}/>)
    });
  }
};