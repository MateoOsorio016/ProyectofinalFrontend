const urlP='https://coffevart.onrender.com/api/pedidos'

const listarpedidos=async()=>{
    let body=document.getElementById('contenido')
    if(body){
        let mensaje=''
        fetch(urlP)
        .then(res=>res.json())
        .then(function(data){
            let listarpedidos=data.pedidos
            listarpedidos.map((pedidos)=>{
                mensaje+= `<tr><td>${pedidos.Nit}</td>`+
                `<td>${pedidos.Cliente}</td>`+
                `<td>${pedidos.Producto}</td>`+
                `<td>${pedidos.Cantidad}</td>`+
                `<td>${pedidos.Fecha}</td>`+
                `<td>${pedidos.Factura}</td>`+
                `<td>${pedidos.Total}</td>`+
                `<td>${pedidos.Estado}</td>`+
                `<td><a class="waves-effect waves-light btn modal-trigger" href="#modal1" onclick='editar(${JSON.stringify(pedidos)})'>Editar</a>
                <a class="waves-effect waves-light btn modal-trigger red" href="#" onclick='eliminar("${pedidos._id}")'>Eliminar</a>
               </td></tr>`
               body.innerHTML = mensaje
            })
        })
    }
}
listarpedidos();

const registrarPedidos=async()=>{
    let Nit = document.getElementById('nit').value
    let Proveedor=  document.getElementById('proveedor').value
    let Producto=  document.getElementById('producto').value
    let Cantidad=  document.getElementById('cantidad').value
    let Fecha = document.getElementById('fecha').value
	let Categoria= document.getElementById('categoria').value
    let Factura = document.getElementById('factura').value
    let Estado = document.getElementById('estado').value

    let pedido={
        Nit:Nit,
        Proveedor:Proveedor,
        Producto:Producto,
        Cantidad:Cantidad,
        Fecha:Fecha,
        Factura:Factura,
	Categoria:Categoria,
        Estado:Estado
    }
    const FechaA = new Date().toISOString().split('T')[0];
    const regexNombre = /^[a-zA-Z\s]+$/;
    if(Fecha<FechaA ){
        Alert('La fecha no puede ser mayor a la de hoy')
    }else if(!regexNombre.test(Producto)){
	alert('El producto no puede llevar caracteres numericos')
}else if(Cantidad<=0){
	alert('La cantidad debe ser mayor a 0')
}else{
	fetch(urlP,{
            method:'POST',
            mode:'cors',
            body:JSON.stringify(pedido),
            headers:{'Content-Type':'application/json; charset=UTF-8'}
            
        })
        .then(response=>response.json())
        .then(json=>{
            alert(json.mensaje);
        })
    }
}
const editar=(pedido)=>{
    let _id=document.getElementById('_id').value=''
    let Nit = document.getElementById('nit').value=''
    let Proveedor=  document.getElementById('proveedor').value=''
    let Producto=  document.getElementById('producto').value=''
    let Cantidad=  document.getElementById('cantidad').value=''
    let Fecha = document.getElementById('fecha').value=''
    let Factura = document.getElementById('factura').value=''
let Categoria= document.getElementById('categoria').value=''
    let Estado = document.getElementById('estado').value=''
    
    document.getElementById('_id').value=pedido._id
    document.getElementById('nit').value=pedido.Nit
    document.getElementById('proveedor').value=pedido.Proveedor
    document.getElementById('producto').value=pedido.Producto
    document.getElementById('cantidad').value=pedido.Cantidad
    document.getElementById('fecha').value=pedido.Fecha
    document.getElementById('factura').value=pedido.Factura
document.getElementById('categoria').value=pedido.Categoria
    document.getElementById('estado').value=pedido.Estado
    


}
const actualizarPedido=async()=>{
    let Nit = document.getElementById('nit').value
    let Proveedor=  document.getElementById('proveedor').value
    let Producto=  document.getElementById('producto').value
    let Cantidad=  document.getElementById('cantidad').value
    let Fecha = document.getElementById('fecha').value
    let Factura = document.getElementById('factura').value
let Categoria= document.getElementById('categoria').value
    let Estado = document.getElementById('estado').value

    let pedido={
        _id:document.getElementById('_id').value,
        Nit:Nit,
        Proveedor:Proveedor,
        Producto:Producto,
        Cantidad:Cantidad,
        Fecha:Fecha,
        Factura:Factura,
	Categoria:Categoria,
        Estado:Estado
    }
    const FechaA = new Date().toISOString().split('T')[0];
const regexNombre = /^[a-zA-Z\s]+$/;
    if(Fecha<FechaA ){
        Alert('La fecha no puede ser mayor a la de hoy')
    }else if(!regexNombre.test(Producto)){
	alert('El producto no puede llevar caracteres numericos')
}else if(Cantidad<=0){
	alert('La cantidad debe ser mayor a 0')
}else{
	fetch(urlP,{
            method:'PUT',
            mode:'cors',
            body:JSON.stringify(pedido),
            headers:{'Content-Type':'application/json; charset=UTF-8'}
            
        })
        .then(response=>response.json())
        .then(json=>{
            alert(json.mensaje);
        })
    }
}

const eliminar=(_id)=>{
    if(confirm('¿Esta seguro de realizar la eliminacion?')==true){
        let pedido={
            _id:_id
        }
        fetch(urlP,{
            method:'DELETE',
            mode:'cors',
            body:JSON.stringify(pedido),
            headers:{'Content-Type':'application/json; charset=UTF-8'}
        })
        .then(response=>response.json())
        .then(json=>{
            alert(json.mensaje);
        })
    }
}

if (document.querySelector('#btnRegistrarPedido'))
{
    document.querySelector('#btnRegistrarPedido')
   .addEventListener('click',registrarPedidos)
}
if (document.querySelector('#btnActualizarPedido'))
{
    document.querySelector('#btnActualizarPedido')
   .addEventListener('click',actualizarPedido)
}
