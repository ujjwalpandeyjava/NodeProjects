// Custom backend means serving files as according to the need or asked
// before starting server go into the directory of file with the help of cd and than run the .js file.

/* //Not good practice*/

const hostname = '127.0.0.1';
const port = 3000;

const http = require('http');
const fs = require('fs')

let index = fs.readFileSync('./index.html') //File to read
let contact = fs.readFileSync('./contact.html') //File to read
let services = fs.readFileSync('./services.html') //File to read
let about = fs.readFileSync('./about.html') //File to read

const server = http.createServer((req, res) => {
    console.log(req.url)
    url = req.url;

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    //File to send
    if (url == '/') res.end(index)
    else if (url == '/index.html') { res.end(index) }
    else if (url == '/contact.html') { res.end(contact) }
    else if (url == '/services.html') { res.end(services) }
    else if (url == '/about.html') { res.end(about) }
    else {
        res.statusCode = 404;
        res.end("<h1>404 Page not found</h1>\ncreate a new page for page not found")
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

/*What to do----
    crerate server:-  contains http, req ans res
    and
    listen server:- contains port and hostname as parameter and 3rd para function to print anything.
        We can even use post, get and others too.
*/