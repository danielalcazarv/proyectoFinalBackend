//Inicializa Socket.io
const socket = io();

//Mostrar Chat
function renderChat(data){
    const html = data.map((mensaje, index)=>{
        const date = new Date (mensaje.timestamp).toLocaleString()
        if ( mensaje.type == "USER"){
            return(`
            <div class='d-flex flex-row'>
                <p class='pt-3 pe-3 text-primary fw-bold'>${mensaje.type}</p>
                <p class='pt-3 pe-3 text-primary fw-bold'>${mensaje.username}</p>
                <p class='pt-3 pe-1 timestamp'>[${date}]</p>
                <p class='pt-3 pe-3 text-success fst-italic'>: ${mensaje.mensaje}</p>
            </div>
            `)
        }else{
            return(`
            <div class='d-flex flex-row'>
                <p class='pt-3 pe-3 text-danger fw-bold'>${mensaje.type}</p>
                <p class='pt-3 pe-3 text-danger fw-bold'>${mensaje.username}</p>
                <p class='pt-3 pe-1 timestamp'>[${date}]</p>
                <p class='pt-3 pe-3 text-success fst-italic'>: ${mensaje.mensaje}</p>
            </div>
            `)
        };
    }).join('');
    document.getElementById('mensajes').innerHTML = html;
};

socket.on('mensajes', data =>{
    renderChat(data)
});

//Ingresar mensaje
function addMsg(e){
    const username = document.getElementById('username');
    const msjInput = document.getElementById('mensaje');
    const timestamp = new Date();
    const admin = document.getElementById('admin');
    let type;
    if(admin.value === 'true'){
        type = "ADMIN";
    }else{
        type = "USER";
    };
    const mensaje = {
        username: username.value,
        mensaje: msjInput.value,
        timestamp: timestamp,
        type: type
    };
    socket.emit('new-mensaje', mensaje);
    msjInput.value='';
    return false;
}

