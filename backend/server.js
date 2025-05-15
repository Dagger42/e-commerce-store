import express from 'express'
import dotenv from 'dotenv'
import {connectDB} from './config/db.js'
import productRoutes from './routes/product.route.js'
import imageRoutes from './routes/image.check.route.js'

dotenv.config();
const app = express();

app.use(express.json()); // to parse JSON data from the request body

app.use("/api/products", productRoutes); // use the product routes for all requests to /api/products
app.use("/api/images", imageRoutes); // use the image routes for all requests to /api/images, checks if image is valid

console.log(process.env.MONGO_URI);  

app.listen(process.env.PORT, () => {
    connectDB();
    console.log("Server started at http://localhost:" + process.env.PORT);
})

//K6LN8UIrRNHW6BjO