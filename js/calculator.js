'use strict';

window.onload = function(){

// Get all the keys from document
var keys = document.querySelectorAll('#calculator span'),
    operators = ['+', '-', 'x', '÷'],
    decimalAdded = false,
    input = document.querySelector('.screen');

var isTouch = 'ontouchstart' in window;
var touchEvent = isTouch ? 'touchstart' : 'mousedown';

    for(var i = 0; i < keys.length; i++) {
        keys[i].addEventListener(touchEvent, bindClickEventHandler.bind(keys[i]));
    }

function bindClickEventHandler(evt) {
    
    var inputVal = input.textContent;
    var btnVal = this.textContent;
    
    if(btnVal == 'C'){
    	func_clear();
    }else if(btnVal == '=') {
    	func_equal(inputVal);
    }else if(operators.indexOf(btnVal) > -1) {
        func_operator(inputVal, btnVal);
    }else if(btnVal == '.') {
    	func_dot(btnVal);
    }else {
    	input.textContent += btnVal;
    }

    // prevent page jumps
	//evt.preventDefault();
};

var func_clear = function func_clear() {
    input.textContent = '';
    decimalAdded = false;
};

var func_equal = function func_equal(input_value) {
	var equation = input_value;
	var lastChar = equation[equation.length - 1];
			
	// Replace all instances of x and ÷ with * and / respectively. This can be done easily using regex and the 'g' tag which will replace all instances of the matched character/substring
	equation = equation.replace(/x/g, '*').replace(/÷/g, '/');
			
	// Final thing left to do is checking the last character of the equation. If it's an operator or a decimal, remove it
	if(operators.indexOf(lastChar) > -1 || lastChar == '.'){
		equation = equation.replace(/.$/, '');
	}
				
	if(equation){
		input.textContent = eval(equation);
	}

	decimalAdded = false;
};

var func_operator = function func_operator(input_value, btn_value) {
	// Operator is clicked
    // Get the last character from the equation
	var lastChar = input_value[input_value.length - 1];
			
	// Only add operator if input is not empty and there is no operator at the last
	if(input_value != '' && operators.indexOf(lastChar) == -1){
		input.textContent += btn_value;
	}
	// Allow minus if the string is empty
	else if(input_value == '' && btn_value == '-') {
		input.textContent += btn_value;
	}
			
	// Replace the last operator (if exists) with the newly pressed operator
	if(operators.indexOf(lastChar) > -1 && input_value.length > 1) {
		// Here, '.' matches any character while $ denotes the end of string, so anything (will be an operator in this case) at the end of string will get replaced by new operator
		input.textContent = input_value.replace(/.$/, btn_value);
	}
			
	decimalAdded =false;
};

var func_dot = function func_dot(btn_value) {
	if(!decimalAdded) {
		input.textContent += btn_value;
		decimalAdded = true;
	}
};
};

