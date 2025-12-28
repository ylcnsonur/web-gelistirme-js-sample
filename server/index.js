import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const API_BASE = "https://apihero-api.quixtools.com/api/v1";


app.post("/api/todos", async (req, res) => {
    try {
        const { data } = await axios.post(`${API_BASE}/todo/getTodos`, {
            "isLite": false,
            "pager": {
                "page": 1,
                "size": 10
            }
        });
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: "Todos alınamadı" });
    }
});

app.get("/api/todos/:id", async (req, res) => {
    try {
        const { data } = await axios.get(
            `${API_BASE}/todo/getTodo/${req.params.id}`
        );
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: "Todo bulunamadı" });
    }
});

app.post("/api/addtodo", async (req, res) => {
    try {
        const { data } = await axios.post(
            `${API_BASE}/todo/addTodo`,
            req.body
        );
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: "Todo eklenemedi" });
    }
});

app.put("/api/todos/:id", async (req, res) => {
    try {
        const { data } = await axios.put(
            `${API_BASE}/todo/updateTodo/${req.params.id}`,
            req.body
        );
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: "Todo güncellenemedi" });
    }
});

app.delete("/api/todos/:id", async (req, res) => {
    try {
        const { data } = await axios.delete(
            `${API_BASE}/todo/deleteTodo/${req.params.id}`
        );
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: "Todo silinemedi" });
    }
});

app.listen(3000, () => {
    console.log("🚀 Proxy server running on http://localhost:3000");
});
