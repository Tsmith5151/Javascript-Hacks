# Javascript-Hacks

<p align= center>
<img src ="http://www.artworkvector.com/124-thickbox_default/alien-workshop-logo-free-artwork-vector-graphic-resources.jpg">
</p>

## Problem Statement:
- This unique Markup Language (ML) has matched pairs of opening and closing elements just like HTML, indicating that the text between 
opening and closing elements should have a particular text effect applied. All ML markup elements begin with a caret (^), optionally 
are followed by an exclamation point indicating it is a closing element, and are followed by a single character effect type indicator. 
For a string to be valid ML, all elements that are opened must be closed before the end of the document, and bare caret (^) characters 
(not part of a markup element) are not permitted. Unlike HTML, ML elements that are opened within a different ML effect do not need to 
be enclosed by that effect. 

- The source code can be found in `translate.js` and the script is tested in `aml_tester.js`. First install mock-broswer by typing 
```npm install mockbrowser``` in the terminal/command window. To test the code type ```node ./aml_tester.js ./translate.js```.


#### ML to HTML Examples:

- Ok: ```^~ Greetings ^% Earthling. ^!% ^!~```
- Also Ok: ```^~ Greetings ^% Earthling. ^!~ How are you? ^!%```
- Note: a single ML tag cannot be opened twice without being closed.```
  - This is not Ok: ```^~ Greetings ^~ Earthling. ^!~ ^!~```

|Text Effect  <tags> |Element Opening  |Element Closing|
|Strong              |       ^%        |      ^!%      |
|Emphasis            |       ^~        |      ^!~      |

- Here is a couple of examples:
  -Greetings ^%from ^~Glornix^!% BetaNine^!~. Would be rendered as: Greetings **from Glornix** BetaNine.

- So the goal of this code is to write a javascript file that defines a global object with a callable method named `translate` and 
then `translate` should take a string of valid ML as its sole argument, and return a valid HTML fragment with no wrapping elements. 
The valid ML input message should result valid HTML fragments. So translating the above example into HTML with the desired text effects 
applied looks like the following:

##### ML Input:
```javascript
var myHTML = MLTranslator.translate(“Greetings ^%from ^~Glornix^!% BetaNine^!~.”)
```

##### HTML Output:
Greetings <strong>from <em>Glornix</em></strong><em> BetaNine</ em>.

##### Other Examples:
**ML:** ```Hello, Earth!```
**HTML:** ```Hello, Earth!```

**ML:** ```Hello, ^%Earth^!% ```
**HTML:** ```Hello, <strong>Earth!</strong>```

**MLL:** ```^~Hello, ^%Earth!^!~ We are pleased ^~to^!% meet you.^!~```
**HTML:** ```<em>Hello,<strong>Earth!</strong></em><strong>We are pleased <em> to </em></strong><em>meet you.</em>```