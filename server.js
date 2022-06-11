import express from 'express';
import prisma from "./config/client.js";


const app = express();

app.use(express.json())

//Import routes
import usersRouter from './routes/user.routes.js';
import productRouter from './routes/product.routes.js';

//Route handling
app.use("/api",usersRouter);
app.use("/api",productRouter)


app.get("/user", async (req, res) => {
  const users = await prisma.user.findMany()
  res.json({
    success: true,
    payload: users,
    message: "Operation Successful",
  })

});



app.get("/", function (req, res) {
  res.send("Hello");
  res.status(200);
});

app.get("/hello", function (req, res) {
  res.send("hi");
  res.status(200);
});

app.use((req, res, next) => {
  res.status(404);
  return res.json({
    success: false,
    payload: null,
    message: `Endpoint not found for path: ${req.path}`,
  });
});


//listen on port 5000
app.listen(5000);
