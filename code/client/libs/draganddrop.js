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

"use strict"
var DragAndDrop = function(){
    var _this = this;
    var draggedElem;

    this.buildDragAndDrop = function(classListToDrop, classElementToDrag){
        this.addDrop(classListToDrop);
        this.addDrag(classElementToDrag);
    }
    this.addDrop = function(classToDrop){
        //add event dragover and drop on all list to move elements between us
        Array.prototype.forEach.call(document.getElementsByClassName(classToDrop), function(elem){
            elem.classList.add("toDrop");
            elem.addEventListener("dragover", function(event){
                this.moveElem(this.draggedElem, event.target);
            }); 
            elem.addEventListener("drop", function(event){
                this.moveElem(this.draggedElem, event.target);
            });
        });
    }
    this.addDrag = function(classToDrag){
        //add event dragstart to allow on element to drag and display where is dropped and add event to remove the effect
        Array.prototype.forEach.call(document.getElementsByClassName(classToDrag), function(elem){
            elem.classList.add("toDrag");
            elem.addEventListener("dragstart", function(event){
                event.dataTransfer.setData("0", 0);
                if(event.target.className.includes("toDrag")){
                    this.draggedElem = event.target;
                    this.draggedElem.classList.add("hovered");
                }
            });
            elem.addEventListener("dragend", function(event){
                this.draggedElem.classList.remove("hovered");
            });
        });
    }
    this.removeDrop = function(){
        Array.prototype.forEach.call(document.getElementsByClassName("toDrop"), function(elem){
            element.removeEventListener("dragover");
            element.removeEventListener("drop");
            elem.classList.remove("toDrop");
        });
    }
    this.removeDrag = function(){
        Array.prototype.forEach.call(document.getElementsByClassName("toDrag"), function(elem){
            element.removeEventListener("dragstart");
            elem.classList.remove("toDrag");
        });
    }
    //function to move element between list

    this.moveElem = function(elemToDrag, elementToDrop){
        while(!elementToDrop.parentNode.className.includes("toDrop")){
            elementToDrop = elementToDrop.parentNode;
        }
        if(elementToDrop.className.includes("toDrag")){
            if(elementToDrop != elemToDrag){
                if(elementToDrop.checkMouseIsTop())
                    addElemBefore(elemToDrag, elementToDrop);
            else elemToDrag.moveAfter(elementToDrop)
            }
        }else if(elementToDrop.className.includes("toDrop")){
            elementToDrop.appendChild(elemToDrag);
        }
    }
}