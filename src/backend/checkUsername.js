module.exports = (username, collection) => {
    const isCollection = require("./isCollection.js")
    if (typeof username === "string") {
        if (isCollection(collection)) {
            //Finish Alogorithm
        }
  //      else {
//            const errorMsg = "collection parameter needs to be assigned a collection object"
//            throw new TypeError(errorMsg)
//            }
    }
    else {
        const errorMsg = "username parameter needs to be assigned a string"
        const typeError = new TypeError(errorMsg)        
        throw typeError
    }
}