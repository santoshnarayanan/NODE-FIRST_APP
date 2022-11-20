const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    //#region Routing Requests
    if (url === '/') {
        //! sending response
        res.write('<html>');
        res.write('<head>');
                res.write('<title>');
        res.write('My New page');
        res.write('</title>');
        res.write('</head>');
        res.write('<body>');
        res.write('<form action="/message" method="POST">')
        res.write('<input type="text" name="message" />');
        res.write('<button type="submit">Send</button>');
        res.write('</form>');
        res.write('</body>');
        res.write('</html>');
        return res.end();
    }

    // Redirect route
    if (url === '/message' && method === 'POST') {
        //parsing chunks
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });
        // event driven mechanism
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fs.writeFileSync('message.txt', message);
            res.statusCode = 302;
            res.setHeader('Location', '/');
            return res.end();
        });

    }
    //#endregion 

    //read req properties
    console.log(req.url, req.method, req.headers);
    //! sending response
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head>');
    res.write('<title>');
    res.write('My first page');
    res.write('</title>');
    res.write('</head>');
    res.write('<body>');
    res.write("My first Node.JS application");
    res.write('</body>');
    res.write('</html>');
    res.end();
};

//using node modules system
module.exports = requestHandler;