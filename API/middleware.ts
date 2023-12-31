import { jwt } from ".";
import { isNullOrEmpty } from "./metodos";
var secret = "secreto";

export function verifyUser(req: any, res: any, next: any) {
    try {
        if (isNullOrEmpty(req.headers['authorization'])) {
            res.status(400);
            res.send("Error. Falta auth header.")
        } else {
            try {
                if (req.headers['authorization'].split(' ')[0] == "Bearer") {
                    var token = req.headers['authorization'].split(' ')[1];
                    jwt.verify(token, secret);
                    next();
                } else {
                    res.status(400);
                    res.send("Error. Falta Bearer.");
                 }
            } catch (error) {
                res.status(401);
                res.send("Error. Token no válido.");
            }
        }
    } catch (error) {
        res.status(400);
        res.send("Error. Bad request.");
    }
}


export function decode(authheader: any) {
    var res = null
    try {
        res = jwt.verify(authheader.split(' ')[1], secret);
    } catch (error) {
        res = null;
    }
    return res;
}

export function sign(userid: any) {
    return jwt.sign({
        id: userid
    }, secret, { expiresIn: '1h' });
}
