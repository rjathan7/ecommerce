import express from "express";
import { getAllProducts, getFeaturedProducts, createProduct, deleteProduct, getRecommendedProducts } from "../controllers/product.controller.js";
import { protectRoute, adminRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// protectRoute and adminRoute are middleware
// user has to be authenticated and an admin before they can get all products
router.get("/", protectRoute, adminRoute, getAllProducts);
router.get("/featured", getFeaturedProducts);
router.get("/recommendations", getRecommendedProducts);
router.post("/", protectRoute, adminRoute, createProduct);
router.delete("/:id", protectRoute, adminRoute, deleteProduct);

export default router;