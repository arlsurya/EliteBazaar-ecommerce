module.exports = {
    login: async(req,res)=>{
        try {
            res.send('login routes')
            
        } catch (error) {
            console.log(error)
            
        }
    }
}