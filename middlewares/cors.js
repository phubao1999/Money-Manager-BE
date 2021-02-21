const corsMidlleWare = (req, callback) => {
    const whitelist = ['http://localhost:4200', 'https://codepen.io/pen/', 'https://cdpn.io'];
    let corsOptions;
    let isDomainAllowed = whitelist.indexOf(req.header('Origin')) !== -1;

    if (isDomainAllowed) {
        corsOptions = { origin: true }
    } else {
        corsOptions = { origin: false }
    }
    callback(null, corsOptions)
}


module.exports = corsMidlleWare;