const getell = (selector) => {
    const el = document.querySelector(selector);
    return el
}

const params = window.location.search
const id = new URLSearchParams(params).get("id");
console.log(id);

getell(".id").textContent = id


getell(".btn").addEventListener("click" , async () => {
    const value = getell(".input").value
    try {
        await axios.patch(`/api/v1/task/${id}` , {Task : value });
    } catch (error) {
        console.log(error);
    }
})