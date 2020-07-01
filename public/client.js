
// Token есть в localStorage
if (localStorage.getItem('token')) {
    document.forms["authForm"].hidden = true
    document.getElementById('logoutDiv').hidden = false
    document.getElementById('userman').innerText = localStorage.getItem('name');
}

// Получение всех пользователей
const GetUsers = async () => {

    let response = await fetch('/users',{headers:{'Authorization': 'Bearer ' + localStorage.getItem('token')}})
    let users = await response.json();
    let rows = '';
    if (!users.error) {
    users.forEach(user => {
        rows += row(user);
    });
    document.querySelector("table tbody").innerHTML = rows;
}
}




// Получение одного пользователя
const GetUser = async (id) => {

    let response = await fetch('/users/' + id, {
        headers: {
            'Content-Type': 'application/json;',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })
    let user = await response.json();
    console.log(user)
    if (!user.error) {
        let form = document.forms["userForm"];
        form.elements["id"].value = user._id;
        form.elements["name"].value = user.name;
        form.elements["age"].value = user.age;
    }
}

// Добавление пользователя
const CreateUser = async (email, userPassword) => {
    let data = {
        email: email,
        password: userPassword
    }
    console.log(data);
    let response = await fetch('/users', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    let user = await response.json();
    console.log(user)
    
}


// Изменение пользователя
const EditUser = async (userId, userName, userAge) => {
    let data = {
        id: userId,
        name: userName,
        age: userAge
    }
    
    let response = await fetch('/users', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(data)
    });

    console.log(response)
    let user = await response.json();
    reset();
    console.log(user);
    let elem = document.querySelector("tr[data-rowid='" + user._id + "']");
    elem.insertAdjacentHTML('afterend', row(user));
    elem.remove();
}
// сброс формы
function reset() {
    const form = document.forms["userForm"];
    form.reset();
    form.elements["id"].value = 0;
}

// Удаление пользователя
const DeleteUser = async (id) => {

    let response = await fetch('/users/' + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json;',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    });
    let user = await response.json();

    console.log(user);
    if (user._id) {
        document.querySelector("tr[data-rowid='" + user._id + "']").remove();
    }
}
// login пользователя
const LoginUser = async (userName, userPassword) => {

    let data = {
        name: userName,
        password: userPassword
    }
    console.log(data);
    let response = await fetch('/users/login', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    let user = await response.json();
    console.log(user)

    if (!user.error) {
        // console.log(user.token)
        localStorage.setItem('token', user.token)
        localStorage.setItem('name', user.user.name)
        localStorage.setItem('id', user.user._id)
        document.forms["authForm"].reset();
        document.forms["authForm"].hidden = 'true'
        document.getElementById('logoutDiv').hidden = false
        document.getElementById('userman').innerText = user.user.name;
    }
    GetUsers();
}

//logout пользователя
const LogoutUser = async () => {

    let response = await fetch('/users/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    });

    let user = await response.json();
    console.log(user)
    localStorage.removeItem('token')
    localStorage.removeItem('id')
    localStorage.removeItem('name')
    document.forms["authForm"].hidden = false
    document.getElementById('logoutDiv').hidden = true
}
//загрузка аватара
const AddAvatar = async (avatar) => {
    
    let response = await fetch('/users/upload/avatar', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: avatar
    });

    let user = await response.json();
    console.log(user)
}

// создание строки для таблицы
const row = function (user) {
    return "<tr data-rowid='" + user._id + "'><td>" + user._id + "</td>" +
        "<td>" + user.name + "</td> <td>" + user.age + "</td>" +
        "<td><a class='editLink' data-id='" + user._id + "'>Изменить</a> | " +
        "<a class='removeLink' data-id='" + user._id + "'>Удалить</a></td></tr>";
}
// сброс значений формы
document.getElementById("reset").onclick = function (e) {

    e.preventDefault();
    reset();
}
// logout
document.getElementById("logout").onclick = LogoutUser

// logIn 
document.querySelectorAll("form")[0].onsubmit = function (e) {
    e.preventDefault();
    const name = this.elements["name"].value;
    const password = this.elements["password"].value
    LoginUser(name, password)
}

// отправка для регистрации или изменения пользователя
document.querySelectorAll("form")[1].onsubmit = function (e) {
    e.preventDefault();
    const id = this.elements["id"].value;
    const name = this.elements["name"].value;
    const age = this.elements["age"].value;
    const password = this.elements["password"].value
    if (id == 0)
        CreateUser(name, age, password);
    else
        EditUser(id, name, age);
};

// отправка аватарки
document.querySelectorAll("form")[2].onsubmit = function (e) {
    e.preventDefault();
    const formData = new FormData(document.querySelectorAll("form")[2])
    
    AddAvatar(formData); 
};

// нажимаем на ссылку Изменить
document.querySelector("body").addEventListener("click", function (e) {
    if (e.target.className === 'editLink') {
        //console.log('edit')
        const id = e.target.dataset.id;
        GetUser(id);
    }
});

// нажимаем на ссылку Удалить
document.querySelector("body").onclick = function (e) {
    if (e.target.className === 'removeLink') {
        const id = e.target.dataset.id;
        DeleteUser(id);
    }
}

// загрузка пользователей
GetUsers();
