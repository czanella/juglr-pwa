export default (body, initialState, helmet) => (
`<html ${helmet.htmlAttributes.toString()}>
    <head>
        <meta charSet="utf-8">
        <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no" >
        <link href="/static/app.bundle.css" rel="stylesheet">
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        ${helmet.link.toString()}
    </head>
    <body>
        <div id="root">${body}</div>
        <script>window.__PRELOADED_STATE__ = ${JSON.stringify(initialState).replace(/</g, '\\u003c')};</script>
        <script src="/static/app.bundle.js"></script>
    </body>
</html>
`
);
