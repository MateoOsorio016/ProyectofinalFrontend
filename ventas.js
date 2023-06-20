const urlV= 'http://localhost:8087/api/ventas'

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

    let venta={
        Factura:Factura,
        Subtotal:Subtotal,
        IVA:IVA
        
    }
    if(Subtotal>0 && IVA>0){
        fetch(urlV,{
            method:'POST',
            mode:'cors',
            body:JSON.stringify(venta),
            headers:{'Content-Type':'application/json; charset=UTF-8'}
        })
        .then(response =>response.json())
        .then(json=>{
            alert(json.mensaje)
        })
    }
    else{
        alert('Ingrese los datos correctamente, los valores de subtotal o IVA no pueden ser menores de 1')
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
    if(Subtotal>0 && IVA>0){
        let totalCalculado = parseFloat(Subtotal) + (parseFloat(Subtotal) * (parseFloat(IVA) / 100));
        venta.Total = totalCalculado;
        fetch(urlV,{
            method:'PUT',
            mode:'cors',
            body:JSON.stringify(venta),
            headers:{'Content-Type':'application/json; charset=UTF-8'}
        })
       .then(response =>response.json())
       .then(json=>{
        alert(json.mensaje)
       })
    }
    else{
        alert('Ingrese los datos correctamente, los valores de subtotal o IVA no pueden ser menores de 1')
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