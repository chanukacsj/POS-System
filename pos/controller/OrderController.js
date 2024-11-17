import { customer_arr, item_arr, order_arr, cart_arr, orderDetail_arr } from "../db/database.js";
import OrderModel from "../model/orderModel.js";
import OrderDetailModel from "../model/orderDetail.js";

export function loadCustomers() {
    $("#customers").empty();
    $("#customers").append('<option value="">Select a customer</option>');
    customer_arr.forEach(item => {
        let option = `<option value="${item._customer_id}">${item._customer_id}</option>`;
        $("#customers").append(option);
    });
}

export function loadItems() {
    $("#itemSea").empty();
    $("#itemSea").append('<option value="">Select an item</option>');
    item_arr.forEach(item => {
        let option = `<option value="${item._item_code}">${item._item_code}</option>`;
        $("#itemSea").append(option);
    });
}

$(document).ready(function () {
    $("#orderId").val(generateOrderId());
    loadCustomers();
    loadItems();
});

let generateOrderId = function generateOrderId() {
    let id = order_arr.length + 1;
    return "O0" + id;
}

$("#itemSea").on('change', function () {
    let id = $(this).val();
    let item = item_arr.find(item => item._item_code === id);
    if (item) {
        $("#itemName").val(item._name);
        $("#itemPrice").val(item._unitPrice);
        $("#itemQtyOnHand").val(item._qty);
    } else {
        $("#itemName").val("");
        $("#itemPrice").val("");
        $("#itemQtyOnHand").val("");
    }
});

$("#customers").on('change', function () {
    let selectedId = $(this).val();
    let customer = customer_arr.find(item => item._customer_id === selectedId);
    if (customer) {
        $("#customerName").val(customer._name);
    } else {
        $("#customerName").val('');
    }
});

const loadCartTable = () => {
    $('#orderTableBody').empty(); // Clear previous entries
    cart_arr.forEach(item => {
        let data = `<tr>
                        <td>${item.item_code}</td>
                        <td>${item.description}</td>
                        <td>${item.unit_price}</td>
                        <td>${item.qty}</td>
                        <td>${item.total}</td>
                    </tr>`;
        $('#orderTableBody').append(data);
    });
}

$('#orSaveBtn').on('click', function () {
    let item_code = $("#itemSea").val();
    let description = $("#itemName").val();
    let unit_price = parseFloat($("#itemPrice").val());
    let qtyOnHand = parseInt($("#itemQtyOnHand").val());
    let qty = parseInt($("#itemQty").val());

    if (qty > qtyOnHand) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Not enough quantity!",
        });
        return;
    }

    if (!item_code || !description || isNaN(unit_price) || isNaN(qty) || qty <= 0) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Empty or invalid fields!",
        });
        return;
    }
    let subtotal = 0;
    let total = unit_price * qty;
     subtotal = total;

    let cart_item = {
        item_code,
        description,
        unit_price,
        qty,
        total,
        subtotal
    };

   
    function updateSubtotal(subtotal) {
        // Ensure subtotal is calculated and passed correctly
        if (typeof subtotal !== 'number' || isNaN(subtotal)) {
            console.error('Invalid subtotal value');
            return;
        }
    
        // Clear any previous content in #subtotal
        $('#subtotal').empty();
    
        // Append the formatted subtotal to the element
        $('#subtotal').append(`$${subtotal.toFixed(2)}`);
    }
    function totalSales() {
        // Ensure cart_arr exists and contains data
        for(let i = 0; i < cart_arr.length; i++) {
            if (typeof cart_arr[i].total !== 'number' || isNaN(cart_arr[i].total)) {
                console.error('Invalid total value in cart_arr');
                return;
            }
        }
    
        // Calculate the total sales
        let totalSales = cart_arr.reduce((sum, item) => sum + (item.total || 0), 0); // Safeguard for missing item.total
    
        // Update the DOM element
        $('#totalSales').empty(); // Clear previous content
        $('#totalSales').append(`$${totalSales.toFixed(2)}`); // Append formatted sales value
    }
    
    

    cart_arr.push(cart_item);
    loadCartTable();
    updateItemArray();
    updateSubtotal(subtotal);
    totalSales();
    clearItemInputs();
});

function updateItemArray() {
    let item_code = $("#itemSea").val();
    let item = item_arr.find(item => item._item_code === item_code);
    let qty = parseInt($("#itemQty").val());

    if (item) {
        item._qty -= qty; // Update the quantity
    } else {
        console.error("Item not found in itemArray");
    }
}

$("#order_btn").on('click', function () {
    let order_id = generateOrderId();
    let date = $("#date").val();
    let customerId = $("#customers").val();
    let total = cart_arr.reduce((sum, item) => sum + item.total, 0);

    if (cart_arr.length === 0) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No items in the cart!",
        });
        return;
    }

    let order = new OrderModel(order_id, customerId, date, total);
    order_arr.push(order);

    cart_arr.forEach(item => {
        let orderDetail = new OrderDetailModel(order_id, item.item_code, item.qty, item.unit_price);
        orderDetail_arr.push(orderDetail);
        orderCount();
    });

    Swal.fire({
        position: "center",
        icon: "success",
        title: "Order placed successfully",
        showConfirmButton: false,
        timer: 1500
    });
    function orderCount() {
                
        let  orderCount = order_arr.length;
        $('#totalOrders').empty();
        $('#totalOrders').append(orderCount);
         
     }

    clearOrderForm();
});

function clearOrderForm() {
    $("#itemSea").val('');
    $("#itemPrice").val('');
    $("#itemName").val('');
    $("#itemQty").val('');
    $("#itemQtyOnHand").val('');
    $("#orderId").val(generateOrderId());
    $("#date").val('');
    $("#customers").val('');
    $("#customerName").val('');
    $('#orderTableBody').empty(); // Clear the table
    cart_arr.length = 0; // Clear the cart array
}

function clearItemInputs() {
    $("#itemSea").val('');
    $("#itemPrice").val('');
    $("#itemName").val('');
    $("#itemQty").val('');
    $("#customers").val('');
    $("#customerName").val('');
}
