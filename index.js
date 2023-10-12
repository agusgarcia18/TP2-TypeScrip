// Global variables
var allProducts = [];
var itemsPerPage = 5;
// Handlers
function sortProducts(prop) {
    var sortedProducts = allProducts.toSorted(function (a, b) { return a[prop] > b[prop] ? 1 : a[prop] < b[prop] ? -1 : 0; });
    console.log('sortedProducts', sortedProducts);
}
function paginateProducts(page) {
    var paginatedProducts = allProducts.slice(page * itemsPerPage, (page + 1) * 5);
    console.log('paginatedProducts', paginatedProducts);
}
fetch('https://fakestoreapi.com/products')
    .then(function (res) { return res.json(); })
    .then(function (products) {
    allProducts = products;
    // Prepare table HTML
    var tableHTML = "<thead><tr><th>ID</th><th><button type=\"button\" class=\"btn btn-link\" onclick='sortProducts(\"title\")'>Title</button></th><th>Description</th><th>Price</th></tr></thead><tbody>"; // Corrección en el onclick y class
    // Loop through all products to generate rows of the table
    products.forEach(function (p) {
        tableHTML += "<tr><td>".concat(p.id, "</td><td>").concat(p.title, "</td><td>").concat(p.description, "</td><td>").concat(p.price, "</td></tr>"); // Corrección en el orden de las columnas
    });
    // Close table body
    tableHTML += '</tbody>';
    // Grab table element to set its inner HTML
    document.querySelector('#tableElement').innerHTML = tableHTML;
    // Hide spinner
    var spinnerElement = document.querySelector('#spinnerContainer');
    spinnerElement.style.display = 'none';
});
