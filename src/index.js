

const year= document.getElementById('year');
const date = new Date().getFullYear();
year.textContent = date;

const sided= document.querySelector(".side");
const sidebar= document.querySelector(".fa-solid");
sidebar.addEventListener("click", ()=>{
    sided.classList.toggle('hidden');
});