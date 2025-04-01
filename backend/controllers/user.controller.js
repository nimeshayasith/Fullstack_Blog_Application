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
