// Transform an input array of products into array of arrays for pagination
const paginate = (products) => {
  const itemsPerPage = 30;
  const numberOfPages = Math.ceil(products.length / itemsPerPage);
  // create array of arrays
  const newproducts = Array.from({ length: numberOfPages }, (_, index) => {
    const start = index * itemsPerPage;
    return products.slice(start, start + itemsPerPage);
  });
  return newproducts;
};

export default paginate;
