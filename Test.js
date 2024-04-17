import mongoose from "mongoose";

export default function Test(app) {
  app.get("/test", async (req, res) => {
    try {
      const users = await mongoose.model("UserModel").find(); // Async call to fetch data
      var response = {
        "MongoDB Connection Status Code": mongoose.connection.readyState,
        "MongoDB Connection Status Message":
          mongoose.STATES[mongoose.connection.readyState],
        "Users Collections": users, // Use fetched data here
      };

      res.send("Mongoose connection status: " + JSON.stringify(response));
    } catch (error) {
      res.status(500).send("Failed to retrieve data: " + error.message);
    }
  });
}
