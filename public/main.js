const buttonShow = document.querySelector('.btn-primary');
const buttonAdd = document.querySelector('.btn-success');
const buttonRemove = document.querySelector('.btn-danger');
const ul = document.querySelector('#list');
const textField = document.querySelector('#number-input');

let jsonData;
let value;

buttonShow.addEventListener("click", () => {
    console.log("Click")
    getData()
})

buttonAdd.addEventListener("click", () => {
    console.log("Click")
    addName(value)

})

textField.addEventListener("change", (e) => {
    console.log(e)
    value = e.target.value
})


const addName = (value) => {
    axios.post('http://localhost:3000/api/members', {
        name: value
    })

    getData()
}


const setP = (arr) => {
    arr.forEach((item) => {
        ul.innerHTML += `<li class="list-group-item"> ${item.name}</li>`;
    })
}

/* buttonRemove.addEventListener('click', () =>  {
    let jsonData = null
    setP(jsonData)
}) */

const getData = async () => {
/*     if(jsonData)return */

ul.innerHTML = ''
    await axios.get('http://localhost:3000/api/members')
        .then(res => jsonData = res.data)
        .catch(err => console.log(err))

        setP(jsonData)
}