
//add event dragover and drop on all list to move elements between us
Array.prototype.forEach.call(document.getElementsByClassName("quizzQuestionsContainer"), function(elem){
    elem.addEventListener("dragover", function(event){
        moveElem(draggedElem, event.target);
    }); 
    elem.addEventListener("drop", function(event){
        moveElem(draggedElem, event.target);
    });
});

//add event dragstart to allow on element to drag and display where is dropped and add event to remove the effect
Array.prototype.forEach.call(document.getElementsByClassName("droped"), function(elem){
    elem.addEventListener("dragstart", function(event){
        event.dataTransfer.setData("0", 0);
        if(event.target.className.includes("droped")){
            draggedElem = event.target;
            draggedElem.classList.add("hovered");
        }
    });
    elem.addEventListener("dragend", function(event){
        draggedElem.classList.remove("hovered");
    });
});