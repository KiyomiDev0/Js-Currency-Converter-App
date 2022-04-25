let selectBox = document.querySelector(".select-box"),
    from = document.getElementById("from")



// Change select box background color on focus
from.addEventListener("focus", () => {
   selectBox.style.backgroundColor = "#fff";
   from.style.color = "#586376";
})
from.addEventListener("blur", () => {
   selectBox.style.backgroundColor = "#586376";
   from.style.color = "#fff";
})