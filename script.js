//DARK MODE ON CLICKING THE ICON
var icon = document.getElementById("icon");
    icon.onclick = function(){
        document.body.classList.toggle("dark-mode");
        if(document.body.classList.contains("dark-mode")){
            icon.src = "icon-sun.svg";
            //change image too

        }else{
            icon.src = "icon-moon.svg";
        }
    }

    //INPUT BOX
    const inputBox = document.getElementById("input-box");
    const listContainer = document.getElementById("list-container");

    //ADDING A TASK
    function addTask(){
        if(inputBox.value === ""){
            alert("Please enter a task");
         }
        else{
            let li = document.createElement("li");
            li.innerHTML = inputBox.value;
            listContainer.appendChild(li);
            let span = document.createElement("span");
            span.innerHTML = "\u00D7";
            li.appendChild(span);
        }
        inputBox.value = "";
    }

//ON CLICKING THE CHECK IN LIST AND THE CROSS
    listContainer.addEventListener("click", function(e){
        if(e.target.tagName === "LI"){
            e.target.classList.toggle("checked");
        }
        else if(e.target.tagName === "SPAN"){
            e.target.parentElement.remove();
        }
    }, false);

// ...

// DRAG AND DROP FUNCTIONALITY
let draggedItem = null;

// Event listener for when drag starts
listContainer.addEventListener("dragstart", function(e) {
    draggedItem = e.target; // Store the dragged item
    e.target.classList.add("dragged"); // Add a class to style the dragged item
});

// Event listener for when drag ends
listContainer.addEventListener("dragend", function(e) {
    e.target.classList.remove("dragged"); // Remove the styling class
});

// Event listener for when dragging over a drop target
listContainer.addEventListener("dragover", function(e) {
    e.preventDefault(); // Allow dropping
    const afterElement = getDragAfterElement(listContainer, e.clientY);
    const currentDraggedItem = document.querySelector(".dragged");

    if (afterElement == null) {
        listContainer.appendChild(currentDraggedItem);
    } else {
        listContainer.insertBefore(currentDraggedItem, afterElement);
    }
});

// Helper function to determine the target position for dropping
function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll("li:not(.dragged)")];

    return draggableElements.reduce(
        function(closest, child) {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;

            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        },
        { offset: Number.NEGATIVE_INFINITY }
    ).element;
}

// HOVERING AND THE CROSS ICON IS CLICKED
listContainer.addEventListener("click", function(e) {
    if (e.target.closest(".cross-icon")) {
        e.target.closest("li").remove(); // Remove the closest parent list item
    }
});

// ...

