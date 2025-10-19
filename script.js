const mobile_menu=document.getElementById("mobile-menu");
const hamberger=document.querySelector(".hamberger");
hamberger.addEventListener("click",()=>{
    mobile_menu.classList.toggle("active");
})