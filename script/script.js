document.addEventListener('DOMContentLoaded', () => {
    'use strict';
    const customer = document.getElementById('customer');
    const freelancer = document.getElementById('freelancer');
    const blockCustomer = document.getElementById('block-customer');
    const blockFreelancer = document.getElementById('block-freelancer');
    const blockChoice = document.getElementById('block-choice');
    const btnExit = document.getElementById('btn-exit');
    const formCustomer = document.getElementById('form-customer');

    const orders = JSON.parse(localStorage.getItem('freeOrders',)) || [];

    const toStorage =()=>{
        localStorage.setItem('freeOrders', JSON.stringify(orders))
    }
    const calcDeadline = (deadline) =>{


    }

    const ordersTable = document.getElementById('orders');
    const modalOrder = document.getElementById('order_read');
    const modalOrderActive = document.getElementById('order_active');

    const renderOrders = () => {
        ordersTable.textContent = '';
        orders.forEach((order, i) => {
            ordersTable.innerHTML += `
        <tr class="order ${order.active ? "taken" : ""}" 
        data-number-order="${i}">
        <td>${i+1}</td>
        <td>${order.title}</td>
        <td class="${order.currency}"></td>
        <td>${order.deadline}</td>
        </tr>`;
        })
    };
    const handlerModal = (event) => {
        const target = event.target;
        const modal = target.closest('.order-modal');
        const order = orders[modal.numberOrder];
        const baseAction = ()=>{
            modal.style.display = 'none';
            toStorage();
            renderOrders();
        }

        if (target.closest('.close') || target === modal) {
            modal.style.display = 'none';
        };

        if (target.classList.contains('get-order')) {
            order.active = true;
            baseAction();
        };

        if (target.id === 'capitulation') {
            order.active = false;
            baseAction();
        };

        if (target.id ==='ready') {
            orders.splice(orders.indexOf(order), 1);
            baseAction();
        };

    };

    const openModal = (numberOrder) => {
        const order = orders[numberOrder];
        const {
            title,
            phone,
            firstName,
            email,
            description,
            deadline,
            currency,
            amount,
            active = false
        } = order;
        const modal = active ? modalOrderActive : modalOrder;


        const firstNameBlock = modal.querySelector('.firstName');
        const titleBlock = modal.querySelector('.modal-title');
        const emailBlock = modal.querySelector('.email');
        const descriptionBlock = modal.querySelector('.description');
        const deadlineBlock = modal.querySelector('.deadline');
        const currencyBlock = modal.querySelector('.currency_img');
        const countBlock = modal.querySelector('.count');
        const phoneBlock = modal.querySelector('.phone');

        modal.numberOrder = numberOrder;
        titleBlock.textContent = title;
        phoneBlock ? phoneBlock.href = 'tel:' + phone : '';
        firstNameBlock.textContent = firstName;
        emailBlock.textContent = email;
        emailBlock.href = 'mailto:' + email;
        descriptionBlock.textContent = description;
        deadlineBlock.textContent = deadline;
        currencyBlock.className = 'currency_img';
        currencyBlock.classList.add(currency)
        countBlock.textContent = amount;

        modal.style.display = 'flex';
        modal.addEventListener('click', handlerModal)
    };

    ordersTable.addEventListener('click', (event) => {
        const target = event.target;
        const targetOrder = target.closest('.order');
        if (targetOrder) {
            openModal(targetOrder.dataset.numberOrder);
        }
    });

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
        toStorage();
        console.log('orders: ', orders);

    });













































})