import express from 'express';
import dotenv from 'dotenv';
import router from './routes';

dotenv.config();

const app = express();
app.use(express.json());
app.use(router);
const port = process.env.PORT || 3000;

app.listen(port, () => {
   console.log(`服务器运行在 http://localhost:${port} 运行中`);
});
