var bouncy = require('bouncy')

const PORT = 8080;

var server = bouncy(function(req, res, bounce)
{
    console.log(req.headers);
    if (req.headers.host === '127.0.0.1:' + PORT)
    {
        console.log("1!!!")
        bounce(8001)
    }
    else
    {
        console.log("2!!!")
        bounce(8002)
    }
});

server.listen(PORT, () =>
{
    console.log("Dispatcher listening on port: ", PORT);
});