let selectBox = document.querySelector(".select-box"),
    from = document.getElementById("from"),
    to = document.getElementById("to"),
    input = document.querySelector("input"),
    output = document.getElementById("output"),
    btn = document.querySelector("button");

getCurrencyCode();

// Change select box background color on focus
from.addEventListener("focus", () => {
   selectBox.style.backgroundColor = "#fff";
   from.style.color = "#586376";
})
from.addEventListener("blur", () => {
   selectBox.style.backgroundColor = "#586376";
   from.style.color = "#fff";
})

// Getting currency code of all country and inserting it inside select tag
async function getCurrencyCode() {
   let res = await fetch(`https://v6.exchangerate-api.com/v6/7af49191bf482e5bd2719106/latest/AUD`),
       resData = await res.json();
   let names = Array.from(Object.getOwnPropertyNames(resData.conversion_rates))
   names.forEach((name, index) => {
      name = names[index];
      // Set USD and EGP as default inputs
      if (name == 'USD') {
         from.innerHTML += `<option value="${name}" selected>${name}</option>`;
      } else from.innerHTML += `<option value="${name}">${name}</option>`;
      if (name == 'EGP') {
         to.innerHTML += `<option value="${name}" selected>${name}</option>`;
      } else to.innerHTML += `<option value="${name}">${name}</option>`;
   })
}
