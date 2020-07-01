 //добавление питомца пользователю
 const CreatePet = async (petName) => {
    let data = {
        name: petName
    }
    let response = await fetch('/pets', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    let pet = await response.json();
    console.log(pet)

}
 //получение питомцов пользователя
const getPets = async () => {

    let response = await fetch('/users/pet/'+ localStorage.getItem('id'), {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })
    let result = await response.json();
    console.log(result)    
}
 //привязка питомца
const addRecipesToUser = async (data,token) => {
   
    let response = await fetch('/users/recipes', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        },
        body: JSON.stringify(data)
    })
    let result = await response.json();
    console.log(result)    
}