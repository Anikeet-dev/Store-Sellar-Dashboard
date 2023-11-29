const inputItemName = document.querySelector('#itemName');
const inputDescription = document.querySelector('#description');
const inputPrice = document.querySelector('#price');
const inputQuantity = document.querySelector('#quantity');
const myForm = document.querySelector('#my-form');
const itemList = document.querySelector('#item-list');

myForm.addEventListener('submit', onSubmit);

window.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await axios.get("http://localhost:9000/get-items");
        console.log('Recieved Items:', response.data);
        showItems(response.data);
    }
    catch (err) {
        console.log('Error fetching items:', err);
    }
});

async function onSubmit(e) {
    e.preventDefault();


    const itemDetails = {
        itemName: inputItemName.value,
        description: inputDescription.value,
        price: inputPrice.value,
        quantity: inputQuantity.value
    };

    try {
        const response = await axios.post("http://localhost:9000/create-item", itemDetails)
        console.log('Item created successfully:', response.data);
        const responseData = response.data;

        const updatedItemResponse = await axios.get("http://localhost:9000/get-items")
        console.log('updated items:', updatedItemResponse.data);
        showItems(updatedItemResponse.data);
        clearInputs();
    }

    catch (err) {
        console.log('Error creating item:', err);
    }
}


function showItems(items) {
    itemList.innerHTML = '';

    if (Array.isArray(items)) {
        items.forEach(item => {
            const itemElement = document.createElement('li');

            itemElement.innerHTML =
                `Item: ${item.itemName} | Description: ${item.description} | Rs.${item.price}/- | Qty: ${item.quantity} `;

                for(let i = 1; i<= 3; i++ ){
                    const buyBtn = document.createElement('button');
                    buyBtn.innerText = `Buy ${i}`;
                    buyBtn.classList.add('btn', 'btn-secondary');
                    buyBtn.style.margin = '10px';
                    itemElement.appendChild(buyBtn);
                    buyBtn.addEventListener('click', () => buyItem(item, i))
                }
                
            itemList.appendChild(itemElement);
        });
    }
    clearInputs();
}
async function buyItem(item, quantityToBuy){
    try{
        if(item.quantity >= quantityToBuy){
            item.quantity -= quantityToBuy;

            await axios.put(`http://localhost:9000/update-quantity/${item.id}`,{
                quantityToBuy: quantityToBuy,
            });

            const updatedItemResponse = await axios.get('http://localhost:9000/get-items');
            showItems(updatedItemResponse.data);
        }
        else{
            alert('Not enough quantity available!.');
        }
    } catch (err){
        console.log('Error buying items:', err);
    }
}

function clearInputs() {
    inputItemName.value = '';
    inputDescription.value = '';
    inputPrice.value = '';
    inputQuantity.value = '';
}
