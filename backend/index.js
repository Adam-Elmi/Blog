import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { MongoClient, ObjectId } from "mongodb";
import fs from "fs";
import MarkdownIt from "markdown-it";
import markdownItPrism from "markdown-it-prism";

dotenv.config();

const app = express();


app.use(cors());
const port = process.env.PORT || 3000;
const uri = process.env.URI;
const client = new MongoClient(uri);
const db = client.db("My-blog");

async function connectToDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(`Failed to connect: ${error}`);
  }
}

connectToDB();

const fileName = fileURLToPath(import.meta.url);
const dirname = path.dirname(fileName);
const inputFile = path.join(dirname, "..", "frontend", "public", "input.html");
const blogFile = path.join(dirname, "..", "frontend", "public", "blog.html");
console.log(inputFile, blogFile)
app.use(express.json());
app.use(express.static(path.join(dirname, "frontend", "public")));

const md = new MarkdownIt({ html: true, linkify: true }).use(markdownItPrism);

function getCurrentDate() {
  const today = new Date();
  return today.toLocaleDateString("en-GB");
}

app.get("/input-field", (req, res) => {
  res.sendFile(inputFile);
});

app.post("/publish", async (req, res) => {
  try {
    console.log("POST request received");
    const data = req.body;
    data.date = getCurrentDate();
    const { title, subtitle, text, date } = data;
    const collection = db.collection("blogs");
    await collection.insertOne({ title, subtitle, text, date });
    console.log("Received data:", data);
    res.json(data);
  } catch (error) {
    console.error(error);
  }
});

app.get("/blogs", async (req, res) => {
  try {
    const collection = db.collection("blogs");
    const data = await collection.find({}).toArray();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ error: "Failed to retrieve blog posts" });
  }
});

app.get("/blog/:id", async (req, res) => {
  try {
    const collection = db.collection("blogs");
    const blogId = req.params.id;
    const data = await collection.findOne({ _id: new ObjectId(blogId) });

    if (!data) {
      return res.status(404).json({ error: "Blog not found" });
    }

    const htmlTemplate = fs.readFileSync(path.join(dirname, "..", "frontend", "public", 'blog.html'), 'utf-8');

    function processCustomFeatures(text) {
      text = text.replace(/\/(.*?)\//g, '<span class="highlight">$1</span>');
      text = text.replace(/\[note\](.*?)\[\/note\]/g, '<div class="notice">$1</div>');
      return text;
    }

    const formattedText = md.render(processCustomFeatures(data.text));

    const htmlContent = htmlTemplate
      .replaceAll("{{title}}", data.title)
      .replace("{{subtitle}}", data.subtitle)
      .replace("{{text}}", formattedText)
      .replace("{{date}}", data.date);
      

    res.send(htmlContent);
  } catch (error) {
    console.error("Error fetching blog:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.listen(port, () => {
  console.log("Server is running at http://localhost:3000");
});
