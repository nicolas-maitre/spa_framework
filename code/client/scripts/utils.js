//_PROTOTYPES_METHODS_
//create an child element to a dom element, you can specify a class name
Element.prototype.addElement = function(type, className, options){
	var newElement = document.createElement(type); //create
	this.appendChild(newElement); //append to parent
	if(typeof className === 'string'){
		newElement.setAttribute('class', className); //set class name
	}
	return newElement;
}

var utils = {};
utils.getGlobalLoader = function(){
	if(!elements.globalLoader){
		elements.globalLoader = {};
		elements.globalLoader.container = document.body.addElement("div", "globalLoaderContainer none");
		elements.globalLoader.loader = elements.globalLoader.container.addElement("div", "globalLoaderImage");
		
		elements.globalLoader.show = function(){
			console.log("show global loader");
			elements.globalLoader.container.classList.remove("none");
			requestAnimationFrame(function(){
				elements.globalLoader.container.style.opacity = 1;
			});
		}
		elements.globalLoader.hide = function(){
			console.log("hide global loader");
			requestAnimationFrame(function(){
				elements.globalLoader.container.style.opacity = 0;
				setTimeout(function(){
					elements.globalLoader.container.classList.add("none");
				}, 200);
			});
		}
	}
	return elements.globalLoader;
};
utils.infoBox = function(message, time = 5000){
	var infoBox = document.body.addElement("div", "infoMessageBox");
	infoBox.innerText = message;
	requestAnimationFrame(function(){
		infoBox.style.opacity = 1;
		setTimeout(function(){
			infoBox.style.opacity = 0;
			setTimeout(function(){
				infoBox.remove();
			}, 0.5 * 1000);
		}, time);
	});
	return infoBox;
}

/**
 * function to check if mouse is in half top of element
 * @returns true or false 
 */
Element.prototype.checkMouseIsTop = function(){
	var heightToCheck = this.offsetTop + (this.offsetHeight / 2);
	if(event.clientY < heightToCheck)
		return true;
	return false;
}
function checkMouseIsTop(elemToCheck){
	var heightToCheck = elemToCheck.offsetTop + (elemToCheck.offsetHeight / 2);
	if(event.clientY < heightToCheck)
		return true;
	return false;
}

/**
 * function to add Element before ref
 * @param {DOM element} ref
 */
Element.prototype.addElemBefore = function(ref){
	this.parentNode.insertBefore(this, ref);
}

/**
 * function to add Element after ref
 * @param {DOM element} ref
 */
Element.prototype.moveAfter = function(ref){
	this.parentNode.insertBefore(this, ref.nextSibling);
}