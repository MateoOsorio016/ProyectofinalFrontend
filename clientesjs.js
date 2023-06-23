const urlC= 'https://coffevart.onrender.com/api/clientes'

const listarclientes=async ()=>{
    let body= document.getElementById('contenido');
    if(body){
        let mensaje=''
        fetch(urlC)
        .then(res=> res.json())
        .then(function(data){
            let listarclientes=data.clientes
            listarclientes.map((clientes)=>{
                mensaje+= `<tr><td>${clientes.Nombre}</td>`+
                `<td>${clientes.Apellido}</td>`+
                `<td>${clientes.Documento}</td>`+
                `<td>${clientes.Email}</td>`+
                `<td>${clientes.Telefono}</td>`+
                `<td>${clientes.Direccion}</td>`+
                `<td>${clientes.Estado}</td>`+

                `<td><a class="waves-effect waves-light btn modal-trigger" href="#modal1" onclick='editar(${JSON.stringify(clientes)})'>Editar</a>
                <a class="waves-effect waves-light btn modal-trigger red" href="#" onclick='eliminar("${clientes._id}")'>Eliminar</a>
               </td></tr>`
               body.innerHTML = mensaje


            
            }
            )

        })
    }
  
}
listarclientes();
const registrarClientes=async()=>{
    let Nombre= document.getElementById('nombre').value
    let Apellido= document.getElementById('apellido').value
    let Documento= document.getElementById('documento').value
    let Email= document.getElementById('email').value
    let Telefono= document.getElementById('telefono').value
    let Direccion= document.getElementById('direccion').value
    let Estado = document.getElementById('estado').value

    let cliente= {
        Nombre:Nombre,
        Apellido:Apellido,
        Documento:Documento,
        Email:Email,
        Telefono:Telefono,
        Direccion:Direccion,
        Estado:Estado

    }
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const regexNombre= /^[a-zA-Z\s]+$/
    if(regexEmail.test(Email) || regexNombre.test(Nombre) || regexNombre.test(Apellido) ){
        fetch(urlC,{
            method: 'POST',
            mode: 'cors',
            body:JSON.stringify(cliente),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then(response => response.json())
        .then(json=>{
            alert(json.mensaje)
        })

    }
    else{
        alert('Verificar los datos ingresados')

    }
    console.log(cliente)

}
const editar = (cliente)=>{
    let _id= document.getElementById('_id').value=''
    let Nombre= document.getElementById('nombre').value=''
    let Apellido= document.getElementById('apellido').value=''
    let Documento= document.getElementById('documento').value=''
    let Email= document.getElementById('email').value=''
    let Telefono= document.getElementById('telefono').value=''
    let Direccion= document.getElementById('direccion').value=''
    let Estado = document.getElementById('estado').value=''

    document.getElementById('_id').value=cliente._id
    document.getElementById('nombre').value=cliente.Nombre
    document.getElementById('apellido').value=cliente.Apellido
    document.getElementById('documento').value=cliente.Documento
    document.getElementById('email').value=cliente.Email
    document.getElementById('telefono').value=cliente.Telefono
    document.getElementById('direccion').value=cliente.Direccion
    document.getElementById('estado').value=cliente.Estado


    

}
const actualizarCliente=async()=>{
    let Nombre= document.getElementById('nombre').value
    let Apellido= document.getElementById('apellido').value
    let Documento= document.getElementById('documento').value
    let Email= document.getElementById('email').value
    let Telefono= document.getElementById('telefono').value
    let Direccion= document.getElementById('direccion').value
    let Estado = document.getElementById('estado').value

    let cliente= {
        _id:document.getElementById('_id').value,
                Nombre:Nombre,
                Apellido:Apellido,
                Documento:Documento,
                Email:Email,
                Telefono:Telefono,
                Direccion:Direccion,
                Estado:Estado
    }
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(regexEmail.test(Email)){
        fetch(urlC,{
            method: 'PUT',
            mode: 'cors',
            body:JSON.stringify(cliente),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then(response => response.json())
        .then(json=>{
            alert(json.mensaje)
        })

    }
    else{
        alert('Formato de email de invalido')

    }
    
}
const eliminar=  (_id)=>{
  if(confirm('¿Esta seguro de realizar la eliminacion?')== true){
    let cliente={
      _id:_id
    }
    fetch(urlC,{
      method: 'DELETE',
            mode: 'cors',
            body:JSON.stringify(cliente),
            headers: {"Content-type": "application/json; charset=UTF-8"}
  })
  .then(response => response.json())
  .then(json=>{
    alert(json.mensaje)
    })
  }

}
if (document.querySelector('#btnRegistrarCliente'))
{
    document.querySelector('#btnRegistrarCliente')
   .addEventListener('click',registrarClientes)
}
if (document.querySelector('#btnActualizarCliente'))
{
    document.querySelector('#btnActualizarCliente')
  .addEventListener('click',actualizarCliente)
}
