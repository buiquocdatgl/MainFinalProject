const Product = require("../model/product");

const createProduct = async (req, res) => {
  const { name } = req.body;
  const filename = req.file.filename;
  console.log(req.body);
  if (name === "") {
    return res
      .status(400)
      .json({ message: "Name of product must be required" });
  }
  const checkProductInDB = await Product.findOne({ name });
  if (checkProductInDB) {
    return res.status(400).json({ message: "Product already exists" });
  } else {
    const newProduct = new Product({
      ...req.body,
      imageLink: `/statics/properties/${filename}`,
    });
    await newProduct.save();
    if (!newProduct) {
      return res.status(400).send("The product cannot be created!");
    }
    res.send(newProduct);
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;
  const { quantity } = req.body;
  try {
    await Product.findByIdAndUpdate(id, {
      description: description,
      quantity: quantity,
    });
    res.status(200).json({ message: "Update Product Successfully." });
  } catch (error) {
    res.status(400).json({ message: error.message, status: 400 });
  }
};

const getProducts = async (req, res) => {
  try {
    const result = await Product.find({});
    res.status(200).send(result);
  } catch (error) {
    res.status(400).json({ message: error.message, status: 400 });
  }
};

const getSingleProduct = async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(500).json({ success: false });
    }
  res.send(product);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: "Delete Product Successfully." });
  } catch (error) {
    res.status(400).json({ message: error.message, status: 400 });
  }
};

module.exports = {
  createProduct,
  updateProduct,
  getProducts,
  deleteProduct,
  getSingleProduct,
};
