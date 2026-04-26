import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();

app.use(cors());

const port = 8000;


app.listen(port,()=>{
    console.log("app is runng on the port"+port);
    
})

app.get("/",(req,res)=>{
    res.json({message:"the backend is running perfectly"})
})

app.get("/api/data",async (req,res)=>{
    try{
            const call = await axios.get("http://localhost:3000/movies")
            // console.log(call.data);
            
            res.send(call.data)
    }
    catch(error){
            console.log(error.message);
            res.status(404).send("404 Error Not Found")
    }
})
app.use(express.json())
app.patch("/api/edit/:id", async (req, res) => {
    const { id } = req.params;
    const body = req.body;
    console.log(req.body);
    

    try {
        const response = await axios.patch(`http://localhost:3000/movies/${id}`, body);
        console.log(`Movie ${id} successfully updated`);
        
        // Returning the updated data is helpful for front-end frameworks
        res.status(200).json(response.data); 
    } catch (error) {
        console.error("Update Error:", error.message);
        res.status(error.response?.status || 500).json({ 
            error: "Internal server error during update" 
        });
    }
});


app.use(express.json())
app.put("/api/edit/:id", async (req, res) => {
    const { id } = req.params;
    const body = req.body;
    console.log(req.body);
    

    try {
        const response = await axios.put(`http://localhost:3000/movies/${id}`, body);
        console.log(`Movie ${id} successfully updated`);
        
        // Returning the updated data is helpful for front-end frameworks
        res.status(200).json(response.data); 
    } catch (error) {
        console.error("Update Error:", error.message);
        res.status(error.response?.status || 500).json({ 
            error: "Internal server error during update" 
        });
    }
});