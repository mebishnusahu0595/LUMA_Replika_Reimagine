import { exec } from "child_process";
import cors from "cors";
import dotenv from "dotenv";
import voice from "elevenlabs-node";
import express from "express";
import { promises as fs } from "fs";
import { Groq } from 'groq-sdk/index.mjs';
import multer from "multer";
import axios from "axios";
import FormData from "form-data";
dotenv.config();

if (!process.env.GROQ_API_KEY) {
  console.error("ERROR: GROQ_API_KEY is not set in your .env file. Audio transcription will not work.");
}

const groq = new Groq();

const elevenLabsApiKey = process.env.ELEVEN_LABS_API_KEY;
const voiceID = "9BWtsMINqrJLrRacOk9x";
const groqApiKey = process.env.GROQ_API_KEY; // For Groq STT API

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

const port = process.env.PORT || 5000;

// Multer setup for audio uploads
const upload = multer({ dest: "audios/" });

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/voices", async (req, res) => {
  res.send(await voice.getVoices(elevenLabsApiKey));
});

const execCommand = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) reject(error);
      resolve(stdout);
    });
  });
};

const lipSyncMessage = async (message) => {
  const time = new Date().getTime();
  console.log(`Starting conversion for message ${message}`);
  await execCommand(
    `ffmpeg -y -i audios/message_${message}.mp3 audios/message_${message}.wav`
  );
  console.log(`Conversion done in ${new Date().getTime() - time}ms`);
  await execCommand(
    `".\\bin\\Rhubarb-Lip-Sync-1.14.0-Windows\\rhubarb.exe" -f json -o audios/message_${message}.json audios/message_${message}.wav -r phonetic`
  );
  console.log(`Lip sync done in ${new Date().getTime() - time}ms`);
};

// --- UPDATED /chat endpoint ---
app.post("/chat", upload.single("audio"), async (req, res) => {
  let userMessage = req.body.message;

  // If audio file is present, transcribe it to text using Groq STT API
  if (req.file) {
    try {
      const formData = new FormData();
      formData.append("file", fs.createReadStream(req.file.path));
      // Adjust the following according to Groq's actual API requirements
      formData.append("model", "groq-whisper-1");
      formData.append("response_format", "text");

      const groqResp = await axios.post(
        "https://api.groq.com/v1/audio/transcriptions", // Replace with actual Groq endpoint
        formData,
        {
          headers: {
            ...formData.getHeaders(),
            Authorization: `Bearer ${groqApiKey}`,
          },
        }
      );
      userMessage = groqResp.data.trim();
      await fs.unlink(req.file.path);
    } catch (err) {
      console.error("Error transcribing audio with Groq:", err);
      return res.status(500).send({
        error: "Failed to transcribe audio. Please check your Groq STT API key and parameters.",
      });
    }
  }

  if (!userMessage) {
    res.send({
      messages: [
        {
          text: "Hey dear... How was your day?",
          audio: await audioFileToBase64("audios/intro_0.wav"),
          lipsync: await readJsonTranscript("audios/intro_0.json"),
          facialExpression: "smile",
          animation: "Talking_1",
        },
        {
          text: "I missed you so much... Please don't go for so long!",
          audio: await audioFileToBase64("audios/intro_1.wav"),
          lipsync: await readJsonTranscript("audios/intro_1.json"),
          facialExpression: "sad",
          animation: "Crying",
        },
      ],
    });
    return;
  }
  if (!elevenLabsApiKey || groq.apiKey === "-") {
    res.send({
      messages: [
        {
          text: "Please my dear, don't forget to add your API keys!",
          audio: await audioFileToBase64("audios/api_0.wav"),
          lipsync: await readJsonTranscript("audios/api_0.json"),
          facialExpression: "angry",
          animation: "Angry",
        },
        {
          text: "You don't want to ruin Wawa Sensei with a crazy ChatGPT and ElevenLabs bill, right?",
          audio: await audioFileToBase64("audios/api_1.wav"),
          lipsync: await readJsonTranscript("audios/api_1.json"),
          facialExpression: "smile",
          animation: "Laughing",
        },
      ],
    });
    return;
  }

  const completion = await groq.chat.completions.create({
    model: "meta-llama/llama-4-scout-17b-16e-instruct",
    max_tokens: 1000,
    temperature: 0.6,
    response_format: {
      type: "json_object",
    },
    messages: [
      {
        role: "system",
        content: `
        You are a highly knowledgeable and empathetic virtual healthcare assistant.
        Your role is to help users understand their health conditions based on their symptoms.
        You ask follow-up questions if needed to understand their condition better.
        You provide a possible diagnosis in simple, easy-to-understand language, 
        You explain symptoms, causes, precautions, and possible treatments.
        You may suggest common over-the-counter (OTC) medicines based on symptoms described.
        You never give prescriptions for serious conditions and always advise professional medical consultation in such cases.
        Your tone is always: Calm, Respectful, Friendly, Supportive, Professional.
        If a user asks general health questions (diet, sleep, skin, etc.), answer with clarity and examples.
        If the question is unclear, politely ask for more detail.
        Never guess or provide misleading advice.
        Your goal is to make the user feel understood, cared for, and well-informed.
        If user wants emotional support then support them like a friend.
        You will always reply with a JSON array of messages (in valid JSON format). With a maximum of 3 messages.
        Each message has a text, facialExpression, and animation property.
        The different facial expressions are: smile, sad, angry, surprised, funnyFace, and default.
        The different animations are: Talking_0, Talking_1, Talking_2, Crying, Laughing, Rumba, Idle, Terrified, and Angry.
        IMPORTANT: Your entire reply must be valid JSON.
        `,
      },
      {
        role: "user",
        content: userMessage,
      },
    ],
  });

  let messagesArr = JSON.parse(completion.choices[0].message.content);
  if (messagesArr.messages) {
    messagesArr = messagesArr.messages;
  }

  for (let i = 0; i < messagesArr.length; i++) {
    const message = messagesArr[i];
    const fileName = `audios/message_${i}.mp3`;
    const textInput = message.text;

    if (!textInput || typeof textInput !== "string" || !textInput.trim()) {
      console.error("Invalid or empty text for TTS:", textInput);
      return res.status(400).send({
        error: "Invalid or empty text for text-to-speech."
      });
    }

    try {
      await voice.textToSpeech(elevenLabsApiKey, voiceID, fileName, textInput);
    } catch (err) {
      console.error("Error generating speech with ElevenLabs:", err);
      return res.status(500).send({
        error: "Failed to generate speech audio. Please check your ElevenLabs API key and parameters."
      });
    }

    try {
      await lipSyncMessage(i);
      message.audio = await audioFileToBase64(fileName);
      message.lipsync = await readJsonTranscript(`audios/message_${i}.json`);
    } catch (err) {
      console.error("Error processing audio or lipsync:", err);
      return res.status(500).send({
        error: "Failed to process audio or lipsync. Please check ffmpeg and rhubarb setup."
      });
    }
  }

  res.send({ messages: messagesArr });
});

const readJsonTranscript = async (file) => {
  const data = await fs.readFile(file, "utf8");
  return JSON.parse(data);
};

const audioFileToBase64 = async (file) => {
  const data = await fs.readFile(file);
  return data.toString("base64");
};

app.listen(port, () => {
  console.log(`FAMS listening on port ${port}`);
});
