const boxes = document.querySelectorAll('.box');
const shopSection = document.querySelector('.shop-section');
const navCart = document.querySelector('.nav-cart');
const noOfOrder = navCart.querySelector('.noOfOrder');

let items = [{item:'clothes',link:'clothes.html',img:'background-image: url(../img/box1_image.jpg);'},
            {item:'hygiene',link:'hygiene.html',img:'background-image: url(../img/box2_image.jpg);'},
            {item:'furniture',link:'furniture.html',img:'background-image: url(../img/box3_image.jpg);'},
            {item:'gaming',link:'gaming.html',img:'background-image: url(../img/box4_image.jpg);'},
            {item:'beauty',link:'beauty.html',img:'background-image: url(../img/box5_image.jpg);'},
            {item:'petscare',link:'petscare.html',img:'background-image: url(../img/box6_image.jpg);'},
            {item:'travelling',link:'travelling.html',img:'background-image: url(../img/box7_image.jpg);'},
            {item:'fashion',link:'fashion.html',img:'background-image: url(../img/box8_image.jpg);'},
]

let bought = JSON.parse(localStorage.getItem('bought')) || [];
noOfOrder.textContent = bought.length ;
populateHtml();

let totalAddToCart = 0;

// extract total no.of buy items and arrayof items from local storage

let totalItems = localStorage.getItem('boughtItemsArray');

if(totalItems === undefined || totalItems=== null){
    noOfOrder.textContent = totalAddToCart;
}
else{
    let totalBuyItems = JSON.parse(totalItems);
    console.log(totalBuyItems)
    items = totalBuyItems ;
    items.forEach(element => {
        console.log(element.buyNo + ' _'+ element.item)
        totalAddToCart += element.buyNo ;
    });
    noOfOrder.textContent = totalAddToCart;
}

function populateHtml(){
    let html ='';
    items.forEach(item => {
        let eachhtml = `<div class="box" onclick="redirectToLink('${item.link}')">
                        <div class="box-content">
                            <h2>${item.item}</h2>
                            <div class="box-img" style="${item.img}"></div>
                            <p><a href="see.html">See more</a></p>
                        </div>
                    </div>`;
        html+=eachhtml ;
    });
    shopSection.innerHTML = html ;

    boxes.forEach(box => {
        box.addEventListener('click',function(){
            window.location.href = 'see.html';
            
        })
    });
}

function redirectToLink(link) {
    window.location.href = link;
}

navCart.addEventListener("click",()=>{
    redirectToLink('bought.html')
})
