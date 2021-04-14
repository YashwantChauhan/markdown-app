const express = require('express')
const router = express.Router()
const Article = require('./../models/article')


router.get('/new', (req,res)=>{
    res.render('articles/new' , { articles : new Article() });
})

router.get('/:slug', async (req,res)=>{
    const article = await Article.findOne({
        slug : req.params.slug 
    });
    if( article == null ){
        res.redirect('/')
    }
    res.render('articles/show', { article : article });
})

router.post('/', async (req,res)=>{

    let article = new Article({
        title : req.body.title,
        description : req.body.desc,
        markdown : req.body.mark

    })

    

    try{

      article = await article.save()
      console.log(article.id);
      res.redirect(`/articles/${article.slug}`); 

    }
    catch(e){
        

        res.render('articles/new' , { articles : article })
    }
    
})



router.delete('/:id' , async (req,res)=>{
    await Article.findByIdAndDelete(req.params.id);
    res.redirect('/');
})


router.get('/edit/:id', async (req,res)=>{
    
    const articles = await Article.findById(req.params.id);
    res.render('articles/edit', { 'articles' : articles } )

})

router.post('/edit/:id', async (req,res)=>{
    
    let article = await Article.findById(req.params.id);
     

    article.title = req.body.title
    article.description = req.body.desc,
    article.markdown = req.body.mark

    try{

        article = await article.save()
        res.redirect(`/articles/${article.slug}`); 
  
      }
      catch(e){
          res.render(`articles/edit` , { articles : article })
      }

})
module.exports = router