const inputItemName = document.querySelector('#itemName');
const inputDescription = document.querySelector('#discription');
const inputPrice = document.querySelector('#price');
const inputQuantity = document.querySelector('#quantity');
const myForm = document.querySelector('#my-form');
const itemList = document.getElementById('item-list');

myForm.addEventListener('submit', onSubmit);

window.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await axios.get("http://localhost:6000/get-items")
        console.log('Recieved Items:', response);
        showItems(response.data);
    }
    catch (err) {
        console.log('Error fetching items:', err);
    }
});

async function onSubmit(e) {
    e.preventDefault();

    if (!itemName || !description || !price || !quantity) {
        alert('Please Enter All Input Fields!');
    } else {
        const itemDetails = {
            itemName: inputItemName.value,
            description: inputDescription.value,
            price: inputPrice.value,
            quantity: inputQuantity.value,
        };

        try {
            const response = await axios.post("http://localhost:6000/create-item", itemDetails)
            console.log('Item created successfully:', response.data);
            const responseData = response.data;

            const updatedItemResponse = await axios.get("http://localhost:6000/get-items")
            console.log('updated items:', updatedItemResponse);
            showItems(updatedItemResponse.data);
            clearInputs();
        }

        catch (err) {
            console.log('Error creating item:',err);
        }
    }
}

function showItems(items) {
    itemList.innerHTML = '';

    if (Array.isArray(items)) {

        items.forEach(item => {
            const itemElement = document.createElement('li');

            itemElement.innerHTML =
                `${item.itemName} | ${item.description} | ${item.price} | ${item.quantity} `;

            itemList.appendChild(itemElement);
        })
    }
    clearInputs();
}

function clearInputs() {
    inputItemName.value = '';
    inputDescription.value = '';
    inputPrice.value = '';
    inputQuantity.value = '';
}
