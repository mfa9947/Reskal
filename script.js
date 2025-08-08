const inputBox = document.getElementById("input-box");
const dateInput = document.getElementById("date-input");
const listContainer = document.getElementById("list-container");

function addTask() {
    if (inputBox.value.trim() === '' || dateInput.value === '') {
        alert("Mohon isi tugas dan tanggal!");
        return;
    }

    let li = document.createElement("li");

    // Format tanggal dd/mm/yyyy
    let dateObj = new Date(dateInput.value);
    let formattedDate = ("0" + dateObj.getDate()).slice(-2) + "/" +
                        ("0" + (dateObj.getMonth() + 1)).slice(-2) + "/" +
                        dateObj.getFullYear();

    // Tambahkan teks + tanggal
    li.textContent = `${inputBox.value} (${formattedDate})`;

    // Tambahkan tombol hapus
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);

    // Masukkan ke list
    listContainer.appendChild(li);

    // Reset input
    inputBox.value = "";
    dateInput.value = "";

    saveData();
}

// Event untuk checklist & hapus
listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data") || "";
}
showTask();