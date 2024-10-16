import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const secretKey = process.env.SECRET_KEY || "";
export function checkRole(roles) {
    return function (req, res, next) {
        var _a;
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!token) {
            return res
                .status(401)
                .json({ error: "Unauthorized. No token provided." });
        }
        try {
            const decodedToken = jwt.verify(token, secretKey);
            if (!roles.includes(decodedToken.role)) {
                return res
                    .status(403)
                    .json({
                    error: "Access forbidden. User does't have the required role",
                });
            }
        }
        catch (_b) {
            return res
                .status(403)
                .json({ error: "Access forbidden. Invalid or expired token." });
        }
        next();
    };
}
