const socket = io();

function afficheMessage(d) {
    let message = document.getElementById("message");
    let ul = document.createElement("ul")

    let li = document.createElement("li");
    let content = document.createTextNode(d.message);
    li.appendChild(content);
    message.append(li);
}



socket.on("enattente", data => {
    afficheMessage(data);
});
socket.on('init', data => {
    afficheMessage(data);
    console.log(data);
});
socket.on('quota', data => {
    afficheMessage(data);
    console.log(data);
});