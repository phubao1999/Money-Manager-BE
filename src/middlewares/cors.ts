import { Request } from 'express';

export default function corsMidlleWare(req: Request, callback: Function) {
    const whitelist = ['http://localhost:4200', 'https://codepen.io/pen/', 'https://cdpn.io'];
    let corsOptions;
    const origin: string = req.get('origin') as string;
    let isDomainAllowed = whitelist.indexOf(origin) !== -1;

    if (isDomainAllowed) {
        corsOptions = { origin: true }
    } else {
        corsOptions = { origin: false }
    }
    callback(null, corsOptions)
}