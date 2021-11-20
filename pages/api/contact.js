import { MongoClient } from "mongodb";

async function connectDatabase() {
  const client = await MongoClient.connect(process.env.MONGO_KEY);

  return client;
}

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { email, name, message } = req.body;

    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !message ||
      message.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input." });
    }

    const newMessage = {
      email,
      name,
      message,
    };

    let client;

    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({
        message: "Could not connect to the database.",
      });
    }

    const db = client.db();

    try {
      const result = await db.collection("messages").insertOne(newMessage);
    } catch (error) {
      client.close();

      res.status(500).json({
        message: "Storing message failed!",
      });
    }

    client.close();

    res
      .status(201)
      .json({ message: "Message stored successfully.", content: newMessage });
  }
};

export default handler;
