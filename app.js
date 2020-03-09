const express    = require('express'),
      fs         = require('fs'),
      bodyParser = require('body-parser');

const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(`${__dirname}/public`))

app.get('/', (req,res)=>{
  res.redirect("/blog")
})
app.get('/blog', (req,res)=>{
  fs.readFile('./blogs.json', 'utf8', (err,data)=>{
    if(err){
      console.log(err)
    }else{
      let blogs =JSON.parse(data)
      res.render("blog",{blogs:blogs})
    }
  })
})
app.get('/blog/new',(req,res)=>{
  res.render("new")
})
app.post('/blog', (req,res)=>{
  fs.readFile('./blogs.json','utf8', (err, data)=>{
    if(err){
      console.log(err)
    }else{
      data=JSON.parse(data);
      data.push({title:req.body.title, image:req.body.image, text:req.body.text})
      data =JSON.stringify(data)
      fs.writeFile('./blogs.json', data,(err)=>{
        if(err){
          console.log(err)
        }else{
          res.redirect('/blog')
        }
      });
    }
  });
});
app.get('/blog/delete/:id', (req,res)=>{
  fs.readFile('./blogs.json', 'utf8',(err,data)=>{
    if(err){
      console.log(err)
    }else{
      data= JSON.parse(data);
      data = data.filter((item,idx)=>{
        if(idx!=req.params.id){
          return item
        }
      });
      data = JSON.stringify(data)
      fs.writeFile('./blogs.json', data,(err)=>{
        if(err){
          console.log(err)
        }else{
          res.redirect('/blog')
        }
      })
    }
  })
})
app.listen(3000, ()=>{
  console.log("servert is started")
});
