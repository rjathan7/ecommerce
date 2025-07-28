import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import Coupon from "../models/coupon.model.js";
import {stripe} from "../lib/stripe.js";

const router = express.Router();

router.post("/create-checkout-session", protectRoute, async (req, res) => {
    try {
        const {products, couponCode} = req.body;
        if (!Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ error: "Invalid or empty products array" });
        }

        let totalAmount = 0;
        const lineItems = products.map(product => {
            const amount = Math.round(product.price * 100) // stripe wants cents format => $10 * 100 = ¢1000
            totalAmount += amount * product.quantity;

            return {
                price_data:{
                    currency:"usd",
                    product_data: {
                        name: product.name,
                        image: [product.name],
                    },
                    unit_amount:amount
                }
            }
        });

        let coupon = null;
        if (couponCode) {
            coupon = await Coupon.findOne({code:couponCode, userId:req.user._id, isActive: true});
            if (coupon) {
                totalAmount -= Math.round(totalAmount * coupon.discountPercentage / 100);
            }
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types:["card",],
            line_items: lineItems,
            mode:"payment",
            success_url:"http://localhost:3000/purchase-success?session_id={CHECKOUT_SESSION_ID}",
            cancel_url:"http://localhost:3000/purchase-cancel",
        })

    } catch (error) {
        
    }
});

export default router;