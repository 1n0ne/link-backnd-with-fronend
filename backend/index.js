import bodyParser from 'body-parser';
import cors from 'cors';
import { dev } from './config/var.js';
import express from 'express';
import morgan from 'morgan';
import productRoute from './routes/productsRoute.js';

const app = express();
const port = dev.app.port || 3000;



app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));
app.use("/products", productRoute);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});


app.use((req, res, next) => {
  res.status(404).json({
    message: " route not found",
  });
});

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    message: error.message || "server error",
  });
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
