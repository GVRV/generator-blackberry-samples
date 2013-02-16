function ready() {
    var ele = document.createElement("div");
    ele.innerHTML = "uuid: " + blackberry.identity.uuid;
    document.documentElement.appendChild(ele);
}

window.addEventListener("load", function(e) {
    document.addEventListener("webworksready", ready);
}, false);