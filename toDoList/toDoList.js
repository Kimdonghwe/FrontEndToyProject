document.addEventListener("DOMContentLoaded", function() {

    const doBtn = document.querySelector(".do-btn");
    const doList = document.querySelector("#toDoList");

    // 할일 추가
    doBtn.addEventListener("click", function() {
    const doInput = document.querySelector(".do-input");
    if(doInput.value.trim().length == 0) return; 


    const li = document.createElement("li");
    li.className = "item";
    
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    const span = document.createElement("span");
    span.textContent = doInput.value;

    const button = document.createElement("button");
    button.className = "del-btn";
    const icon = document.createElement("i");
    icon.className = "fas fa-trash";
    button.appendChild(icon);

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(button);
    
    doList.appendChild(li);

    doInput.value = "";

    });

    // 엔터입력시 입력창 이벤트 처리
    document.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            doBtn.click();
        }
    });

    // 단일 삭제
    doList.addEventListener("click", function(event) {
        if(event.target && ( event.target.classList.contains("del-btn") ||event.target.classList.contains("fas fa-trash")) ) {
            console.log("222");
            event.target.parentNode.remove();
        }
    });

    // 삭제일괄 처리
    document.querySelector(".selectbtnsDel").addEventListener("click", function(event) {

        const checkboxes = document.querySelectorAll('input[type="checkbox"]');

        checkboxes.forEach(function(checkbox) {
            if (checkbox.checked) {
                checkbox.parentNode.remove();
            }
        });


    });
        
});