let selectBox = document.querySelector(".select-box"),
   from = document.getElementById("from"),
   to = document.getElementById("to"),
   input = document.querySelector("input"),
   output = document.getElementById("output"),
   btn = document.querySelector("button"),
   dropLists = Array.from(document.getElementsByTagName("select")),
   imgs = document.getElementsByTagName("img"),
   switchIcon = document.querySelector(".exchange-icon");

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
   // Get countries flags images on select
   dropLists.forEach((dropList, index) => {
      dropList.addEventListener("change", () => {
         let fromVal = dropList.value.slice(0, -1).toLowerCase();
         imgs[index].src = `https://flagcdn.com/48x36/${fromVal}.png`
      })
   })
}

// Get Exchange Rate
btn.addEventListener("click", () => {
   getExchangeRate();
})


// Reversing currency codes on icon click
let lastRate;

switchIcon.addEventListener("click", () => {
   [from.value, to.value] = [to.value, from.value];
   if (lastRate != undefined) {
      lastRate = input.value / (input.value * lastRate); // 22 / (22 * 18.58)
      output.innerText = `${input.value} ${from.value} = ${(input.value * lastRate).toFixed(2)} ${to.value}`;
   }
   else getExchangeRate();
   // Reversing currency flags
   [imgs[0].src, imgs[1].src] = [imgs[1].src, imgs[0].src];
})

// Get Exchange Rate Function
function getExchangeRate() {
   if (input.value == '' || input.value == 0) {
      output.style.color = "red";
      output.innerText = "Enter amount and try again";
   } else {
      fetch(`https://v6.exchangerate-api.com/v6/7af49191bf482e5bd2719106/latest/${from.value}`)
         .then(response => response.json())
         .then(data => {
            let conversionRate = data.conversion_rates[to.value],
               result = (input.value * conversionRate).toFixed(2);
            lastRate = conversionRate;
            output.style.color = "#586376";
            output.style.fontSize = "14px";
            output.innerText = "Get Exchange Rate...";
            setTimeout(() => {
               window.innerWidth < 365 ? output.style.fontSize = "18px" : output.style.fontSize = "25px";
               output.innerText = `${input.value} ${from.value} = ${result} ${to.value}`;
            }, 800);
         });
   }
}