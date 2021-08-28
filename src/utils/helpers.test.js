const helpers = require("./helpers")
// @ponicode
describe("helpers.makeInitialBoard", () => {
    test("0", () => {
        let callFunction = () => {
            helpers.makeInitialBoard(10)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            helpers.makeInitialBoard(-1)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            helpers.makeInitialBoard(1)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            helpers.makeInitialBoard(0)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            helpers.makeInitialBoard(5)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            helpers.makeInitialBoard(-Infinity)
        }
    
        expect(callFunction).not.toThrow()
    })
})
