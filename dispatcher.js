var bouncy = require('bouncy'),
    crypto = require('crypto'),
    fs = require('fs')

const options = require(__dirname + '/options.json')

var bounceOptions = {}

if (options.secure)
{
    try
    {
        bounceOptions.cert = fs.readFileSync(parsePath(options.secure.certPath));
    }
    catch (err)
    {
        console.error("Failed to read certificate")
        console.error(err)
    }

    try
    {
        bounceOptions.key = fs.readFileSync(parsePath(options.secure.keyPath));
    }
    catch
    {
        console.error("Failed to read key")
    }
}

var server = bouncy(bounceOptions, function(req, res, bounce)
{
    for (route of options.routes)
    {
        if (route.host === req.headers.host)
        {
            if (options.printDebug) console.log("Routing '" + route.host + "' to port " + route.port);
            bounce(route.port);
            return;
        }
    }

    if (options.printDebug) console.log("Host redirect not found for " + req.headers.host);
});

server.listen(options.dispatcherPort, () =>
{
    console.log("Dispatcher listening on port: ", options.dispatcherPort);
});

function parsePath(input)
{
    if (input.charAt(0) === '.')
    {
        return __dirname + input.substr(1);
    }
    return input;
}

function sni_select(hostname) {
    var creds = {
        key: fs.readFileSync('./ssl/enotes_site.key'),
        cert: fs.readFileSync('./ssl/enotes_site.crt')
    };
    return crypto.createCredentials(creds).context
}
