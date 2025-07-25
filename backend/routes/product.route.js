import express from "express";
import { getAllProducts, getFeaturedProducts } from "../controllers/product.controller.js";
import { protectRoute, adminRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// protectRoute and adminRoute are middleware
// user has to be authenticated and an admin before they can get all products
router.get("/", protectRoute, adminRoute, getAllProducts);
router.get("/featured", getFeaturedProducts);

export default router;