import express from "express";
import cors from "cors";

const PORT = process.env.PORT || 8080;

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "It works" });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
