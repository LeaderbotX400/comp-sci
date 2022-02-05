let nav = document.createElement("div");
nav.setAttribute("id", "nav-placeholder")
$.get("/navbar.html", function (data) {
    $("#nav-placeholder").replaceWith(data);
});
document.body.appendChild(nav);