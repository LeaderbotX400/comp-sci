let nav = document.createElement("div");
nav.setAttribute("id", "nav-placeholder");
$.get("/navbar.html", function (data) {
  $("#nav-placeholder").replaceWith(data);
});
document.body.appendChild(nav);

let css = document.createElement("link");
css.rel = "stylesheet";
css.href = "/css/nav.css";
document.head.appendChild(css);

let faJS = document.createElement("script");
faJS.src = "https://pro.fontawesome.com/releases/v5.11.1/js/all.js";
faJS.crossOrigin = "anonymous";
document.head.appendChild(faJS);

let faCSS = document.createElement("link");
faCSS.rel = "stylesheet";
faCSS.href = "https://pro.fontawesome.com/releases/v5.11.1/css/all.css";
faCSS.crossOrigin = "anonymous";
document.head.appendChild(faCSS);
