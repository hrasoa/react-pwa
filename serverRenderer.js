import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router'
import App from './src/components/App';
import data from './src/testData.json';

const context = {};

export default function serverRenderer() {
  return (req, res, next) => {

    const markup = (
      <StaticRouter
        location={req.url}
        context={context}
      >
        <App initialState={data}/>
      </StaticRouter>
    );

    res.status(200).render('index', {
      initialMarkup: ReactDOMServer.renderToStaticMarkup(markup),
      initialState: data,
      prod: process.env.NODE_ENV === 'production'
    });

    //res.end();
  }
};