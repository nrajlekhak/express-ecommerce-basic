const Product = require("../models/Product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title,
    imageUrl = req.body.imageUrl,
    price = req.body.price,
    description = req.body.description;
  const product = new Product(null, title, imageUrl, description, price);
  product
    .save()
    .then(() => {
      res.redirect("/");
    })
    .catch(() => {
      console.log(err);
    });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const productId = req.params.productId;
  Product.findById(productId, (product) => {
    if (!product) {
      return res.redirect("/");
    }

    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: editMode,
      product: product,
    });
  });
};

exports.postEditProduct = (req, res, next) => {
  const productId = req.body.productId,
    title = req.body.title,
    imageUrl = req.body.imageUrl,
    price = req.body.price,
    description = req.body.description;
  const updateProduct = new Product(
    productId,
    title,
    imageUrl,
    description,
    price
  );

  updateProduct.save();
  res.redirect("/admin/products");
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("admin/products", {
      pageTitle: "Admin Products",
      products: products,
      path: "/admin/products",
    });
  });
};

exports.deleteProduct = (req, res, next) => {
  const productId = req.body.productId;
  Product.deleteById(productId);
  return res.redirect("/admin/products");
};
