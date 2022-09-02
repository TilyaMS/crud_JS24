// data start
let users = [
    {
        name: 'User 1',
        password: 'pass123',
        age: 30,
        isLogin: false,
        getMessage:[],
        sentMessage:[]
    },
    {
        name: 'User 2',
        password: 'pass124',
        age: 33,
        isLogin: false,
        getMessage:[],
        sentMessage:[]
    },
    {
        name: 'User 3',
        password: 'pass125',
        age: 21,
        isLogin: false,
        getMessage:[],
        sentMessage:[]
    },
    
];

// data end

// users scripts start
let inSystem = '';
function changeInSystemUser(userName = ''){
    inSystem = userName;
    let h3 = document.querySelector('h3');
    inSystem ? h3.innerText = Пользовaтель: `${inSystem} в системе : h3.innerText = 'Нет пользователя в системе'`
};

// CREATE LOGIC
function checkUniqeUserName(name){
    return users.some(item => item.name === name)
}

function checkPasswords(pass, conf){
    return pass===conf;
}

function createUser(){
    let userName = prompt("Введите свое имя");
    if(checkUniqeUserName(userName)){
        alert('Пользователь с таким именем уже существует!')
        return;
    }
    let password = prompt('Введите пароль');
    let confirmPassword = prompt('Повторите пароль');
    if(!checkPasswords(password,confirmPassword)){
        alert('Пароли не совпадают');
        return;
    }
    let userAge = +prompt("Введите возраст");
    let userObj = {
        name:userName,
        password:password,
        age: userAge,
        isLogin: false,
        getMessage: [],
        sendMessage: []
    }
    users.push(userObj);
    alert('Пользователь успешно добавлен');
    console.log(users);
}

// LOGIN LOGIC

function getUserObj(userName){
    return users.find(item => item.name === userName);
}
function checkUserPassword(userName,pass){
    let user = getUserObj(userName);
    return user.password === pass;
}
function loginUser(){
    let userName = prompt('Введите имя пользователя');
    if(!checkUniqeUserName(userName)){
        alert('Пользователь с таким именем не существует!');
        return;
    }
    let pass = prompt('Введите пароль');
    if(!checkUserPassword(userName,pass)){
       alert('Неверный пароль!');
       return;
    };
    let user = getUserObj(userName);
    user.isLogin = true;
    changeInSystemUser(userName);
    // console.log(users)
};

//LOGOUT LOGIC

function logoutUser(){
    let user = getUserObj(inSystem);
    user.isLogin = false;
    inSystem = '';
    changeInSystemUser('');
};

// DELETE USER LOGIC
 
function deleteUser(){
    if (!inSystem){
        alert('Пользователь не авторизован');
        return;
    }
    let pass = prompt('Введите пароль');
    if(!checkUserPassword(inSystem,pass)){
       alert('Неверный пароль!');
       return;
    };
     let user = getUserObj(inSystem);
     users.splice(users.indexOf(user),1);
     changeInSystemUser('');
     console.log(users)
}

// UPDATE USER LOGIC

function updateUser(){
    if (!inSystem){
        alert('Пользователь не авторизован');
        return;
    }
    let updateKey = prompt("Что хотите изменить? имя, возраст или пароль?");
    let  userObj = getUserObj(inSystem);
    if(updateKey.toLowerCase() === "имя"){
        let updateName = prompt('Введите новое имя');
        userObj.name = updateName;
        changeInSystemUser(updateName);
        alert("Успешно изменили имя!");
    }
    else if(updateKey.toLowerCase() === "возраст"){
        let updateAge = +prompt('Введите новый возраст');
        userObj.age = updateAge;
        alert("Успешно изменили возраст!");
    }
    else if(updateKey.toLowerCase() === "пароль"){
        let pass = prompt("Введите старый пароль");
            if(!checkUserPassword(inSystem,pass)){
                alert('Неверный пароль!');
                return;
        }
        let newPass = prompt("Введите новый пароль");           
        userObj.password = newPass;
        alert("Успешно изменили пароль!");
        }
        console.log(users)
    }


// SEND MESSAGE


function sendMessage(){
    if (!inSystem){
        alert('Пользователь не авторизован');
        return;
    }
    let sendUser = prompt('Кому отправить?');
    if(!checkUniqeUserName(sendUser)){
        alert('Такого пользователя не существует');
        return;
    }
    
    let sendObj = getUserObj(sendUser);
    let myObj = getUserObj(inSystem);
    let content = prompt('Напишите сообщение');
    let message = {
        id: Date.now(),
        content: content,
        from: inSystem
    }
    sendObj.getMessage.push(message);
    myObj.sentMessage.push(message);
    alert("Ваше сообщение успешно отправлено!");
    console.log(users);
}

// DELETE MESSAGE

function checkIdMs(id){
    return (users.some(item => item.sentMessage.some(item1 => item1.id === id)) || users.some(item => item.getMessage.some(item1 => item1.id === id)));
}  

 
function checkUserIdMs(userName,id){
        let user = getUserObj(userName);
        return (user.sentMessage.some(item =>item.id === id) || user.getMessage.some(item =>item.id === id));
}  

function getMessageObj(userName,id){
    let obj = getUserObj(userName);
    return (obj.sentMessage.find(item =>item.id === id) || obj.getMessage.find(item =>item.id === id));
}

function messageFindSent(obj1,obj2){
    return obj1.sentMessage.some(item => item === obj2);
}
function messageFindGet(obj1,obj2){
    return obj1.getMessage.some(item => item === obj2);
}


function deleteMessage(){
    if (!inSystem){
        alert('Пользователь не авторизован');
        return;
    }
    let idMessage = +prompt("Введите Id сообщения, который  хотите удалить");
    if(!checkIdMs(idMessage)){
        alert('Сообщение с таким Id не существует');
        return;
    }
    if(!checkUserIdMs(inSystem,idMessage)){
        alert("Не принадлежит сообщение");
        return;
    }
    let  userObj = getUserObj(inSystem);
    let messageObj = getMessageObj(inSystem,idMessage);
    console.log(messageObj);

    if(messageFindSent(userObj,messageObj)){
     userObj.sentMessage.splice(userObj.sentMessage.indexOf(messageObj),1);
     alert("Успешно удалено!");
    }
    else if(messageFindGet(userObj,messageObj)) {
        userObj.getMessage.splice(userObj.getMessage.indexOf(messageObj),1);
        alert("Успешно удалено!");
    }
 
    console.log(users)
}