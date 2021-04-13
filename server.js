const express = require('express')
const app = express()



const uri = 'mongodb://Yashwant:Yashwant@cluster0-shard-00-00.xubvb.mongodb.net:27017,cluster0-shard-00-01.xubvb.mongodb.net:27017,cluster0-shard-00-02.xubvb.mongodb.net:27017/blog?ssl=true&replicaSet=atlas-o4dwpd-shard-0&authSource=admin&retryWrites=true&w=majority';
const mongoose = require('mongoose');
mongoose.connect(uri , { useNewUrlParser: true,  useUnifiedTopology: true , useCreateIndex : true, useFindAndModify : false }).then(response =>{
    console.log('Successfull');
}
).catch(err=>{
  console.log(err);
})
const Article = require('./models/article');

const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended : false }));
app.use(express.json())
app.set('view engine', 'ejs')




app.get('/', async (req,res)=>{

     const articles = await Article.find().sort({
       createdAT : 'desc'
     });
     res.render('articles/index' , { articles : articles });
    
})
app.use('/articles', articleRouter)



app.listen(process.env.PORT || 5000);