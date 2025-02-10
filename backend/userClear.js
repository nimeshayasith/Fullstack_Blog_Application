import userModel from "./models/user.model";


// Function to Fetch Users from Clerk
export const fetchClerkUsers = async () => {
  try {
    const response = await axios.get("https://api.clerk.com/v1/users", {
      headers: {
        Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
      },
    });

    const users = response.data;

    // Store users in MongoDB
    for (const user of users) {
      await userModel.findOneAndUpdate(
        { clerkId: user.id },
        {
          clerkId: user.id,
          email: user.email_addresses[0]?.email_address,
          firstName: user.first_name,
          lastName: user.last_name,
          createdAt: new Date(user.created_at),
        },
        { upsert: true, new: true }
      );
    }

    console.log("Users successfully stored in DB!");
  } catch (error) {
    console.error("Error fetching Clerk users:", error);
  }
};


