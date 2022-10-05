//! Jquery
// jquery popüler bir js kütüphanesidir. Avantajları:Dom işlemleri, animasyon işlemlerinde çok kulllanılıyor

const formJS = document.querySelectorAll("form")[0];
const inputJQ = $(".top-banner input").eq(0);
const msgJQ = $(".top-banner span").eq(0);
const formJquery = jQuery("form").eq(0);
const listJQ = $(".cities").eq(0);
// console.log(formJS);
// console.log(formJquery);
console.log(inputJQ);
// get(index), eq(index)

// window.onload=()=>{} ==> JS

//addEventListener==>on

$(window).on("load", () => {
  console.log("window.load");
});
