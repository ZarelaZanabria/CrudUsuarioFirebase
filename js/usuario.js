window.onload = inicializar;
//Inicializamos una variable global.
let formUsers;
let refUsers;
let tbodyTableUsers;
let elementDeleteUser;
//Funcion en donde vamos a Ejecutar el registro de usuario
function inicializar() {
    //Seleccionamos el formulario Usuario.
    formUsers = document.getElementById('form-users');
    //Creamos un evento en donde al hacer click ejecutamos la funcion ubmitUsersFirebase
    formUsers.addEventListener('submit', submitUsersFirebase, false);

    tbodyTableUsers = document.getElementById('tbody-table-users');

    //Indicamos la base de datos que vamos conectar
    //Hace referente al hijo del modo raiz de la base de datos

    refUsers = firebase.database().ref().child('Usuarios');
    //Mostrar los datos en el formulario.
    showDataUsers();
}


const showDataUsers = () => {
    //Quiero que cada que este en value , me hague algo

    refUsers.on('value', function (snap) {
        //Vamos a obtener los valores de la base de datos Ususer
        let dataUsers = snap.val();
        //Filas iniciliza vacio.
        let toRows = '';
        //vamos a recorrer el arrary Usuarios.
        for (const dataUser in dataUsers) {
            //Generar una filas 
            //toRows es un string con todas los datos a mostrar
            toRows += '<tr>' +
                '<td>' + dataUsers[dataUser].usersName + '</td>' +
                '<td>' + dataUsers[dataUser].usersLastName + '</td>' +
                '<td>' + dataUsers[dataUser].usersEmail + '</td>' +
                '<td>' + dataUsers[dataUser].usersPassword + '</td>' +
                '<td>' +
                '<button class ="btn btn-danger update" data-users="' + dataUser + '">' +
                '<span class = "glyphicon glyphicon-pencil"></span>' +
                '</button>' +
                '</td>' +
                '<td>' +
                '<button class ="btn btn-danger delete" data-users="' + dataUser + '">' +
                '<span class = "glyphicon glyphicon-trash"></span>' +
                '</button>' +
                '</td>' +
                '</tr>';
        }

        tbodyTableUsers.innerHTML = toRows;
        //Para poder borrar hacemos una condicion si la tabla tiene filas
        if (toRows != "") {

            //Elemento elementDeleteUser que contiene todos los elemtos de la clase borrar
            let elementUpdateUser = document.getElementsByClassName('update');
            //de la cantidad de elementos borrables 
            for (let index = 0; index < elementUpdateUser.length; index++) {
                //lo que hacemos es crear un evento que cuando hacemos click en algunos
                // de los botones entonces tendremos que borrar.
                elementUpdateUser[index].addEventListener('click', updateUsers, false);

            }
            //Elemento elementDeleteUser que contiene todos los elemtos de la clase borrar
            let elementDeleteUser = document.getElementsByClassName('delete');
            //de la cantidad de elementos borrables 
            for (let index = 0; index < elementDeleteUser.length; index++) {
                //lo que hacemos es crear un evento que cuando hacemos click en algunos
                // de los botones entonces tendremos que borrar.
                elementDeleteUser[index].addEventListener('click', deleteUsers, false);

            }

        }

    });

}

function deleteUsers() {

    //Quiero coger aquel elemento que yo hiz click quiero borrar
    let dataUserDelete = this.getAttribute("data-users");
    let refUsersDelete = refUsers.child(dataUserDelete);
    refUsersDelete.remove();

}

function updateUsers() {
    //Quiero coger aquel elemento que yo hiz click quiero borrar
    let dataUserUpdate = this.getAttribute("data-users");
    let refUsersUpdate = refUsers.child(dataUserUpdate);
    refUsersUpdate.once('value',function (snap) {
        var datos = snap.val();
        document.getElementById('users-name').value=datos.usersEmail;
        document.getElementById('users-last-name').value=datos.usersLastName;
        document.getElementById('users-email').value=datos.usersName;
        document.getElementById('users-password').value=datos.usersPassword;
        
    })
    document.getElementById('button-update')

}



const submitUsersFirebase = (event) => {
    event.preventDefault();
    refUsers.push({
        usersEmail: event.target.usersEmail.value,
        usersLastName: event.target.usersLastName.value,
        usersName: event.target.usersName.value,
        usersPassword: event.target.usersPassword.value,
    });
    //Para borrar una vez que guarda los archivos
    formUsers.reset();
}




