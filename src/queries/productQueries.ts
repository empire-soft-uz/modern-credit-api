//Query to get info of specific product based on credit.product_id
export const ProductByIdQuery = "SELECT product.* FROM credit JOIN product ON credit.product_id = product.id WHERE credit.id = $1";

module.exports = {ProductByIdQuery}