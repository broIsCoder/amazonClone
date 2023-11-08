const navCart = document.querySelector('.nav-cart');
const noOfOrderHtml = document.querySelector('.noOfOrder');
const itemContainer = document.querySelector(".itemContainer");

// default
let itemsToAdd = [
    { item: 'shirt', img: '../clothes/c1.jpg', rating: '****', price: 15 ,buyNo:0},
    { item: 'full set frug', img: '../clothes/c2.jpg', rating: '****', price:10 ,buyNo:0},
    { item: 'pants', img: '../clothes/c3.jpg', rating: '****', price: 29 ,buyNo:0},
    { item: 'T-shirts', img: '../clothes/c4.jpg', rating: '****', price: 52 ,buyNo:0},
    { item: 'baby T-shirts', img: '../clothes/c5.jpg', rating: '****', price: 89 ,buyNo:0},
    { item: 'Jacket & Pants', img: '../clothes/c6.jpg', rating: '****', price: 85 ,buyNo:0},
    { item: 'Full set Jacket Pants', img: '../clothes/c7.jpg', rating: '****', price: 105 ,buyNo:0},
    { item: 'Suit & Pants', img: '../clothes/c8.jpg', rating: '****', price: 150 ,buyNo:0},
]
let totalAddToCart = 0;
// extract total no.of buy items and arrayof items from local storage

let totalItems = localStorage.getItem('boughtItemsArray');

if(totalItems === undefined || totalItems=== null){
    noOfOrderHtml.textContent = totalAddToCart;
}
else{
    let totalBuyItems = JSON.parse(totalItems);
    itemsToAdd = totalBuyItems ;
    itemsToAdd.forEach(element => {
        console.log(element.buyNo + ' _'+ element.item)
        totalAddToCart += element.buyNo ;
    });
    noOfOrderHtml.textContent = totalAddToCart;
}

//html
populateHtml(itemsToAdd);

//event listeners
navCart.addEventListener("click", () => {
    redirectToLink('bought.html');
});

const allItem = itemContainer.querySelectorAll('.itemSelected');
allItem.forEach((item,index) => {
    // when add is clicked
    item.querySelector('.add').addEventListener('click', () => {
        item.querySelector('.buyingNumber').textContent = Number(item.querySelector('.buyingNumber').textContent) + 1;
    })
    // when sub is clicked
    item.querySelector('.sub').addEventListener('click', () => {
        item.querySelector('.buyingNumber').textContent = Number(item.querySelector('.buyingNumber').textContent) - 1;
        if( Number(item.querySelector('.buyingNumber').textContent) - 1 < 0){
            item.querySelector('.buyingNumber').textContent = 0 ;
        }
    })
    
    // when addToCart is clicked
    item.querySelector('.addToCart').addEventListener('click', () => {
        
        let orders = Number(item.querySelector('.buyingNumber').textContent) ;
        // update buyNo of items 
        itemsToAdd[index].buyNo += orders ;
        item.querySelector('.buyingNumber').textContent = 0 ;

        totalAddToCart = 0 ;       //reset


        itemsToAdd.forEach(element => {
            // console.log(element.buyNo + ' =>'+ element.item)
            totalAddToCart += element.buyNo ;
        });
        noOfOrderHtml.textContent = totalAddToCart;

        // update array and store in local storage after add to cart
        updateLocalStorage(itemsToAdd);
        
    });

    //when cancel is clicked
    item.querySelector('.cancel').addEventListener('click',()=>{
        item.querySelector('.buyingNumber').textContent = 0 ;
    })
});

function updateLocalStorage(array){
    let arrayofItems = JSON.stringify(array)
    localStorage.setItem('boughtItemsArray',arrayofItems);
    
}

function populateHtml(itemsToAdd) {
    let html = '';
    itemsToAdd.forEach(item => {
        let eachhtml = `
        <div class="itemSelected">
        <div class="itemimg">
        <img src="${item.img}" alt="hihihi">
        </div>
        <div class="description">
                <p>${item.item}</p>
                <div class="rating">Ratings:${item.rating}</div>
                <div class="price">$${item.price}</div>
                <div class="btns">
                    <button class="sub">-</button>
                    <div class="buyingNumber">0</div>
                    <button class="add">+</button>
                    </div>
                    <button class="addToCart">Add to Cart</button>
                    <button class="cancel">Cancel</button>
                    
            </div>
            </div>`;
        html += eachhtml;
    });
    itemContainer.innerHTML = html;
};

function redirectToLink(link){
    window.location.href = link ;
}