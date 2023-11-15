import express from "express";
import 'dotenv/config'
import cors from "cors";
import OpenAI from "openai";

// create instance of openAI
const openai = new OpenAI();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  res.status(200).send({
    message: "Hello from CodeX",
  });
});

app.post("/", async (req, res) => {
  try {
    const prompt = req.body.prompt;

    // const response = await openai.createCompletion({
    //   model: "text-davinci-003",
    //   prompt: `${prompt}`,
    //   temperature: 0,
    //   max_tokens: 2000,
    //   top_p: 1,
    //   frequency_penalty: 0.5,
    //   presence_penalty: 0,
    // });
    const response = await openai.chat.completions.create({
      messages: [{ role: "user", content: `${prompt}` }],
      model: "gpt-3.5-turbo",
      n: 1,
      max_tokens: 100
    });
    // console.log(response.choices[0].message.content)

    res.status(200).send({
      bot: response.choices[0].message.content
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
});

app.listen(5000, () =>
  console.log("Server is running on port http://localhost:5000")
);
