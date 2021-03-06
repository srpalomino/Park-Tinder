/**
        The base function for signup() and signupWithError(). signupTemplate() implements the Template Pattern 
        using functions, where derived functions are created by wrapping signupTemplate() and passing it a callback. 
        This callback encapsulates the variant operation, which is the querying of the database. If no callback is 
        passed, then queryDatabase() is invoked by default. 
        
        signupTemplate() was created in order to derive signupWithError(), which simulates signup()'s
        handling of errors arising from queryDatabase().
    
            Arguments:
                A callback enscapsulating the variant operation (optional). Please visit signup.test.js for info on other
                arguments.
                
            Return values:
                Returns a promise whose fulfillment value is discussed in signup.test.js
**/

const queryDatabase = require("./queryDatabase.js")
const saltHashThePassword = require("./helper-functions/saltHashThePassword.js")
const isDbObj = require('./helper-functions/isDbObj.js')
const isCredentialObj = require('./helper-functions/isCredentialObj.js')



function signupTemplate (credentials, collectionName, db, callback) {
    return new Promise((resolve, reject) => {
        if (isCredentialObj(credentials) && typeof collectionName === 'string' && isDbObj(db)) {
            main(credentials, collectionName, db, callback, resolve, reject)
        }
        else if (isCredentialObj(credentials) === false) {
            const errorMsg = "Need an object containing username and password properties to be passed for credentials parameter"
            throw new TypeError(errorMsg)   
        }        
        else if (typeof collectionName !== 'string') {
            const errorMsg = "Need a string to be passed for collectionName parameter"
            throw new TypeError(errorMsg)
        }
        else {
            const errorMsg = "Need a database object to be passed for db parameter"
            throw new TypeError(errorMsg)
        }
    })
}



function main(credentials, collectionName, db, callback, resolve, reject) {
    function onFulfilled(result) {
        const success = {result: 'success'}
        const failure = {result: 'failure'}
        if (result === null) {
            const saltHashPassword = saltHashThePassword(credentials.password)
            credentials.password = saltHashPassword
            db.collection(collectionName).insert(credentials)
            resolve(success)
        }
        resolve(failure)
    }
    
    function onRejection(err) {
        resolve({result: 'error'})
    }
    
    const query = {username: credentials.username}
    if (callback === undefined) {
        return queryDatabase(query, collectionName, db).then(onFulfilled, onRejection)
    }
    else if (typeof callback !== 'function') {
        const errorMsg = "If you don't want signupTemplate to have default behavior, then a function must be passed for callback parameter"
        throw new TypeError(errorMsg)
    }
   callback(query, collectionName, db).then(onFulfilled, onRejection)
}


module.exports = signupTemplate
    