import {
  creatProduct,
  deletSingleProdct,
  getAllProducts,
  updatSingleProdct,
} from "../controllers/productController.js";
import { creatproductValdation, productValdation } from '../validator/productValidator.js'

import { Router } from "express";
import { runValidator } from '../validator/index.js'

const productRoute = Router();

productRoute.get("/", getAllProducts);
productRoute.post("/", creatproductValdation, runValidator, creatProduct);
productRoute.put("/:id", creatproductValdation, runValidator, updatSingleProdct);
productRoute.delete("/:id", productValdation, runValidator, deletSingleProdct);

export default productRoute;
