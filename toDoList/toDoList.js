document.addEventListener("DOMContentLoaded", function() {

    const doBtn = document.querySelector(".do-btn");
    const doList = document.querySelector("#toDoList");

    doBtn.addEventListener("click", function() {

    const doInput = document.querySelector(".do-input");

    console.log(doInput.value);

    if((doInput.value.trim).length == 0) event.preventDefault(); 


    const li = document.createElement("li");
    li.className = "item";
    
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    const span = document.createElement("span");
    span.textContent = doInput.value;

    const button = document.createElement("button");
    const icon = document.createElement("i");
    icon.className = "fas fa-trash";
    button.appendChild(icon);

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(button);
    
    doList.appendChild(li);

    });
});