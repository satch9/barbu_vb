const socket = io();

function afficheMessage(d) {
  let message = document.getElementById("message");
  let ul = document.createElement("ul");
  let content = document.createTextNode(d.message);
  ul.id = "messageLi";
  message.append(ul);
  let li = document.createElement("li");
  li.appendChild(content);
  let ulLi = document.getElementById("messageLi");
  ulLi.append(li);
}

socket.on("enattente", data => {
  afficheMessage(data);
});
socket.on("init", data => {
  afficheMessage(data);
  console.log("init ", data);
});
socket.on("quota", data => {
  afficheMessage(data);
  console.log("quota ", data);
});

let usernameForm = document.getElementById("usernameForm");

usernameForm.addEventListener("submit", ev => {
  ev.stopImmediatePropagation();

  // get input pseudo
  let pseudo = document.getElementById("username").value;
  console.log("pseudo ", pseudo);
});
