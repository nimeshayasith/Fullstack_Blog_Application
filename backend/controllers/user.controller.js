import { fetchClerkUsers } from "../clerkService.js";
import User from "../models/user.model.js";

export const getUserSavedPosts = async (req, res) => {
  try {
    const clerkUserId = req.auth?.userId;

    if (!clerkUserId) {
      return res.status(401).json({ error: "Not authenticated!" });
    }

    const user = await User.findOne({ clerkUserId });

    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }

    res.status(200).json({ savedPosts: user.savedPosts });
  } catch (error) {
    console.error("Error fetching saved posts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const savePost = async (req, res) => {
  try {
    const clerkUserId = req.auth?.userId;
    const postId = req.body.postId;

    if (!clerkUserId) {
      return res.status(401).json({ error: "Not authenticated!" });
    }

    const user = await User.findOne({ clerkUserId });

    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }

    const isSaved = user.savedPosts.includes(postId);

    if (!isSaved) {
      user.savedPosts.push(postId);
    } else {
      user.savedPosts = user.savedPosts.filter((p) => p !== postId);
    }

    await user.save();

    res.status(200).json({ message: isSaved ? "Post unsaved" : "Post saved" });
  } catch (error) {
    console.error("Error saving post:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export const syncClerkUsers = async (req, res) => {
  try {
    const clerkUsers = await fetchClerkUsers();
    console.log(clerkUsers);

    for (const clerkUser of clerkUsers) {
      const existingUser = await User.findOne({ clerkUserId: clerkUser.id });

      if (!existingUser) {
        const newUser = new User({
          clerkUserId: clerkUser.id,
          username: clerkUser.username || clerkUser.first_name,
          email: clerkUser.email_addresses[0]?.email_address,
          img: clerkUser.image_url,
        });

        await newUser.save();
      }
    }

    res.status(200).json({ message: "Users synced successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error syncing users" });
  }
};