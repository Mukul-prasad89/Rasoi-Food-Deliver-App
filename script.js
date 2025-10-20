

const mobile_menu=document.getElementById("mobile-menu");
const hamberger=document.querySelector(".hamberger");
let cardList=document.querySelector(".card-list");
const cartTotal=document.querySelector('.price');
const cartValue=document.querySelector('.cart-value');

hamberger.addEventListener("click",()=>{
    mobile_menu.classList.toggle("active");
})
hamberger.addEventListener("click",()=>{
    mobile_menu.classList.toggle("fa-xmark");
})

// Swipper
 var swiper = new Swiper(".mySwiper", {
    loop:true,
      navigation: {
        nextEl: "#next",
        prevEl: "#prev",
      },
    });

const cart=document.querySelector(".cart-icon");
const cartTab=document.querySelector(".cart-tab");
cart.addEventListener("click",(event)=>{
    event.preventDefault();
    cartTab.classList.add("cart-tab-active");

})


const closeTab=document.querySelector(".close-tab");
closeTab.addEventListener("click",(event)=>{
    event.preventDefault();
    cartTab.classList.remove("cart-tab-active");
} )

let product=[];
let cartProducts=[];

const updateTotal=()=>{
    let tot=0;
    let tot_quan=0;
    document.querySelectorAll('.item').forEach(item=>{
        const quantity=parseInt(item.querySelector('.h').textContent);
        const price=parseFloat(item.querySelector('.item-total').textContent.replace('$',''));
        tot+=price;
        tot_quan+=quantity;

    })
    cartTotal.textContent = `$${tot.toFixed(2)}`;
    cartValue.textContent=tot_quan;
    
}

const showCards = () => {
    cardList.innerHTML = "";
    product.forEach(item => {
        const orderCard = document.createElement('div');
        orderCard.classList.add('order-card');
        orderCard.innerHTML = `
            <div class="card-image">
                <img src="${item.image }" alt="${item.name}">
            </div>
            <h4>${item.name }</h4>
            <h4 class="price">${item.price }</h4>
            <a href="#" class="signIn2 card-bt">Add to cart</a>
        `;
        cardList.appendChild(orderCard);
        // Attach listener to the specific button in this card
        const cardBtn = orderCard.querySelector(".card-bt");
        cardBtn.addEventListener("click", (e) => {
            e.preventDefault();
            addToCart(item);
        });
    });
};

const addToCart=(item)=>{
    const existing=cartProducts.find(it =>it.id===item.id);
    if(existing){
        return;
    }else{
    cartProducts.push(item);
    let count=1;
    const basePrice = parseFloat(item.price.replace('$',''));

    const cartItem=document.createElement('div');
    cartItem.classList.add("item");
    cartItem.innerHTML=`<div class="image-contaner">
                        <img style="width: 5rem;" src="${item.image}" >
                        
                    </div>
                    <div>
                        <h4>${item.name}</h4>
                        <h4 class="item-total">${item.price}</h4>
                    </div>
                    <div class="quality-box">
                        <a href="#" class="quantity-btn">
                            <i class="fa-solid fa-minus tag minus"></i>
                            
                        </a>
                        <h4 class="h">${count}</h4>
                        <a href="#" class="quantity-btn plus">
                           <i class="fa-solid fa-plus tag"></i>
                            
                        </a>
                    </div>`;
    const cartList=document.querySelector(".cart-list");
    cartList.appendChild(cartItem);
    updateTotal();
    const plusBtn=cartItem.querySelector(".plus");
    const minusBtn=cartItem.querySelector(".minus");
    const quantityValue=cartItem.querySelector('.h');
    const itemTotal=cartItem.querySelector('.item-total');
    

    plusBtn.addEventListener("click",(e) =>{
        
        e.preventDefault();
        count++;
        quantityValue.textContent = count;
        let total = basePrice * count;
        itemTotal.textContent = `$${total.toFixed(2)}`;
        updateTotal();


    })
    minusBtn.addEventListener('click',(e)=>{
        e.preventDefault();
        if(count>1){ count--;
        quantityValue.textContent=count;
        quantityValue.textContent = count;
        let total = basePrice * count;
        itemTotal.textContent = `$${total.toFixed(2)}`;
        updateTotal();
    }
        else{
            cartItem.classList.add('slide');
            setTimeout(()=>{
                cartItem.remove();
            cartProducts=cartProducts.filter(it=> it.id!==item.id);
            updateTotal();

            },300)
            
            
        }
       
    })
    }
    

}

const initApp=()=>{
    fetch('products.json').then(response=>
        response.json()
    ).then(data=>{
        product=data;
        showCards();
    })
}
initApp();


