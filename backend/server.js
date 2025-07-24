import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// routes
import authRoutes from "./routes/auth.route.js";
import productRoutes from "./routes/product.route.js";

import { connectDB } from "./lib/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()) // allows to parse the body of the request
app.use(cookieParser()); // adds middlware which parses cookies from incoming HTTP requests

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

app.listen(PORT, () => {
    console.log("Server is running on port http://localhost:" + PORT);
    connectDB();
})
