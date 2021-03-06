firebase.initializeApp({
    apiKey: 'AIzaSyC3-Ko-NLEwcZEnIRY0sOiR1H-fa3bE1fk',
    authDomain: 'red-social-867d8.firebaseapp.com',
    projectId: 'red-social-867d8',
  });
  //Se agregan los siguientes campos como registro
  //  DB Initialize Cloud Firestore through Firebase
  let db = firebase.firestore();
  
const guardar1 = () =>{
    //obtener valores
    let comentario1 = document.getElementById('comentario1').value;
    db.collection('users').add({
        first: comentario1
        
    })
    //se agrego correctamente lo anterior aparecera el mensaje del docRef.id
    .then(docRef=> {
        console.log('Document written with ID: ', docRef.id);
        //limpiar campos al enviar ya un comentario
        let comentario1=document.getElementById('comentario1').value = '';
    })
    .catch(error=> {
        console.error('Error adding document: ', error);
    });

}

//para poder leer y pintar los datos 
let paint = document.getElementById('getcomentario1').value;
//LLAMA DB (INICIACION DE FIRESTORE) EN NUESTRO CASO LA COLECCIÓN ES USUARIO
//se susutituye .get para que este mostrando los datos en tiempo real
db.collection('users').onSnapshot((querySnapshot) => {
    getcomentario1.innerHTML='';
    //FOR EACHE SE REPIETIRA EN CADA DOCUMENTO DE USER
    querySnapshot.forEach((doc) => {
        //SE PINTARA EL ID Y LO QUE CONTIENE
        console.log(`${doc.id} => ${doc.data().first}`);
        
        getcomentario1.innerHTML += `
        <div class="comentario-publicado">
            <div class="comentario">${doc.data().first}</div>
            <!--BOTONES-->
            <!--Por cada boton que se crea contiene los datos-->
            <div class="all-botones">
                <button type="button" class="btn boton-comentario" onclick="editar('${doc.id}', '${doc.data().first}')">
                    <img src="../images/editar1.png" class="img-comentario" alt="editar">Editar
                </button>
                <button type="button" class="btn boton-comentario" onclick="eliminar('${doc.id}')">
                    <img src="../images/cubo-de-la-basura1.png" class="img-comentario" alt="editar">Borrar
                </button>
                <button type="button" class="btn boton-comentario">
                    <img src="../images/corazon-en-boceto1.png" class="img-comentario" alt="editar">Like
                </button>
                <button type="button" class="btn boton-comentario">
                    <img src="../images/corazon1.png" class="img-comentario" alt="editar">Dislike
                </button>
            </div>
        </div>
        
        `
    });
});


//borrar datos
const eliminar = (id) => {
    db.collection('users').doc(id).delete().then(function() {
        console.log('Document successfully deleted!');
    })
    .catch(error=> {
        console.error('Error removing document: ', error);
    });
}


//editar datos

 const editar1 = (id,comentario1) =>{

    document.getElementById('comentario1').value = comentario1;
    //el boton con este id"guardar" se modificara su texto html a editar
    let editar1 = document.getElementById('editar1');
    // editar.innerHTML = 'Editar';
   
    //Al presionar el boton q dice editar c correra la sig funcion
       editar1.onclick= function() { 
        let washingtonRef = db.collection('users').doc(id);
        // Set the "capital" field of the city 'DC'
    let comentario1 = document.getElementById('comentario1').value;
    return washingtonRef.update({
        first: comentario1
       
    })
    .then(fuction=> {
        console.log('Document successfully updated!');
        // boton.innerHTML = 'Editar';
        document.getElementById('comentario1').value='';
    })
    .catch(error=> {
        // The document probably doesn't exist.
        console.error('Error updating document: ', error);
    });
    };
         
};