import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from './src/components/App';
import data from './src/testData.json';

export default function serverRenderer({ clientStats, serverStats }) {
  return (req, res, next) => {
    res.status(200).send(`
  <!doctype html>
  <html>
  <head>
      <title>App</title>
  </head>
  <script>window._initialData_ = ${JSON.stringify(data.contests)}</script>
  <body>
      <div id="root">${ReactDOMServer.renderToString(<App initialContests={data.contests}/>)}</div>
      <script src="/bundle.js"></script>
  </body>
  </html>
  `);
  };
};