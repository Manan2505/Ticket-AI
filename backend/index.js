import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { serve } from "inngest/express";
import userRoutes from "./routes/user.js";
import ticketRoutes from "./routes/ticket.js";
import { inngest } from "./inngest/client.js";
import { onUserSignup } from "./inngest/functions/on-signup.js";
import { onTicketCreated } from "./inngest/functions/on-ticket-create.js";

import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes);
app.use("/api/tickets", ticketRoutes);

app.use(
  "/api/inngest",
  serve({
    client: inngest,
    functions: [onUserSignup, onTicketCreated],
  })
);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    
  })
  .catch((err) => console.error("MongoDB error: ", err));

  app.use('/',(req,res)=>{
    res.send("App running")
  })
app.post("/test-inngest", async (req, res) => {
  try {
    await inngest.send({
      name: "user/signup",
      data: {
        email: "testmanan@example.com",
      },
    });
    res.send("Test event sent to Inngest");
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to send Inngest event");
  }
});
// app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
export default app;
