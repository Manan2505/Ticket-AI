import { Inngest } from "inngest";

export const inngest = new Inngest({
  id: "ticketing-system", // can be anything unique
  eventKey: process.env.INNGEST_EVENT_KEY, // ✅ THIS LINE IS REQUIRED
});