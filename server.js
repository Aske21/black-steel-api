import Prisma from '@prisma/client';
import express from 'express';
const { PrismaClient } = Prisma;



const prisma = new PrismaClient()

const app = express();

app.use(express.json())

app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany()
  res.json({
    success: true,
    payload: users,
    message: "Operation Successful",
  })

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
