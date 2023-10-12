type Rating = {
    count: number;
    rate: number;
}

type Product = {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string; // Agregamos una coma aquí
    rating: Rating;
};

// Global variables
let allProducts: Product[] = [];
const itemsPerPage: number = 5;

// Handlers
function sortProducts(prop: string): void {
    const sortedProducts = allProducts.toSorted((a: Product, b: Product) => a[prop] > b[prop] ? 1 : a[prop] < b[prop] ? -1 : 0);
    console.log('sortedProducts', sortedProducts);
}

function paginateProducts(page: number){
    const paginatedProducts: Product[] = allProducts.slice(page * itemsPerPage, (page + 1) * 5 );
    console.log('paginatedProducts', paginatedProducts);

}

fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then((products: Product[]) => {
        allProducts = products;
        // Prepare table HTML
        let tableHTML: string = `<thead><tr><th>ID</th><th><button type="button" class="btn btn-link" onclick='sortProducts("title")'>Title</button></th><th>Description</th><th>Price</th></tr></thead><tbody>`; // Corrección en el onclick y class

        // Loop through all products to generate rows of the table
        products.forEach((p: Product) => {
            tableHTML += `<tr><td>${p.id}</td><td>${p.title}</td><td>${p.description}</td><td>${p.price}</td></tr>`; // Corrección en el orden de las columnas
        });

        // Close table body
        tableHTML += '</tbody>';

        // Grab table element to set its inner HTML
        document.querySelector('#tableElement')!.innerHTML = tableHTML;

        // Hide spinner
        const spinnerElement: HTMLElement = document.querySelector('#spinnerContainer')!;
        spinnerElement.style.display = 'none';
    });
