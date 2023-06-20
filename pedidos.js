const urlP='http://localhost:8087/api/pedidos'

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
                `<td>${pedidos.Fecha}</td>`+
                `<td>${pedidos.Factura}</td>`+
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
    let Fecha = document.getElementById('fecha').value
    let Factura = document.getElementById('factura').value
    let Estado = document.getElementById('estado').value

    let pedido={
        Nit:Nit,
        Fecha:Fecha,
        Factura:Factura,
        Estado:Estado
    }
    const FechaA = new Date().toISOString().split('T')[0];
    if(Fecha==FechaA ){
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
    else{
            alert('La fecha no es correcta')
        }
}
const editar=(pedido)=>{
    let _id=document.getElementById('_id').value=''
    let Nit = document.getElementById('nit').value=''
    let Fecha = document.getElementById('fecha').value=''
    let Factura = document.getElementById('factura').value=''
    let Estado = document.getElementById('estado').value=''
    
    document.getElementById('_id').value=pedido._id
    document.getElementById('nit').value=pedido.Nit
    document.getElementById('fecha').value=pedido.Fecha
    document.getElementById('factura').value=pedido.Factura
    document.getElementById('estado').value=pedido.Estado
    


}
const actualizarPedido=async()=>{
    let Nit = document.getElementById('nit').value
    let Fecha = document.getElementById('fecha').value
    let Factura = document.getElementById('factura').value
    let Estado = document.getElementById('estado').value

    let pedido={
        _id:document.getElementById('_id').value,
        Nit:Nit,
        Fecha:Fecha,
        Factura:Factura,
        Estado:Estado
    }
    const FechaA = new Date().toISOString().split('T')[0];
    if(Fecha==FechaA ){
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
    else{
        alert('La fecha no es correcta')
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
