import { v4 as uuidv4 } from "uuid";

let products = [
  { title: "asdf", id: "1" },
  { title: "asdf", id: "2" },
  { title: "asdf", id: "3" },
];

//GET:/proudcts -> ALL product
export const getAllProducts = (req, res) => {
  try {
    res.status(200).json({
      message: "all products are returned",
      payload: products,
    });
  } catch (error) {
    res.status(500).json({
      message: "server error",
    });
  }
};
//POST: /product -> creat a new product
export const creatProduct = (req, res) => {
  try {
    console.log(req.body)
    const newProduct = {
      title: req.body.title,
      id: uuidv4()
    }
    products.push(newProduct);
    res.status(201).json({
      message: "product is created",
    });
  } catch (error) {
    res.status(500).json({
      message: "server error",
    });
  }
};

//PUT:/products/id -> update single product
export const updatSingleProdct = (req, res, next) => {
  try {
    const id = req.params.id;
    const productIndex = products.findIndex((product) => product.id === id);
    if (productIndex === -1) {
      const error = new Error('Product not found');
      error.status = 404;
      throw error;
    }

    const updatedProduct = {
      id: products[productIndex].id,
      title: req.body.title || products[productIndex].title,
    };

    products[productIndex] = updatedProduct;

    res.status(200).json({
      message: 'Product updated successfully',
      payload: updatedProduct,
    });
  } catch (error) {
    next(error);
  }
};
//DELET:/proudcts/id -> delet single product
export const deletSingleProdct = (req, res, next) => {
  try {
    const id = req.params.id;
    const product = products.find((products) => products.id === id);
    if (!product) {
      const error = new Error("product not found");
      error.status = 404;
      throw error;
    }
    const filteredProducts = products.filter((product) => product.id !== id);
    products = filteredProducts;
    res.status(204).json({
      message: "product is deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
