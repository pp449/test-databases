import express, { Express, Request, Response } from "express";
import User from "./models/User";
import { faker } from "@faker-js/faker";

const app: Express = express();
const port = 9000;

app.get("/", (req: Request, res: Response) => {
  res.send("Typescript + Nodejs + Express Server");
});

app.get("/addUser", (req: Request, res: Response) => {
  const randomName = faker.internet.userName();
  const randomAge = faker.number.int();
  const newUser = new User({ name: randomName, age: randomAge });
  newUser.save().catch((error: Error) => {
    console.error("Error saving user", error);
  });
});

const getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    console.error("Error fetching users");
  }
};

app.get("/showUser", (req: Request, res: Response) => {
  getAllUsers()
    .then((users) => {
      console.log("All users:", users);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

app.listen(port, () => {
  console.log(`[server]: Server is running at ${port}`);
});
