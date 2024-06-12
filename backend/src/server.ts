import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from 'path';

import foodRouter from "./routers/food.router";
import userRouter from "./routers/user.router";
import orderRouter from "./routers/order.router";
import { dbConnect } from "./configs/database.config";

const app = express();
app.use(express.json());

dotenv.config({ path: path.resolve(__dirname, '../.env') });
dbConnect();

app.use(
   cors({
      credentials: true,
      origin: ["http://localhost:4200"],
   })
);

app.use("/api/foods", foodRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);

const port = 5000;

app.listen(port, () => {
   console.log(`Server is running on port ${port}`);
});
