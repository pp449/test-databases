import express, { Express, Request, Response } from "express";
import User from "./models/User";
import { faker } from "@faker-js/faker";
import "./db";

const app: Express = express();
const port = 9000;

app.get("/", (req: Request, res: Response) => {
  res.send("Typescript + Nodejs + Express Server");
});

let number = 0;

app.get("/addData", (req: Request, res: Response) => {
  const username = `user${number}`;
  const newUser = new User({ name: username, age: number++ });
  newUser.save().catch((error: Error) => {
    console.error("Error saving user", error);
  });
  res.json("유저만들기 성공!");
});

const getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    console.error("Error fetching users");
  }
};

app.get("/showData", async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error fetching users");
  }
});

app.get("/showDataNum", async (req: Request, res: Response) => {
  try {
    const userCount = await User.countDocuments({});
    res.json(userCount);
  } catch (error) {
    console.error("Error retrieving user count:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`[server]: Server is running at ${port}`);
});
