import express from "express";
import { requireAuth } from "@clerk/express"; 
import { getUserSavedPosts, savePost, syncClerkUsers } from "../controllers/user.controller.js";

const router = express.Router();

// 🔹 Protect routes with Clerk authentication
router.get("/saved", requireAuth(), getUserSavedPosts);
router.patch("/save", requireAuth(), savePost);
router.get("/sync-clerk-users", syncClerkUsers);

export default router;
