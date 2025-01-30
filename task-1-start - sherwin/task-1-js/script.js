window.onload = setup;

/** function setup */
function setup(){
console.log("we are a go!")
/*** ALL ANWSERS TO BE ADDED IN THE ALLOCATED SPACE */
/*** START PART ONE ACCESS */ 
/* 1: all paragraph elements */
/***CODE */
    console.log(document.getElementsByTagName("p"));
/***OUTPUT: 
 * HTMLCollection { 0: p#1, 1: p#2.img-descript, 
 * 2: p#3.img-descript, 3: p#4.img-descript, 
 * 4: p#5.img-descript, 5: p#6.img-descript, 
 * 6: p#7.img-descript, 7: p#8.img-descript, 
 * 8: p#9.img-descript, … }
 */


/*************************************** */
/* 2: only the first paragraph element */
/***CODE */ 
    console.log(document.querySelector("p"));
/***OUTPUT: 
 * <p id="1">
 */


/*************************************** */
/* 3: all elements with the class inner-container */
/***CODE */
    console.log(document.getElementsByClassName("inner-container"));
/***OUTPUT: 
 * HTMLCollection { 0: div.inner-container, 
 * 1: div.inner-container, 2: div.inner-container, 
 * 3: div.inner-container, 4: div.inner-container, 
 * 5: div.inner-container, 6: div.inner-container,
 * 7: div.inner-container, length: 8 }
 */


/*************************************** */
/* 4: the last image element inside the element that has the class img-container */
/***CODE */
    console.log(document.querySelectorAll(".img-container"));
    console.log(document.querySelectorAll(".img-container img")[7]);
/***OUTPUT: 
 * <img class="img-image" src="task-1-images/seventeen.png">
 */


/*************************************** */
/* 5A: all h2 elements */
/* 5B: length of the list in 5A */
/* 5C: the text content of the first element in the list from 5A */
/***CODE */
    console.log(document.querySelectorAll("h2"));
    console.log(document.querySelectorAll("h2").length);
    console.log(document.querySelector("h2").textContent);

/***OUTPUT: 
 * 5A: NodeList [ h2 ]
 * 5B: 1
 * 5C: The header of this fancy page
 */


/*************************************** */
/* 6: the element with id name parent */
/***CODE */
    console.log(document.getElementById("parent"));

/***OUTPUT: 
 * <section id="parent">
 */

/*************************************** */
/*** END PART ONE ACCESS */ 


/*************************************** */
/*** START PART TWO MODIFY */ 
/*************************************** */
/* 1: Select the first paragraph and replace the text within the paragraph... */
/***CODE */
let FirstParagraph = document.querySelector('p');
FirstParagraph.textContent = `New text in paragraph one: text changed by Sherwin on the following date: Jan 29 2025`;
/*************************************** */
/* 2: Select all elements in the HTML that have the class name content-container
 and change the background color ... of first and second ...*/
/***CODE */
let contentContainers = document.getElementsByClassName('content-container');
contentContainers[0].style.backgroundColor = 'orange';
contentContainers[1].style.backgroundColor = 'purple';

/*************************************** */
/* 3: Change the src element of the first image element on the page to be ...
/***CODE */
let firstImage = document.querySelector('img');
firstImage.src = 'task-1-images/seven.png';

/*************************************** */
/* 4: Select the third paragraph element on the page and 
replace the content (within the paragraph) to be an h2 element which contains the text `TEST 123`
/***CODE */
let thirdParagraph = document.querySelectorAll('p')[2];
thirdParagraph.innerHTML = '<h2>TEST 123</h2>'

/*************************************** */
/* 5: Select the fourth paragraph element on the page and 
add to the existing content an h2 element containing the text `TEST 123`
/***CODE */
let fourthParagraph = document.querySelectorAll('p')[3];
fourthParagraph.innerHTML += '<h2>TEST 123</h2>';

/*************************************** */
/* 6: Select the fifth paragraph element on the page and add to the existing content 
an img element that holds `one.png`, and add the class newStyle to said paragraph element.
/***CODE */
let fifthParagraph = document.querySelectorAll('p')[4];
fifthParagraph.innerHTML += '<img src="task-1-images/one.png">';
fifthParagraph.classList.add('newStyle');

/*************************************** */
/* 7: Add the following array variable: let colors = ['red','blue','green','orange'];, 
then access all elements with class name inner-container and save to a variable called `innerContainers`. 
Next, iterate over the colors array, and for each color: 
assign the element from innerContainers variable with the same index 
(i.e. colors[0] should be allocated to the first innerContainers element, colors[1] to the second, etc ...) 
a background using that color.
/***CODE */
let colors = ['red', 'blue', 'green', 'orange'];
const InnerContainers = document.getElementsByClassName('inner-container');

colors.forEach((color, index) => {
    if (InnerContainers[index]) {
        InnerContainers[index].style.backgroundColor = color;
    }
});


/*************************************** */
/*** END PART TWO MODIFY */ 


/*************************************** */
/*** START PART THREE CREATE */ 
/*************************************** */
/* 1: NEW PARAGRAPHS */
/* 1A: Access all paragraph elements, and store the result in a variable called: allPTagsThree */
/* 1B: Create a function:function customCreateElement(parent){ //body } */
/* 1C:  In the body of customCreateElement create a new parargraph element*/
/* 1D:  Set the text of this element to be : `using create Element`*/
/* 1E:  Set the background of this paragraph element to be green */
/* 1F:  Set the color of the text in this paragraph element to be white */
/* 1G: Append this new element to the parent variable within the function. */
/* 1H: Iterate through the allPTagsThree array and call customCreateElement(), 
passing the current allPTagsThree element as the parent with each iteration.*/
/***CODE 
*
*/


let allPTagsThree = document.querySelectorAll("p");


function customCreateElement(parent){
    let newParagraph = document.createElement("p");     
    newParagraph.innerHTML = "using create Element";    
    newParagraph.style.background = "green";            
    newParagraph.style.color = "white";                 
    parent.appendChild(newParagraph);                  
}


for (let i = 0; i < allPTagsThree.length; i++){
    customCreateElement(allPTagsThree[i]);
}

/***EXPLANATION::
 * This code finds all the <p> elements on the page and then loops through them. 
 * For each <p>, it creates a new <p> element with the text "using create Element." 
 * The new paragraph has a green background and white text. 
 * Finally, the new paragraph is added to the original one.
 * 
 */

/*************************************** */
/* 2: GRID OF BOXES */
/* 2A: Create another new function: function customNewBoxCreate(parent){ //body }*/
/* 2B: In the body of customNewBoxCreate create a new div element, that has the class testDiv. 
/* 2C:Then append this new element to the parent variable within the function. 
/* 2D:Finally, return</code> this new element */
/* 2E:Create a nested for loop (for rows and columns) to iterate through 10 columns and 10 rows (just like the JS Review :)). 
    Call the customNewBoxCreate function, in order to generate a new div -> representing each cell in the grid. 
    Ensure that the parent element for each of these new divs is the element whose id is named `new-grid`*/
/* 2F: You will see at this point that the x,y position of the resulting divs makes no sense... 
    Fix this by doing the following: every time you call customNewBoxCreate() - save the current returned element 
    in a variable i.e. returnedDiv. 
    Set the style (left and top) to the of this element to 
    the necessary x and y position (use the counter variables in the for nested for loop to 
    calculate the new positions.
/* 2G: BONUS I: Make every div in the resulting grid in an even numbered row have white background 
    and otherwise let it have a background of purple.</li>
/* 2H: BONUS II: For every div in an even numbered row make it contain the text `EVEN`, 
    otherwise lat it have the content `ODD`.*/

/***CODE */
function custonNewBoxCreate(parent){
    let newDiv = document.createElement("div");
    newDiv.classList.add("testDiv");
    parent.appendChild(newDiv);
    return newDiv;
}

for (let i = 0; i < 10; i++){
    for (let j = 0; j < 10; j++){
        let returnedDiv = custonNewBoxCreate(document.getElementById("new-grid"));
        returnedDiv.style.top = `${i * 45}px`; 
        returnedDiv.style.left = `${j * 45}px`;

        
    }
}

let testDiv = document.querySelectorAll(".testDiv");
console.log(testDiv.length);


/***EXPLANATION::
 * This code creates 100 small boxes inside a container. 
 * It uses two loops to make 10 rows and 10 columns of boxes. 
 * Each box is added to the container and spaced 45 pixels apart.
 * 
 */

/*************************************** */
/* 3: GRID OF BOXES II */

/* 3A: Create ANOTHER nested for loop - in order to generate a new grid ... 
    USE the same customNewBoxCreate function..., the only difference is that the parent element 
    for each of these new divs is the element whose id is `new-grid-three`. */
/* 3B: Then: write the code to check when a column is a multiple of 3 (no remainder), 
    when it is a column where the remainder is 1 or when the remainder is 2 ... 
    HINT:: look up the % operator.. */
/* 3C: Then for each of the above cases: give the new divs in the first case a background of red, 
        then the second a background of orange and the third yellow. */
/*  3D: Finally, let each div contain the text content representing the associated remainder 
    when dividing by three. */

/***CODE */

for (let i = 0; i < 10; i++){
    for (let j = 0; j < 10; j++){
        let returnedDiv2 = custonNewBoxCreate(document.getElementById("new-grid-three"));
        returnedDiv2.style.top = `${i * 45}px`; 
        returnedDiv2.style.left = `${j * 45}px`;

        if (j % 3 === 0){
            returnedDiv2.style.background = "red";
            returnedDiv2.textContent = "0";
        }
        else if (j % 3 === 1){
            returnedDiv2.style.background = "orange";
            returnedDiv2.textContent = "1";
        }
        else if (j % 3 === 2){
            returnedDiv2.style.background = "yellow";
            returnedDiv2.textContent = "2";
        }
    }
}

/***EXPLANATION::
 * This code makes a 10x10 grid of boxes.
 * It places each box in a row and column,
 * and changes the color and text inside the
 * box depending on its column.
 * Every third column has a red box with "0",
 * the next one is orange with "1",
 * and the next is yellow with "2".
 * 
 */

/*************************************** */
/*** END PART THREE CREATE */ 
/*************************************** */
    




}