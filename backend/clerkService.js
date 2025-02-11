import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const fetchClerkUsers = async () => {
  try {
    const response = await axios.get("https://api.clerk.dev/v1/users", {
      headers: {
        Authorization: `Bearer ${process.env.CLERK_API_KEY}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching users from Clerk:", error);
    return null;
  }
};

export { fetchClerkUsers };
