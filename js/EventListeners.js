console.log("Event Listeners file is loaded");

const customer = document.querySelector('.customer');

customer.addEventListener('click',function(){
    window.location.href = "/index.html#customer-section";
})

const item = document.querySelector('.item');

item.addEventListener('click',function(){
    window.location.href = "/index.html#item-section"
})


const order = document.querySelector('.order');

order.addEventListener('click',function(){
    window.location.href = "/index.html#order-section"
})




