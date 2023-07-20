const fs = require('fs')
const path = require('path')

module.exports = {
    uploadImage: async (file, multi = false, typeOf) => {

        try {
            if (file.length === undefined) {
                let fileName = await uploadImageToDirectory(file, typeOf)
                return multi === true ? [fileName] : fileName
            } else {
                let arr = []
                for (let i = 0; i < file.length; i++) {
                    let newFileName = await uploadImageToDirectory(file[i])
                    arr.push(newFileName)
                }
                return arr;
            }
        } catch (error) {
            console.log(error)
            return 0
        }

    }
    
}
uploadImageToDirectory = (file, typeOf) => {
    console.log("====")

    if(typeOf === "product"){

        let fileName = Date.now() + path.extname(file.name)
        let pathName = path.join(appRoot, 'uploads', 'products', fileName)
    
        let = file.mv(pathName)
        return fileName;

    }
    else if(typeOf === "slider"){
        
        let fileName = Date.now() + path.extname(file.name)
        let pathName = path.join(appRoot, 'uploads', 'slider', fileName)
    
        let = file.mv(pathName)
        return fileName;

    }

}