// extract total no.of buy items and arrayof items from local storage
const navCart = document.querySelector('.nav-cart');
let noOfOrderHtml = document.querySelector('.noOfOrder');
const itemContainer = document.querySelector(".itemContainer");

let items = [];
let totalBuyNo = 0;

// extract total no.of buy items and arrayof items from local storage
let totalItems = localStorage.getItem('boughtItemsArray');

if (totalItems === undefined || totalItems === null) {
    noOfOrderHtml.textContent = totalBuyArray;
}
else {
    let totalBuyArray = JSON.parse(totalItems);
    items = totalBuyArray;

    items.forEach(element => {
        console.log(element.buyNo + ' =>' + element.item)
        totalBuyNo += element.buyNo;

    });
    noOfOrderHtml.textContent = Number(totalBuyNo);
}

let buyedItems = [];
verifyPurchase();

populateHtml();

if (buyedItems.length === 0) {
    itemContainer.style.fontSize = '2rem';
    itemContainer.textContent = 'Nothing To Show'
}

navCart.addEventListener("click", () => {
    redirectToLink('bought.html');
});

function verifyPurchase() {
    buyedItems = [];
    items.forEach(element => {
        if (element.buyNo !== 0) {
            buyedItems.push(element)
        }
    
    });
}

function populateHtml() {
    let html = '';
    if (buyedItems.length === 0) {
        itemContainer.style.fontSize = '2rem';
        itemContainer.textContent = 'Nothing To Show'
        document.querySelector('.final').style.display = 'none'
        return;
    }
    buyedItems.forEach(item => {
        let eachhtml = `
            <div class="itemSelected">
            <div class="itemimg">
            <img src="${item.img}" alt="hihihi">
        </div>
        <div class="description">
                <p>${item.item}</p>
                <div class="rating">Ratings:${item.rating}</div>
                <div class="price">$${item.price * item.buyNo}</div>
                <div class="noItems">${item.buyNo} pieces</div>
               
                <button class="cancel">Cancel</button>
                
                </div>
                </div>`;
        html += eachhtml;
    });
    itemContainer.innerHTML = html;

    let noOfOrderHtml = document.querySelector('.noOfOrder');

    const allItem = itemContainer.querySelectorAll('.itemSelected');
    allItem.forEach((item, index) => {
        item.querySelector('.cancel').addEventListener('click', () => {
            buyedItems[index].buyNo = 0; // Set buyNo to 0 for the canceled item
            verifyPurchase();
            populateHtml();
            updateLocalStorage(items);

            totalBuyNo = 0;
            items.forEach(element => {
                console.log(element.buyNo + ' =>' + element.item)
                totalBuyNo += element.buyNo;

            })
            noOfOrderHtml.textContent = totalBuyNo; // Update the totalBuyNo in the display
        });
    });
};

function updateLocalStorage(array) {
    // array of items 
    let arrayofItems = JSON.stringify(array)
    localStorage.setItem('boughtItemsArray', arrayofItems);
}
