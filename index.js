let increment = 2
let products = []

// Function to generate the auto-incremented Product ID
const generateProductID = () => {
    /* This code block is generating an auto-incremented Product ID and assigning it to the `prodid`
    input field in the form. */
    const productIdField = document.querySelector('#prodid')
    const productID = `EVNT-DRIV-MID-${increment}`
    productIdField.value = productID
    increment++
}

// Function to save form inputs
const saveForm = () => {
    // Get form input values
    const productId = document.querySelector('#prodid').value
    const productName = document.querySelector('#prodname').value
    const productCategory = document.querySelector('#prodcategory').value
    const sellingPrice = document.querySelector('#sellprice').value

    // Check if all fields are complete
    if (
        productId &&
        productName &&
        productCategory !== '--Select Category--' &&
        sellingPrice
    ) {
        /* The code is creating an object called `formData` that contains the values of the form inputs
        (`productId`, `productName`, `productCategory`, and `sellingPrice`). */
        const formData = {
            productId: productId,
            productName: productName,
            productCategory: productCategory,
            sellingPrice: sellingPrice,
        }
        /* The line `products.push(formData)` is adding the `formData` object to the `products` array.
        This means that the form data for a product is being stored in the `products` array,
        allowing for easy access and manipulation of the product data later on. */
        products.push(formData)

        populateTable()
        resetForm()
        countCategories()
        generateProductID()
    } else {
        // Fields are not complete, display an error message or perform other actions.
        alert('Please fill in all required fields.')
    }
}

const countCategories = () => {
    /* The code is filtering the `products` array to find all the products that have a
    `productCategory` value of 'Food and Beverage'. It then returns the length of the filtered
    array, which represents the number of products in the 'Food and Beverage' category. The result
    is stored in the variable `fb`. */
    const fb = products.filter(
        (product) => product.productCategory === 'Food and Beverage'
    ).length
    const ka = products.filter(
        (product) => product.productCategory === 'Kitchen Appliances'
    ).length
    const it = products.filter(
        (product) => product.productCategory === 'IT Equipment'
    ).length
    const sc = products.filter(
        (product) => product.productCategory === 'Shoes and Clothing'
    ).length

    /* This code is updating the inner HTML content
    of the element with the ID `fb_count`. */
    document.querySelector('#fb_count').innerHTML = fb
    document.querySelector('#ka_count').innerHTML = ka
    document.querySelector('#it_count').innerHTML = it
    document.querySelector('#sc_count').innerHTML = sc
}

function populateTable() {
    const filterCategory = document.getElementById('filterCategory').value
    const tbody = document.getElementById('tbodyproducts')

    // Clear the table
    tbody.innerHTML = ''

    // Iterate through the products and filter based on the selected category
    /* The code `products.map((product) => { ... })` is iterating over each element in the `products`
    array and performing a set of operations on each element. */
    products.map((product) => {
        if (
            filterCategory === 'See All' ||
            filterCategory === product.productCategory
        ) {
            const row = document.createElement('tr')
            row.innerHTML = `
                <td>${product.productId}</td>
                <td>${product.productName}</td>
                <td>${product.productCategory}</td>
                <td>₱ ${product.sellingPrice}</td>
            `
            /* The line `tbody.appendChild(row)` is appending the `row` element to the `tbody` element
            in the HTML table. This means that the `row` element, which represents a row of data in
            the table, is added as a child element of the `tbody` element. This is how the table is
            populated with data dynamically. */
            tbody.appendChild(row)
        }
    })
}

const filtercatChange = () => {
    populateTable()
}
// Function to reset form fields
function resetForm() {
    document.querySelector('#prodname').value = ''
    document.querySelector('#prodcategory').value = '--Select Category--'
    document.querySelector('#sellprice').value = ''
}
