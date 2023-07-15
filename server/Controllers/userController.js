module.exports = {
    register: async(req,res)=>{
        try {
            res.send('user register')
            
        } catch (error) {
            console.log(error)
            
        }
    }
    ,
    login: async(req,res)=>{
        try {
            res.send('login routes')
            
        } catch (error) {
            console.log(error)
            
        }
    }
}