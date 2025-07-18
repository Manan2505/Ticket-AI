import { Inngest } from "inngest";
console.log("Inngest Event Key:", process.env.INNGEST_EVENT_KEY);

export const inngest = new Inngest({
  id: "ticketing-system", // can be anything unique
  eventKey: process.env.INNGEST_EVENT_KEY, // ✅ THIS LINE IS REQUIRED
});