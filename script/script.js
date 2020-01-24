document.addEventListener('DOMContentLoaded', () => {
    'use strict';
    const customer = document.getElementById('customer');
    const freelancer = document.getElementById('freelancer');
    const blockCustomer = document.getElementById('block-customer');
    const blockFreelancer = document.getElementById('block-freelancer');
    const blockChoice = document.getElementById('block-choice');
    const btnExit = document.getElementById('btn-exit');
    const formCustomer = document.getElementById('form-customer');
    const orders = [];
    const ordersTable = document.getElementById('orders');
    
    const renderOrders = () =>{
        ordersTable.textContent = '';
        orders.forEach((order, i)=>{
            ordersTable.innerHTML += `
        <tr class="order" data-number-order="${i}">
        <td>${i+1}</td>
        <td>${order.title}</td>
        <td class="${order.currency}"></td>
        <td>${order.deadline}</td>
        </tr>`;
        })
    }

   /* ordersTable.addEventListener('click', (event) =>{
        const target = event.target;
        const targetOrder = target.closest('.order');
        orders[targetOrder.dataSet.numberOrder]
    })
*/


    customer.addEventListener('click', () => {
        blockChoice.style.display = 'none';
        blockCustomer.style.display = 'block';
        btnExit.style.display = 'block';
    });
    freelancer.addEventListener('click', () => {
        blockChoice.style.display = 'none';
        renderOrders();
        blockFreelancer.style.display = 'block';
        btnExit.style.display = 'block';

    });
    btnExit.addEventListener('click', () => {
        btnExit.style.display = 'none';
        blockCustomer.style.display = 'none';
        blockFreelancer.style.display = 'none';
        blockChoice.style.display = 'block';
    });

    formCustomer.addEventListener('submit', (event) => {
        event.preventDefault();
        const obj = {};
        [...formCustomer.elements].forEach((elem) => {
            if ((elem.tagName === 'INPUT' && elem.type !== 'radio') ||
                (elem.type === 'radio' && elem.checked) ||
                (elem.tagName === 'TEXTAREA')) {
                obj[elem.name] = elem.value;
            }
        })
        /*for (const elem of formCustomer.elements) {
            if ((elem.tagName === 'INPUT' && elem.type !== 'radio') ||
                (elem.type === 'radio' && elem.checked) ||
                (elem.tagName === 'TEXTAREA')) {

                obj[elem.name] = elem.value;

                if(elem.type !== 'radio'){
                    elem.value= ""}
                }       
        }

        const elem = [...formCustomer.elements].filter(()=>{((elem.tagName === 'INPUT' && elem.type !== 'radio') ||
                                                                         (elem.type === 'radio' && elem.checked) ||
                                                                         (elem.tagName === 'TEXTAREA'))

        })*/
        formCustomer.reset();
        orders.push(obj);
        console.log('orders: ', orders);

    });

    











































})