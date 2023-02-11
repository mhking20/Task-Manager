const getel = (selector) => {
    const el = document.querySelector(selector);
    return el
}

function showalert({ color, text }) {
    getel(".alert").classList.remove("success_alert", "warning_alert", "danger_alert", "hidden");
    getel(".alert").textContent = "";
    getel(".alert").classList.add(color);
    getel(".alert").textContent = text
}

const getalltask = async () => {
    try {
        const { data: { task } } = await axios.get("/api/v1/task");
        getel(".task_container").classList.remove("hidden")
        if (task.length > 0) {
            getel(".clear_all").classList.remove("hidden")
            getel(".task_container").classList.remove("hidden")
        } else {
            getel(".clear_all").classList.add("hidden");
            getel(".task_container").classList.add("hidden")
        }
        const alltask = task.map((item) => {
            const { _id, Task } = item;
            return ` 
                <div class="singletask" key=${_id}>
                <h1 class="singletaskheader">${Task}</h1><div class="btn_container"><a href="./edit.html?id=${_id}"><button class="edit_btn">Edit</button></a><button data-id=${_id} class="dell_btn">Dell</button></div>
                </div>`
        }).join('');
        getel(".tasks").innerHTML = alltask
    } catch (error) {
        console.log(error);
    }
}


getel('.form').addEventListener("submit", async (e) => {
    e.preventDefault();
    getel(".hideable").classList.add("hidden");
    getel(".loading").classList.remove("hidden");
    const Task = getel(".input").value;
    try {    
        await axios.post("/api/v1/task", { Task });
        showalert({ color: "success_alert", text: "Successfully Item Added" });
        getalltask();
        getel(".input").value = ""
        setTimeout(() => {
            getel(".hideable").classList.remove("hidden");
            getel(".loading").classList.add("hidden")
        }, 1000);
        setTimeout(() => {
            getel(".alert").classList.add("hidden")
            getel(".alert").classList.remove("success_alert")
        }, 1000);
    } catch (error) {
        console.log(error);
    }
})


getel(".tasks").addEventListener("click", async (e) => {
    getel(".hideable").classList.add("hidden");
    getel(".loading").classList.remove("hidden");
    id = e.target.dataset.id
    try {  
        await axios.delete(`/api/v1/task/${id}`);
        showalert({ color: "danger_alert", text: "Item Deleted" });
        getalltask();
        setTimeout(() => {
            getel(".hideable").classList.remove("hidden");
            getel(".loading").classList.add("hidden")
        }, 1000);
        setTimeout(() => {
            getel(".alert").classList.add("hidden")
            getel(".alert").classList.remove("danger_alert")
        }, 1000);
    } catch (error) {
        console.log(error);
    }
});

getel(".clear_all").addEventListener("click", async () => {
    getel(".hideable").classList.add("hidden");
    getel(".loading").classList.remove("hidden");
    try {
        await axios.delete('/api/v1/task');
        showalert({ color: "warning_alert", text: "You Cleared The Items" });
        setTimeout(() => {
            getel(".hideable").classList.remove("hidden");
            getel(".loading").classList.add("hidden")
        }, 1000);
        setTimeout(() => {
            getel(".alert").classList.add("hidden");
            getel(".alert").classList.remove("warning_alert");
            console.log("this is warning");
        }, 1000)
    } catch (error) {
        console.log(error)
    }
})

setInterval(() => {
    getalltask()
} , 1000)