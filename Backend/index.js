const express= require("express")
const app=express()
const path=require("path")

const Port=8000;
console.log(path.join(__dirname,'./public'));
stataicpath=path.join(__dirname,'./public');
app.use(express.static(stataicpath));
app.get('/2',(req,res)=>{
    res.sendFile(path.join(stataicpath,'index2.html'))

});

app.listen(Port,()=>{
    console.log(`listening to port ${Port}`)
});


function myMiddleware(req, res, next) {
    console.log('Middleware executed for this route');
    next(); // Pass control to the next middleware or route handler
  }
  
  // Apply middleware to a specific route
  app.get('/example', myMiddleware, (req, res) => {
    res.send('Hello from /example');
   
  });
  
  app.post('/submit', myMiddleware, (req, res) => {
    res.send('Data submitted');
  });