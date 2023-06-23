const url = 'https://coffevart.onrender.com/api/proveedores'
const listarproveedores =async()=>{
    let body= document.getElementById('contenido');
    if(body){
        let mensaje=''

        fetch(url)
        .then(res=> res.json())
        .then(function(data){
            let listarproveedores=data.proveedores
            listarproveedores.map((proveedores)=>{
                mensaje+= `<tr><td>${proveedores.Nit}</td>`+
                `<td>${proveedores.Nombre}</td>`+
                `<td>${proveedores.Telefono}</td>`+
                `<td>${proveedores.Cantidad}</td>`+
                `<td>${proveedores.Factura}</td>`+
                `<td>${proveedores.Fecha}</td>`+
                `<td>${proveedores.Estado}</td>`+

                `<td><a class="waves-effect waves-light btn modal-trigger" href="#modal1" onclick='editar(${JSON.stringify(proveedores)})'>Editar</a>
                 <a class="waves-effect waves-light btn modal-trigger red" href="#" onclick='eliminar("${proveedores._id}")'>Eliminar</a>
                </td></tr>`
                body.innerHTML = mensaje
            }
            )
        })

        }
    }

listarproveedores()
const registrarProveedores = async() =>{
    let Nit = document.getElementById('nit').value
    let Nombre = document.getElementById('nombre').value
    let Telefono = document.getElementById('telefono').value
    let Factura = document.getElementById('factura').value
    let Cantidad=document.getElementById('cantidad').value
    let Fecha = document.getElementById('fecha').value
    let Estado = document.getElementById('estado').value


    let proveedor = {
        Nit: Nit,
        Nombre:Nombre,
        Telefono:Telefono,
        Factura:Factura,
        Cantidad:Cantidad,
        Fecha:Fecha,
        Estado:Estado,
        
    }
    const FechaA = new Date().toISOString().split('T')[0];
    if(Fecha==FechaA && Cantidad>0 ){
        fetch(url, {
            method: 'POST',
            mode: 'cors',
            body:JSON.stringify(proveedor),
            headers: {"Content-type": "application/json; charset=UTF-8"}     
        })
        .then(response => response.json()) //La respuesta del método POST de la API
        .then(json => {
           alert(json.mensaje)
        })
    }
    else{
        alert('Datos incorrectos, recuerde que la fecha debe ser la de hoy y la cantidad no puede ser 0')
    }
    console.log(proveedor)
}
const editar = (proveedor) =>{
    let _id =document.getElementById('_id').value = ''
    let Nombre = document.getElementById('nombre').value=''
    let Nit = document.getElementById('nit').value=''
    let Cantidad=document.getElementById('cantidad').value=''
    let Telefono = document.getElementById('telefono').value=''
    let Factura = document.getElementById('factura').value=''
    let Fecha = document.getElementById('fecha').value=''
    let Estado = document.getElementById('estado').value=''

    document.getElementById('_id').value=proveedor._id
    document.getElementById('nombre').value=proveedor.Nombre
    document.getElementById('nit').value=proveedor.Nit
    document.getElementById('cantidad').value=proveedor.Cantidad
    document.getElementById('telefono').value=proveedor.Telefono
    document.getElementById('factura').value=proveedor.Factura
    document.getElementById('fecha').value=proveedor.Fecha
    document.getElementById('estado').value=proveedor.Estado
}
const actualizarUsuario = async() =>{
    //Captura de valores de datos enviados desde el formulario
    let Nombre = document.getElementById('nombre').value
    let Nit = document.getElementById('nit').value
    let Cantidad=document.getElementById('cantidad').value
    let Telefono = document.getElementById('telefono').value
    let Factura = document.getElementById('factura').value
    let Fecha = document.getElementById('fecha').value
    let Estado = document.getElementById('estado').value

    let proveedor = {
        _id: document.getElementById('_id').value,
        Nit: Nit,
        Nombre:Nombre,
        Cantidad:Cantidad,
        Telefono:Telefono,
        Factura:Factura,
        Fecha:Fecha,
        Estado:Estado,
        }

    const FechaA = new Date().toISOString().split('T')[0];
    if(Fecha===FechaA ){
        fetch(url, {
            method: 'PUT',
            mode: 'cors',
            body:JSON.stringify(proveedor),
            headers: {"Content-type": "application/json; charset=UTF-8"}     
        })
        .then(response => response.json()) //La respuesta del método POST de la API
        .then(json => {
            alert(json.mensaje)
        })
    }
    else{
        alert('La fecha debe ser mayor a la de hoy');
        }
}
const eliminar =(_id) => {
    if(confirm('¿Está seguro de realizar la eliminación?') == true){
            //Captura de valores de datos enviados desde el formulario
    let proveedor = {
        _id: _id
    }
    
    

       fetch(url, {
            method: 'DELETE',
            mode: 'cors',
            body:JSON.stringify(proveedor),
            headers: {"Content-type": "application/json; charset=UTF-8"}     
        })
        .then(response => response.json()) //La respuesta del método POST de la API
        .then(json => {
           alert(json.mensaje)
        })     
    }
}

if(document.querySelector('#btnRegistrar'))
{
    document.querySelector('#btnRegistrar')
    .addEventListener('click', registrarProveedores)
}
if(document.querySelector('#btnActualizar')){
    document.querySelector('#btnActualizar')
    .addEventListener('click', actualizarUsuario)

}



