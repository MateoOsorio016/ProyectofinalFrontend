const urlV= 'https://coffevart.onrender.com/api/ventas'

const listarventas=async()=>{
    let body= document.getElementById('contenido');
    if(body){
        let mensaje=''
        fetch(urlV)
        .then(res=> res.json())
        .then(function(data){
            let listarventas=data.ventas
            listarventas.map((ventas)=>{
                mensaje+= `<tr><td>${ventas.Factura}</td>`+
                `<td>${ventas.Cliente}</td>`+
                `<td>${ventas.Producto}</td>`+
                `<td>${ventas.Subtotal}</td>`+
                `<td>${ventas.IVA}</td>`+
                `<td>${ventas.Total}</td>`+

                `<td><a class="waves-effect waves-light btn modal-trigger" href="#modal1" onclick='editar(${JSON.stringify(ventas)})'>Editar</a>
                <a class="waves-effect waves-light btn modal-trigger red" href="#" onclick='eliminar("${ventas._id}")'>Eliminar</a>
               </td></tr>`
               body.innerHTML = mensaje
            })
        })
    }
}
listarventas();

const registrarVentas= async()=>{
    let Factura=document.getElementById('factura').value;
    let Subtotal=document.getElementById('subtotal').value;
    let IVA=document.getElementById('iva').value;
    let Cliente=document.getElementById('cliente').value;
    let Producto=document.getElementById('producto').value;

    let venta={
        Factura:Factura,
        Cliente:Cliente,
        Producto:Producto,
        Subtotal:Subtotal,
        IVA:IVA
        
    }
  const regexNombre = /^[a-zA-Z\s]+$/;
  if (Subtotal <= 0) {
    alert('El subtotal no puede ser menor a 0');
} else if (IVA < 0) {
    alert('El IVA no puede ser menor a 0');
} else if(!regexNombre.test(Nombre)) {
	alert('El cliente no puede llevar caracteres numericos')
   
} else if (!regexNombre.test(Producto)) 
  alert('El producto no puede llevar caracteres numericos')
}else{

fetch(urlV, {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(venta),
        headers: {'Content-Type': 'application/json; charset=UTF-8'}
    })
    .then(response => response.json())
    .then(json => {
        alert(json.mensaje);
    });  
    }
}

const editar=(venta)=>{
    let _id=document.getElementById('_id').value=''
    let Factura=document.getElementById('factura').value=''
    let Subtotal=document.getElementById('subtotal').value=''
    let IVA=document.getElementById('iva').value=''

    document.getElementById('_id').value=venta._id
    document.getElementById('factura').value=venta.Factura
    document.getElementById('subtotal').value=venta.Subtotal
    document.getElementById('iva').value=venta.IVA
}

const actualizarVenta=async()=>{
    let Factura=document.getElementById('factura').value;
    let Subtotal=document.getElementById('subtotal').value;
    let IVA=document.getElementById('iva').value;

    let venta={
        _id:document.getElementById('_id').value,
        Factura:Factura,
        Subtotal:Subtotal,
        IVA:IVA
    }
   if (Subtotal <= 0) {
    alert('El subtotal no puede ser menor a 0');
} else if (IVA < 0) {
    alert('El IVA no puede ser menor a 0');
} else {
    fetch(urlV, {
        method: 'PUT',
        mode: 'cors',
        body: JSON.stringify(venta),
        headers: {'Content-Type': 'application/json; charset=UTF-8'}
    })
    .then(response => response.json())
    .then(json => {
        alert(json.mensaje);
    });
}
}







const eliminar=(_id)=>{
    if(confirm('¿Esta seguro de realizar la eliminacion?')==true){
        let venta={
            _id:_id
        }
        fetch(urlV,{
            method:'DELETE',
            mode:'cors',
            body:JSON.stringify(venta),
            headers:{'Content-Type':'application/json; charset=UTF-8'}
        })
        .then(response => response.json())
        .then(json=>{
            alert(json.mensaje)
        })
    }
}


if (document.querySelector('#btnRegistrarVenta'))
{
    document.querySelector('#btnRegistrarVenta')
   .addEventListener('click',registrarVentas)
}
if (document.querySelector('#btnActualizarVenta'))
{
    document.querySelector('#btnActualizarVenta')
   .addEventListener('click',actualizarVenta)
}
