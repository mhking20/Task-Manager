const getel = (selector) => {
    const el = document.querySelector(selector);
    return el
}

function showalert({color , text}) {
    getel(".alert").classList.remove("visible")
     getel(".alert").classList.add(color);
     getel(".alert").textContent = text
}

const getalltask = async () => {
   
    try {
        const { data: { task } } = await axios.get("/api/v1/task");
        getel(".task_container").classList.remove("visible")
        if(task.length > 0){
            getel(".clear_all").classList.remove("visible")
            getel(".task_container").classList.remove("visible")
        }else{
            getel(".clear_all").classList.add("visible");
            getel(".task_container").classList.add("visible")
        }
        const alltask = task.map((item) => {
            const { _id, Task } = item;
            return ` 
                <div class="singletask" key=${_id}>
                <h1 class="singletaskheader">${Task}</h1><div class="btn_container"><button class="edit_btn"><a href="./edit.html?id=${_id}">Edit</a></button><button data-id=${_id} class="dell_btn">Dell</button></div>
                </div>`
        }).join('');
        getel(".tasks").innerHTML = alltask
    } catch (error) {
        console.log(error);
    }
}


getel('.btn').addEventListener("click", async () => {
    const Task = getel(".input").value;
    try {
        await showalert({color : "success_alert" , text : "Successfully Item Added"});
        await axios.post("/api/v1/task", { Task });
        getalltask();
        getel(".input").value = ""
      
        setTimeout(() => {
            getel(".alert").classList.add("visible")
            getel(".alert").classList.remove("success_alert")
        }, 3000);
    } catch (error) {
        console.log(error);
    }
})


getel(".task_container").addEventListener("click", async (e) => {
    id = e.target.dataset.id
    console.log(id);
    try {
        await showalert({color : "danger_alert" , text : "Item Deleted"});
        await axios.delete(`/api/v1/task/${id}`);
        getalltask();
        setTimeout(() => {
            getel(".alert").classList.add("visible")
            getel(".alert").classList.remove("danger_alert")
        }, 3000);
    } catch (error) {
        console.log(error);
    }
});

getel(".clear_all").addEventListener("click" , async () => {
    try {
        await  showalert({color : "warning_alert" , text : "You Cleared The Items"})
        await axios.delete('/api/v1/task');
        setTimeout(() => {
            getel(".alert").classList.add("visible");
            getel(".alert").classList.remove("warning_alert")
        } , 3000)
    } catch (error) {
        console.log(error)
    }
})


setInterval(() => {
    getalltask();
}, 1000)
