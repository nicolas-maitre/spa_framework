"use strict"
/**
 * Class DragAndDrop
 * Author : Bergmann Florian
 * Created at : 11.10.2019
 * Last updated : 
 * Dependencies :
 * - function checkMouseIsTop in utils.js
 * - function addElemBefore
 * - function addElemAfter
 */
var DragAndDrop = function(){
    var _this = this;
    var draggedElem;
    /**
     * Method to build drag and drop
     * @param classListToDrop define elements where to drop moving element
     * @param classElementToDrag define elements are possible to move
     * @param functionWhereDrop(element) function to execute when element is drop, 
     */
    this.buildDragAndDrop = function(classListToDrop, classElementToDrag, functionWhereDrop){
        _this.addDrop(classListToDrop);
        _this.addDrag(classElementToDrag, functionWhereDrop);
    }
    /**
     * Methode to add possibility to drop
     * @param classToDrop define elements where to drop moving element 
     */
    this.addDrop = function(classToDrop){
        //add event dragover and drop on all list to move elements between us
        Array.prototype.forEach.call(document.getElementsByClassName(classToDrop), function(elem){
            elem.classList.add("toDrop");
            elem.addEventListener("dragover", function(event){
                _this.moveElem(draggedElem, event.target);
            }); 
            elem.addEventListener("drop", function(event){
                _this.moveElem(draggedElem, event.target);
            });
        });
    }
    /**
     * Methode to add possibility to move
     * @param classToDrag define elements are possible to move
     */
    this.addDrag = function(classToDrag, callbackWhereDrop){
        //add event dragstart to allow on element to drag and display where is dropped and add event to remove the effect
        Array.prototype.forEach.call(document.getElementsByClassName(classToDrag), function(elem){
            if(!elem.classList.contains("toDrag")){
                elem.classList.add("toDrag");
                elem.setAttribute('draggable',  true);
                elem.addEventListener("dragstart", function(event){
                    event.dataTransfer.setData("0", 0);
                    if(event.target.className.includes("toDrag")){
                        draggedElem = event.target;
                        draggedElem.classList.add("hovered");
                    }
                });
                elem.addEventListener("dragend", function(event){
                    draggedElem.classList.remove("hovered");
                    callbackWhereDrop(event.target);
                });
            }
        });
    }
    /**
     * Methode to move an element
     * @param elemToDrag elem to move
     * @param elementToDrop elem where we pointing the elem to drop
     */
    this.moveElem = function(elemToDrag, elementToDrop){
        //move in parent DOM while the class granted to drop
        while(!elementToDrop.parentNode.className.includes("toDrop") && !elementToDrop.className.includes("toDrop")){
            elementToDrop = elementToDrop.parentNode;
            if(elementToDrop == document.body)return;
        }
        if(elementToDrop.className.includes("toDrag")){
            if(elementToDrop != elemToDrag){
                if(elementToDrop.checkMouseIsTop()){
                    elemToDrag.addElemBefore(elementToDrop);
                }else{ 
                    elemToDrag.addElemAfter(elementToDrop)
                }
            }
        }else if(elementToDrop.className.includes("toDrop")){
            elementToDrop.appendChild(elemToDrag);
        }
    }
}