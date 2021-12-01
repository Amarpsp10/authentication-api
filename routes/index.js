module.exports = (app) =>{
    app.get('/api/bahi',(req,res)=>{
        return res.json({status:"hello bahi"})
    })
}