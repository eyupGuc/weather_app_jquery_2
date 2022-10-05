//! Jquery
// jquery popüler bir js kütüphanesidir. Avantajları:Dom işlemleri, animasyon işlemlerinde çok kulllanılıyor

const formJS = document.querySelectorAll("form")[0];
const inputJQ = $(".top-banner input").eq(0);
const msgJQ = $(".top-banner span").eq(0);
const formJquery = jQuery("form").eq(0);
const listJQ = $(".cities").eq(0);
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
    },
    beforeSend: (request) => {
      console.log("before ajax send");
    },
    complete: () => {
      console.log("after ajax send");
    },
    error: (XMLHttpRequest) => {
      console.log(XMLHttpRequest);
    },
  });
};

// XMLHTTPREQUEST(xhr) vs. fetch() vs. axios vs. $.ajax //! bu 4 farklı yöntemle api ye veri gönderip çekebiliriz.
