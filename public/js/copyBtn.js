var codeBlocs = document.getElementsByClassName("code");

function copyToClipboard(text) {
    var aux = document.createElement("div");
    aux.setAttribute("contentEditable", true);
    aux.innerHTML = text;
    aux.setAttribute("onfocus", "document.execCommand('selectAll',false,null)");
    document.body.appendChild(aux);
    var x = window.scrollX, y = window.scrollY;
    aux.focus();
    window.scrollTo(x, y);
    document.execCommand("copy");
    document.body.removeChild(aux);
}

for (var i = 0; i < codeBlocs.length; i++) {
    let p = document.createElement("button")
    p.innerText = "Copy"
    p.classList.add("copyBtn")
    p.addEventListener('click', () => {
        p.innerText = ""
        copyToClipboard(p.parentElement.innerHTML)
        p.innerText = "Copied!";
        p.style.backgroundColor = "green"
        setTimeout(() => {
            p.innerText = "Copy"
            p.style.backgroundColor = "#5c636a"
        }, 3000);
    })

    codeBlocs[i].prepend(p)
}

