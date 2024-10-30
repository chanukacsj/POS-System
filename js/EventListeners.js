console.log("Event Listeners file is loaded");

const customer = document.querySelector('.customer');

customer.addEventListener('click',function(){
    window.location.href = "/pages/customer.html"
})

const item = document.querySelector('.item');

item.addEventListener('click',function(){
    window.location.href = "/pages/items.html"
})


const order = document.querySelector('.order');

order.addEventListener('click',function(){
    window.location.href = "/pages/orders.html"
})




