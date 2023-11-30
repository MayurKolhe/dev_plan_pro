import OpenAI from "openai";

const OpenAi = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default OpenAi;
