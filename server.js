import express from 'express';
import prisma from "./config/client.js";
import cors from 'cors'
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json())
app.use(cors({
  //origin:"https://black-steel.heroku.app/login",
  origin:"http://localhost:3000",
  //origin:"https://black-steel.heroku.app",
  
  credentials:true
}))
app.set('trust proxy', 1);
app.use(cookieParser())
//Import routes
import usersRouter from './routes/user.routes.js';
import productRouter from './routes/product.routes.js';
import auth from './routes/auth.routes.js';
import cart from './routes/cart.routes.js'
import orders from './routes/order.routes.js';

//Route handling

app.use("/api",usersRouter);
app.use("/api",productRouter)
app.use('/auth',auth)
app.use('/api',cart)
app.use('/api',orders)


app.get("/user", async (req, res) => {
  const users = await prisma.user.findMany()
  res.json({
    success: true,
    payload: users,
    message: "Operation Successful",
  })

});


app.get("/", function (req, res) {
  res.send('Hello, go to besirevic.dev/hello to check out another endpoint');
  res.status(200);
});

app.get("/hello", function (req, res) {
  res.send("hi from different endpoint");
  res.status(200);
});

app.get("/test",function (req, res){
  res.send("This is a test for an endpoint");
  res.status(200);
})

app.use((req, res, next) => {
  res.status(404);
  return res.json({
    success: false,
    payload: null,
    message: `Endpoint not found for path: ${req.path}`,
  });
});


//listen on port 5000
console.log("app is up")
app.listen(5000);
