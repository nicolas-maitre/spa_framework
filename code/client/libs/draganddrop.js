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
     * Methode to build drag and drop
     * @param classListToDrop define elements where to drop moving element
     * @param classElementToDrag define elements are possible to move
     */
    this.buildDragAndDrop = function(classListToDrop, classElementToDrag){
        _this.addDrop(classListToDrop);
        _this.addDrag(classElementToDrag);
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
    this.addDrag = function(classToDrag){
        //add event dragstart to allow on element to drag and display where is dropped and add event to remove the effect
        Array.prototype.forEach.call(document.getElementsByClassName(classToDrag), function(elem){
            elem.classList.add("toDrag");
            elem.addEventListener("dragstart", function(event){
                event.dataTransfer.setData("0", 0);
                if(event.target.className.includes("toDrag")){
                    draggedElem = event.target;
                    draggedElem.classList.add("hovered");
                }
            });
            elem.addEventListener("dragend", function(event){
                draggedElem.classList.remove("hovered");
            });
        });
    }
    /**
     * Methode to remove possibility to drop
     */
    this.removeDrop = function(){
        Array.prototype.forEach.call(document.getElementsByClassName("toDrop"), function(elem){
            element.removeEventListener("dragover");
            element.removeEventListener("drop");
            elem.classList.remove("toDrop");
        });
    }
    /**
     * Methode to remove possibility to move
     */
    this.removeDrag = function(){
        Array.prototype.forEach.call(document.getElementsByClassName("toDrag"), function(elem){
            element.removeEventListener("dragstart");
            elem.classList.remove("toDrag");
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
$                if(elementToDrop.checkMouseIsTop()){
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