// Trace Smith //

// Markup Language to HTML //

// Strong: ^% = Opening; ^!% = Closing
// Emphasis: ^~ = Opening; ^!~ = Closing

// Examples:
// ^~ Greetings ^% Earthling. ^!% ^!~  ->>> <EM>Greetings <STRONG>Earthlings</STRONG></EM>.
// ^~ Greetings ^% Earthling. ^!~ How are you? ^!% ->>> <EM>Greetings <STRONG>Earthling.</EM>How are you?</STRONG>
// Greetings ^% from ^~Glornix ^!% Beta-Nine ^!~ ->>> Greetings <STRONG>from <EM>Glorinx</EM></STRONG> <EM>Beta-Nine</EM>.


//My Code:
var AMLTranslator = (function() {
	AMLTranslator = {}; //new Obj.
	AMLTranslator.translate = function(message){

    	var AML = message; //input AML
		var HTML = []; //Push elements of the string onto the HTML array
		var elem = ""; //Empty string element 

		//Assigning either true/false to identify whether a tag is open/closed
		var EM = true; //When EM is true, the EM tag is open (vise versa if false)
		var STR = true; //When STR is true, the STRONG tag is open (vise versa if false)

		for (var i = 0; i < AML.length; i++) { //iterating through each character of the AML message
			//Checking which condition is satisfied when "i" encounters opening/closing features of AML:
			
			if (AML.substring(i,i+2) === "^~") { //If substring of the AML message is equal to value/type of EM opening tag
				HTML.push(elem,'<EM>'); //push the concatenated text element(i.e. Line 91) followed by the opening EM tag onto the HTML array
				EM = true; //reset EM to true; emphasis (EM) tag is open
				elem = ""; //reset the string element to empty for the next set of text and chars(i.e. ;,!? etc...)
				i+=1; //begin iterating pass "^~" to the next character and continue w/ iteration (i.e. 2 indices)
			
			}else if (AML.substring(i,i+2) === "^%") {//Else if substring is equal to value/type of STRONG opening tag
				HTML.push(elem,'<STRONG>'); //push the concatenated text element and the opening STRONG tag onto the HTML array
				elem = ""; //reset the string element to empty 
				STR = true; //reset STR to true; STRONG tag is open
				i+=1; //begin iterating pass "^~" to the next character and continue w/ iteration
			
			}else if (AML.substring(i,i+6) === "^!%^!~") { //Else if substring contains "^!%^!~" -->
			//Example: "^~ Greetings ^% Earthling. ^!% ^!~"
					if ((EM == true, STR == true) && (AML.indexOf("^%") > -1 & AML.indexOf("^~") > -1)) {
						HTML.push(elem,'</STRONG></EM>'); //push both closing tags
					}
				elem = "";
				STR = false, EM = false; // reset tags as both closed
				i+=5; //iterate pass "^!%^!~" 
			
			}else if (AML.substring(i,i+6) === "^!~^!%") {//Example: "^% Greetings ^~ Earthling. ^!~ ^!%
			//Note: i.e. AML.indexOf("^%") > -1 ->> checking whether tag is present to indicate true AML exists (i.e. opening tags)
					if ((EM == true, STR == true) && (AML.indexOf("^%") > -1 & AML.indexOf("^~") >-1)) {
						HTML.push(elem,'</STRONG></EM>');
					}
				elem = "";
				STR = false, EM = false; // close both tags
				i+=5; //iterate pass "^!~^!%"
			
			}else if (AML.substring(i,i+3) === "^!~"){//Else if substring is equal to value/type of EM closing tag "^!~":
			//Then if previous EM tag is open and if there exists a previous STRONG tag that is currently opened (i.e. index > -1):
				if ((EM == true & STR == true) && AML.indexOf("^%") > -1){
					HTML.push(elem,'</STRONG></EM><STRONG>'); //push elem and close STRONG and EM tags; Open STRONG tag to be closed by subsequent ^!% tag
					STR = true, EM = false; //reset tags
				}else{// if not; push just the closing EM tag
					HTML.push(elem,'</EM>'); 
					EM = false; // reset; EM tag is now closed
				}
				elem = ""; 
				i+=2;
			
			}else if (AML.substring(i,i+3) === "^!%"){//Else if substring is equal to value/type of STRONG closing tag "^!%":
			//Then if previous STRONG tag is open and if there is previous EM tag that is currently open (i.e. index > -1):
				if ((EM == true & STR == true) && AML.indexOf("^~") > -1){ 
					HTML.push(elem,'</EM></STRONG><EM>'); //push elem and close EM and STRONG tags; Open EM tag to be closed by subsequent ^!~ tag
					STR = false, EM = true; //reset tags
				}else{// if not, push just the closing STRONG tag
					HTML.push(elem,'</STRONG>');
					STR = false; // reset; STRONG tag is now closed
				}
				elem = "";
				i+=2; 
			
			}else { // If there are no AML features (i.e. ^%, ^~, etc.) then concatenate AML[i]
 				elem += AML[i];
				//Index starts at 0; increase i by 1 so that when AML.length equals i, 
				//push word & whitespaces to HTML array.
				if (i+1 === AML.length){
					HTML.push(elem);
				}
			}
		}
		return HTML.join(""); // take all of the elements in the array and join together ""
		};
	return AMLTranslator; //return AMLTranslator Obj
}());

// Make translator available via “require” in Node.js
 if (module.exports) {
 module.exports = AMLTranslator //return module.exports
 };

// [DEBUG]
//var String = "^~ Greetings ^% Earthling. ^!~ How are you? ^!%";
//console.log(AMLTranslator.translate(String));


// To Run code:
// > node ./aml_tester.js ./translate.js


