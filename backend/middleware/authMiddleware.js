import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  console.error(
    "FATAL ERROR: JWT_SECRET is not defined in environment variables."
  );
}

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization; // Bearer token

  if (!authHeader)
    return res.status(401).json({ message: "Unauthorized: No token provided" });

  const token = authHeader.split(" ")[1];
  if (!token)
    return res.status(401).json({ message: "Unauthorized: Invalid token" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // attach user info to request
    next();
  } catch (err) {
    console.error("JWT verification failed:", err.message);
    res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};
