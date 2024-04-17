import express from "express";
import Hello from "./Hello.js";
import Lab5 from "./Lab5.js";
import CourseRoutes from "./Kanbas/courses/routes.js";
import ModuleRoutes from "./Kanbas/modules/routes.js";
import cors from "cors";
import mongoose from "mongoose";
import UserRoutes from "./Users/routes.js";
import "dotenv/config";
import session from "express-session";
import Test from "./Test.js";

const CONNECTION_STRING =
  process.env.DB_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kanbas";

mongoose.connect(CONNECTION_STRING);
const app = express();

app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  })
);

const sessionOptions = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
};

if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
  };
}

app.use(session(sessionOptions));

app.use(express.json());

Lab5(app);
Test(app);
Hello(app);
CourseRoutes(app);
ModuleRoutes(app);
UserRoutes(app);

app.listen(process.env.PORT || 4000);

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", process.env.FRONTEND_URL);
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
//   );
//   res.setHeader("Access-Control-Allow-Credentials", true);
//   res.setHeader("Access-Control-Allow-Private-Network", true);
//   res.setHeader("Access-Control-Max-Age", 7200);
//   next();
// });
