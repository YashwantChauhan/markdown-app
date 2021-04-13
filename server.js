const express = require('express')
const app = express()

const articleRouter = require('./routes/articles')

const mongoose = require('mongoose')

const methodOverride = require('method-override')
app.use(methodOverride('_method'))

const Article = require('./models/article');
mongoose.connect('mongodb+srv://Yashwant:Yashwant@170301@cluster0.xubvb.mongodb.net/blog?retryWrites=true&w=majority' , { useNewUrlParser: true,  useUnifiedTopology: true , useCreateIndex : true, useFindAndModify : false } )


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

app.listen(5000);