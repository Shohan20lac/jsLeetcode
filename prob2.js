// PROBLEM 2
// You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.
// You may assume the two numbers do not contain any leading zero, except the number 0 itself.

// commentary: 
// this one's more of a hack than I am proud of. 
// Instead of making middle-school-level arithmetic manipulations on the listnodes, I chose to just 
// convert the lists into integers, 
// perform the addition operation using the "+" operator, 
// and then return the reversed converted linked list.
// given more time, I'd be willing to try the middle school approach, though. 


function compose(...funcs) {
    return function (value) {
      return funcs.reduce((result, func) => func(result), value)
    }
}

function ListNode (val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}

const isListNode = (element) => 
    element !== null             
    && typeof element === 'object'
    && 'val'  in element
    && 'next' in element

const isArray = (element) => Array.isArray(element)

function convert (
    sourceType,
    targetType,
    inputElement
) {   
    const arrayToLinkedList = (arr) => {
        var head = new ListNode (arr[0], null)
        var current = head
    
        for (
            let i = 1;
            i < (arr.length);
            i++
        ){
            current.next = new ListNode (arr[i], null)
            current=current.next
        }
        return head
    }
    const linkedListToArray = (head) => {
        const result = []
        while (head !== null) {
            result.push(head.val)
            head = head.next
        }
        return result
    }
    const integerToArray = (integer) => {
        const digits = []
        let num = Math.abs(integer)
        while (num > 0) {
            const digit = num % 10
            digits.unshift(digit)
            num = Math.floor(num / 10)
        }
        return digits
    }
    const arrayToInteger = (arr) => {
        let string = 
            arr.reduce (
                (accString, digit) => {return accString + digit},
                ""
            )
        return parseInt(string)
    }
    const linkedListToInteger = compose (
        (inputElement) => linkedListToArray(inputElement),
        (inputElement) => arrayToInteger   (inputElement),
    )

    const integerToLinkedList = compose (
        (inputElement) => integerToArray (inputElement),
        (inputElement) => arrayToLinkedList   (inputElement),
    )


    switch (sourceType + " to " + targetType){
        case "linkedList to array": {
            // enforcing ListNode, just in case    
            if (!isListNode(inputElement)) {
                console.error("Input element lacks at least one essential property of ListNode. Aborting conversion...")
                break
            }
            
            console.log("Type check passed. Converting linked list to array...")
            return linkedListToArray(inputElement)
        }

        case "array to linkedlist": {
            // enforcing Array, just in case
            if (!isArray(inputElement)){
                console.error("Input element is not a JS array. Aborting conversion...")
                break
            }
            return arrayToLinkedList(inputElement)
        }
        
        case "integer to array":
            return integerToArray(inputElement)
        
        case "array to integer":
            return arrayToInteger(inputElement)
        
        case "linkedList to integer":
            return (linkedListToInteger(inputElement))
        
        case "integer to linkedList":
            return (integerToLinkedList(inputElement))
        
        default: {
            console.error("Conversion type not found. Typo, maybe?")
            break
        }
    }
}

function reverseLinkedList (head) {
    // case1: linked list has only one element
    if (head.next == null)
        return head
    
    // else, linked list has at least two elements
    current      = head
    next         = head.next
    secondNext   = next.next
    current.next = null

    while (secondNext != null){
        next.next  = current
        current    = next
        next       = secondNext
        secondNext = secondNext.next
    }

    next.next = current
    head      = next
    return head
}

function printList (listHead) {
    let current = listHead
    if (current===null) {
        console.log("Error: List is empty")
        return
    }

    while (current!=null){
        console.log(current.val)
        current = current.next
    }
}

var addTwoNumbers = function(l1, l2) {
    let integer1 = convert ("linkedList", "integer", l1)
    console.log(integer1)
    let integer2 = convert ("linkedList", "integer", l2)
    console.log(integer2)
    
    sum    = integer1 + integer2
    console.log(sum)

    result = convert ('integer', 'linkedList', sum)
    console.log(result)
    
    reversedResult = reverseLinkedList (result)

    return reversedResult
}