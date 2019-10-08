//function to move element between list
function moveElem(elemToDrag, element){
    while(!element.parentNode.className.includes("quizzQuestionsContainer")){
        element = element.parentNode;
    }
    if(element.className.includes("droped")){
        if(element != elemToDrag){
            if(checkMouseIsTop(element))addBefore(elemToDrag, element);
        else addAfter(elemToDrag, element);
        }
    }else if(element.className.includes("quizzQuestionsContainer")){
        element.appendChild(elemToDrag);
    }
}

//function to check if mouse is in half top of element
function checkMouseIsTop(elemToCheck){
    var heightToCheck = elemToCheck.offsetTop + (elemToCheck.offsetHeight / 2);
    if(event.clientY < heightToCheck)return true;
    else return false;
}

//function to add new element before elem
function addBefore(newElem, elem){
    elem.parentNode.insertBefore(newElem, elem);
}

//function to add new element after before
function addAfter(newElem, elem){
    elem.parentNode.insertBefore(newElem, elem.nextSibling);
}