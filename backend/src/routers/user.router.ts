import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import express from "express";
import bcrypt from "bcryptjs";

import { sample_users } from "../data";
import { User, UserModel } from "../models/user.model";
import { HTTP_STATUS } from "../constants/http_status";

const router = express.Router();

router.get(
   "/seed",
   asyncHandler(async (req, res) => {
      const userCount = await UserModel.countDocuments();
      if (userCount > 0) {
         res.send("Seed is already done!");
         return;
      }
      await UserModel.create(sample_users);
      res.send("Seed is done!");
   })
);

router.post(
   "/login",
   asyncHandler(async (req, res) => {
      const { email, password } = req.body;

      const user = await UserModel.findOne({ email });

      if (user && (await bcrypt.compare(password, user.password))) {
         res.send(generateTokenResponse(user));
      } else {
         res.status(HTTP_STATUS.UNAUTHORIZED).send("Invalid email or password");
      }
   })
);

router.post(
   "/register",
   asyncHandler(async (req, res) => {
      const { name, email, password, address } = req.body;

      const userExists = await UserModel.findOne({ email });

      if (userExists) {
         res.status(HTTP_STATUS.BAD_REQUEST).send("User already exists");
         return;
      }

      const hashedPassword = await bcrypt
         .genSalt(10)
         .then((salt) => bcrypt.hash(password, salt));

      const newUser: User = {
         id: "",
         name,
         email: email.toLowerCase(),
         password: hashedPassword,
         address,
         isAdmin: false,
      };

      const dbUser = await UserModel.create(newUser);

      res.send(generateTokenResponse(dbUser));
   })
);

const generateTokenResponse = (user: any) => {
   const token = jwt.sign(
      { email: user.email, isAdmin: user.isAdmin },
      "secretOfNav",
      { expiresIn: "30d" }
   );
   user = user.toObject();
   user.token = token;
   return user;
};

export default router;
