import express from 'express';
import connectDB from './lib/connectDB.js';
import userRouter from './routes/user.route.js';
import postRouter from './routes/post.route.js';
import commentRouter from './routes/comment.route.js';
import dotenv from 'dotenv';

dotenv.config();

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());

app.use("/users", userRouter);
app.use("/users", postRouter);
app.use("/users", commentRouter);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));