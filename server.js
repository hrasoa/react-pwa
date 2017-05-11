import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from './src/components/App';
import data from './src/testData.json';

export default function serverRenderer({ clientStats, serverStats }) {
  return (req, res, next) => {
    res.status(200).render('index', {
      initialState: data.contests,
      initialMarkup: ReactDOMServer.renderToString(<App initialContests={data.contests}/>)
    });
  }
};