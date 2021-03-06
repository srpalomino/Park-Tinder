const chai = require("chai")
const expect = chai.expect
const chaiAsPromised = require('chai-as-promised')
const fs = require('fs')
const signup = require("../../../src/backend/signup.js")
const signupWithError = require('../../../src/backend/signupWithError.js')

//Database dependencies and data
const filename = require('path').resolve(__dirname, '../../../.dburl')
const url = fs.readFileSync(filename).toString()
const connect = require("../../../src/backend/helper-functions/dbPromises.js").connect
var db = null

//Configuring chai to use chai-as-promised
chai.use(chaiAsPromised)


const credentials = {username: "actual_username", password: "actual_password"}


describe("signup", () => {
    after((done) => {
        db.collection('Users').remove({username: "actual_username"})
        db.close()
        done()

    })
    it("throws an error when not passed a database object for db parameter", () => {
        const promise = signup(credentials, "Users")
        const errorMsg = "Need a database object to be passed for db parameter"
        return expect(promise).to.eventually.be.rejectedWith(errorMsg)
    })
    it("throws an error when not passed a string for collectionName parameter", () => {
        const promise = connect(url).then((database) => {
            db = database
            return signup(credentials, null, db)
        })
        const errorMsg = "Need a string to be passed for collectionName parameter"
        return expect(promise).to.eventually.be.rejectedWith(errorMsg)
    })
    it("throws an error when not passed an object containing username and password properties for credentials parameter", () => {
        const obj = {prop1: "", prop2: ""}
        const promise = signup(obj, "Users", db)
        const errorMsg = "Need an object containing username and password properties to be passed for credentials parameter"
        return expect(promise).to.eventually.be.rejectedWith(errorMsg)
    })
    it("returns object containing 'success' when a new account is successfully created", () => {
        const promise = signup(credentials, "Users", db)
        const expected = {result: 'success'}
        return expect(promise).to.eventually.deep.equal(expected)
    })
    it("returns object containing 'failure' when the user already has an account", () => {
        const promise = signup(credentials, "Users", db)
        const expected = {result: 'failure'}
        return expect(promise).to.eventually.deep.equal(expected)
    })  
    it("returns object containing 'error' when an error arises while checking that the user doesn't already have an account", () => {
        const promise = signupWithError(credentials, "Users", db)
        const expected = {result: 'error'}
        return expect(promise).to.eventually.deep.equal(expected)  
    })
})