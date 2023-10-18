// console.log("Hello World!")
// alert("Notifikasi")
// prompt("Pinjam seratus")

// var  Promnet = "Coding is easy"
// console.log(Promnet)
// var Promnet = "Coding not easy"
// console.log(Promnet)

// let  Promnet = "Coding is easy"
// console.log(Promnet)
// Promnet = "Coding not easy"
// console.log(Promnet)

// const  Promnet = "Coding is easy"
// console.log(Promnet)
// Promnet = "Coding not easy"
// console.log(Promnet)

// let totalPoin = prompt("Masukan poin anda")
//     if(totalPoin > 100) {
//         document.write("<h1>Congratulation</h1>");
//     }
//     else {
//         document.write("<h1>Thank You</h1>");
//     }

// let x = 6;
// let y = 3;

// console.log(x<10 && y>1);
// console.log(x<10 && y<1);
// console.log(x==5 || y==5);
// console.log(x==6 || y==5);
// console.log(!(x==y));

// document.writeln(x<10 && y>1);
// document.writeln(x<10 && y<1);
// document.writeln(x==5 || y==5);
// document.writeln(x==6 || y==5);
// document.writeln(!(x==y));

// let p = document.querySelector("p")
// let button = document.querySelector("button")
// let input = document.querySelector("input")

// button.addEventListener('click', function() {
//     let isi = input.value
//     console.log(isi)
//     p.innerHTML = isi
// })

const addBtn = document.querySelector("#add-btn");
const newTaskInput = document.querySelector("#wrapper input");
const tasksContainer = document.querySelector("#task");
const error = document.getElementById("error");
const countValue = document.querySelector(".count-value");
let taskCount = 0;

const displayCount = () => {
    countValue.innerText = taskCount;
};

const updateTaskCount = (change) => {
    taskCount += change;
    displayCount();
};

const addTask = () => {
    const taskName = newTaskInput.value.trim();
    error.style.display = "none";
    if (!taskName) {
        setTimeout(() => {
            error.style.display = "block";
        }, 200);
        return;
    }

    const task = `<div class="task">
        <input type="checkbox" class="task-check">
        <span class="taskname">${taskName}</span>
        <button class="edit">
            <i class="fa-solid fa-pen-to-square"></i>
        </button>
        <button class="delete">
            <i class="fa-solid fa-trash"></i>
        </button>
    </div>`;

    tasksContainer.insertAdjacentHTML("beforeend", task);

    const deleteButtons = document.querySelectorAll(".delete");
    deleteButtons.forEach((button) => {
        button.onclick = () => {
            const taskContainer = button.closest('.task');
            const checkBox = taskContainer.querySelector('.task-check');

            if (checkBox.checked) {
                // Jika checkbox dicentang, tidak kurangi taskCount
            } else {
                updateTaskCount(-1); // Kurangi hanya jika checkbox tidak dicentang
            }

            taskContainer.remove();
        };
    });

    const editButtons = document.querySelectorAll(".edit");
    editButtons.forEach((editBtn) => {
        editBtn.onclick = (e) => {
            let targetElement = e.target;
            if (!(e.target.className == "edit")) {
                targetElement = e.target.parentElement;
            }
            newTaskInput.value = targetElement.previousElementSibling?.innerText;
            targetElement.parentNode.remove();
            updateTaskCount(-1);
        };
    });

    const tasksCheck = document.querySelectorAll(".task-check");
    tasksCheck.forEach((checkBox) => {
        checkBox.onchange = () => {
            const taskContainer = checkBox.closest('.task');
            const taskName = taskContainer.querySelector('.taskname');

            if (checkBox.checked) {
                taskName.classList.add("completed");
                updateTaskCount(-1); // Kurangi hanya jika checkbox belum dicentang sebelumnya
            } else {
                taskName.classList.remove("completed");
            }
        };
    });

    taskCount += 1;
    displayCount();
    newTaskInput.value = "";
};

addBtn.addEventListener("click", addTask);

window.onload = () => {
    taskCount = 0;
    displayCount();
    newTaskInput.value = "";
};