//! Jquery
// jquery popüler bir js kütüphanesidir. Avantajları:Dom işlemleri, animasyon işlemlerinde çok kulllanılıyor

const formJS = document.querySelectorAll("form")[0];
const inputJQ = $(".top-banner input").eq(0);
const msgJQ = $(".top-banner span").eq(0);
const formJquery = jQuery("form").eq(0);
const listJQ = $(".cities").eq(0);
const msg = document.querySelector("span.msg");
console.log(msg);
// console.log(formJS);
// console.log(formJquery);
// console.log(inputJQ);
// get(index), eq(index)

// window.onload=()=>{} ==> JS

//addEventListener==>on

$(window).on("load", () => {
  console.log("window.loaded");
});

$(document).ready(() => {
  console.log("DOMContentLoaded");
  localStorage.setItem(
    "apiKey",
    EncryptStringAES("e815a95d20a585101c219591fd494992")
  );
});

// formJquery.on("submit", (e) => { 1. kullanım
//   e.preventDefault();
//   getWeatherDataFromApi();
// });

formJquery.submit((e) => {
  // 2. kulllanım
  e.preventDefault();
  getWeatherDataFromApi();
});
//"e815a95d20a585101c219591fd494992"; //
const getWeatherDataFromApi = async () => {
  console.log("AJAX Func is called");
  const apiKey = DecryptStringAES(localStorage.getItem("apiKey"));
  console.log(apiKey);

  //? JS.value=jQuery.val()
  //   console.log(apiKey);
  const cityName = inputJQ.val();
  console.log(cityName);
  const units = "metric";
  const lang = "tr";

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${units}&lang=${lang}`;
  $.ajax({
    type: "GET",
    url: url,
    dataType: "json",
    success: (response) => {
      console.log(response);
      const { main, sys, name, weather } = response;

      const iconUrlAWS = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0].icon}.svg`;
      //alternative iconUrl
      const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

      // const createdLi= document.createElement("li");   created element in JS.

      // const createdLi=$(document.createElement("li")); altarnatif jQuery
      // weather card control

      //const cityCardList = listJQ.querySelector(".city"); js de kartları yakalama
      const cityCardList = listJQ.find(".city");
      console.log(cityCardList);
      // bu kart listesini array listesine çevirmek gerekiyor.
      const cityCardListArray = cityCardList.get();
      if (cityCardListArray.length > 0) {
        const filteredArray = cityCardListArray.filter(
          (li) => $(li).find("span").text() == name
        );
        if (filteredArray.length > 0) {
          // msg.innerText =
          //   msg.innerText = `You already know the weather for ${name}, Please search for another city 😉`;
          // setTimeout(() => {
          //   msg.innerText = "";
          // }, 5000);
          msgJQ.text(
            `You already know the weather for ${name}, Please search for another city 😉`
          );
          msgJQ.css({ color: "red", "text-decoration": "underline" });
          return;
        }
      }

      const createdLi = $("<li></li>");
      createdLi.addClass("city");
      createdLi.html(`<h2 class="city-name" data-name="${name}, ${sys.country}">
                <span>${name}</span>
                <sup>${sys.country}</sup>
            </h2>
            <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
            <figure>
                <img class="city-icon" src="${iconUrl}">
                <figcaption>${weather[0].description}</figcaption>
            </figure>`);

      //append ve prepend jq ile çalışıyor.
      listJQ.prepend(createdLi);
      // formJS.reset(); js de ki çalşıyor.
      formJquery.trigger("reset"); // reset form eventidir.
    },
    beforeSend: (request) => {
      console.log("before ajax send");
    },
    complete: () => {
      console.log("after ajax send");
    },
    error: (XMLHttpRequest) => {
      //logging
      //postErrorLog(p1,p2,p3,p4);
      console.log(XMLHttpRequest);
      msgJQ.text(`${XMLHttpRequest.status} ${XMLHttpRequest.statusText}`);
      //styling
      msgJQ.css({ color: "red", "text-decoration": "underline" });
    },
  });
};

// XMLHTTPREQUEST(xhr) vs. fetch() vs. axios vs. $.ajax //! bu 4 farklı yöntemle api ye veri gönderip çekebiliriz.
