console.log("Hello Express");
import express from "express";
import type { Express, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
/*import { PrismaClient } from "@prisma/client";
import cors from "cors";*/

const app: Express = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());
const prisma = new PrismaClient();


app.get("/allTodos", async (req: Request, res: Response) => {
  const allTodos = await prisma.todo.findMany();
  return res.send(allTodos);
});

app.post("/createTodos", async (req: Request, res: Response) => {
  

  try{
    console.log("req.body"+JSON.stringify(req.body));
    const { title, isCompleted } = req.body;
    const createTodo = await prisma.todo.create({
      data: {
        title,
        isCompleted,
      },
    });
    console.log("createTodo Completed!!");
    return res.json(createTodo);
  }catch(e){
    console.log(e);
    console.log("createTodo Error:"+e);
    return res.status(400).json(e);
  }
  
});

app.put("/editTodos/:id", async (req: Request, res: Response) => {
  

  try{
    const id = Number(req.params.id);
    console.log("req.body"+JSON.stringify(req.body));
    const { title, isCompleted } = req.body;
    const updateTodo = await prisma.todo.update({
      where: { id },
      data: {
        title,
        isCompleted,
      },
    });
    return res.json(updateTodo);
  }catch(e){
    console.log(e);
    return res.status(400).json(e);
  }
  
});

app.delete("/deleteTodos/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    console.log(`deleteTodos/{$id}`);
    const deleteTodo = await prisma.todo.delete({
      where: { id },
    });
    return res.json(deleteTodo);
  }catch (e) {
    return res.status(400).json(e);
  }
});


/*app.post("/createTodo", async (req: Request, res: Response) => {
  try {
    const { title, isCompleted } = req.body;
    const createTodo = await prisma.todo.create({
      data: {
        title,
        isCompleted,
      },
    });
    return res.json(createTodo);
  } catch (e) {
    return res.status(400).json(e);
  }
});

app.put("/editTodo/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { title, isCompleted } = req.body;
    const editTodo = await prisma.todo.update({
      where: { id },
      data: {
        title,
        isCompleted,
      },
    });
    return res.json(editTodo);
  } catch (e) {
    return res.status(400).json(e);
  }
});

app.delete("/deleteTodo/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const deleteTodo = await prisma.todo.delete({
      where: { id },
    });
    return res.json(deleteTodo);
  } catch (e) {
    return res.status(400).json(e);
  }
});
*/
app.listen(PORT, () => console.log("server is running🚀"));
