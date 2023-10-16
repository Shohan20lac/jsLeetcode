// PROBLEM 20
// Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.
// An input string is valid if:
// Open brackets must be closed by the same type of brackets.
// Open brackets must be closed in the correct order.
// Every close bracket has a corresponding open bracket of the same type.

// commentary: A very insightful exercise that gives a glimpse into how compilers are coded. Thank you for suggesting this one.

var isValid = function (s) {
    var validity             = true
    var openingBracesStack   = []
    var requiredClosingBrace = null

    let updateRequiredClosingBrace = (openingBracesStack) => {
        switch(openingBracesStack[openingBracesStack.length-1]){
            case "(": return ")"
            case "{": return "}"
            case "[": return "]"
            default: {
                console.error("this shouldn't happen")
                return null
            }
        }
    }

    let allBracketsClosed = () => 
        openingBracesStack.length == 0

    for (let char of s){

        switch(char){
            // case1: opening brace encountered
            case"(":
            case"{":
            case"[":
            {
                console.log("opening brace encountered", char)
                // add to openingBracesStack without thinking
                openingBracesStack.push(char)
                
                // update requiredClosingBrace
                requiredClosingBrace = updateRequiredClosingBrace(openingBracesStack)
                console.log("need closing brace", requiredClosingBrace)
                break
            }

            // case2: closing brace encountered
            case")":
            case"}":
            case"]":
            {
                console.log("closing brace encountered")
                
                // case2a: openingBracesStack is empty (no specific closing brace required) ILLEGAL AND INVALID
                if (openingBracesStack.length==0){
                    console.log("Error: Bracket closed without opening first")
                    validity = false
                }
                // case2b: else, specific closing brace required
                else {
                    if (requiredClosingBrace == char){
                        console.log("correct closing brace encountered")
                        
                        openingBracesStack.pop()                        
                        requiredClosingBrace = updateRequiredClosingBrace(openingBracesStack)
                    }
                    else {
                        console.log("error: wrong closing brace encountered")
                        validity = false
                    }
                }
                break
            }
            // case3: non-bracket encountered
            default: {
                break
            }
        }
    }

    return validity && allBracketsClosed()
}
