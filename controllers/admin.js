const Product = require('../models/Product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title,
    imageUrl = req.body.imageUrl,
    price = req.body.price,
    description = req.body.description;
  const product = new Product(
    title,
    price,
    description,
    imageUrl,
    null,
    req.user._id
  );
  product
    .save()
    .then(result => {
      return res.redirect('/admin/products');
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(products => {
      res.render('admin/products', {
        pageTitle: 'Admin Products',
        products: products,
        path: '/admin/products',
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const productId = req.params.productId;
  Product.findById(productId)
    .then(product => {
      if (!product) {
        return res.redirect('/');
      }

      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product: product,
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postEditProduct = (req, res, next) => {
  const productId = req.body.productId,
    title = req.body.title,
    imageUrl = req.body.imageUrl,
    price = req.body.price,
    description = req.body.description;

  const product = new Product(
    title,
    price,
    description,
    imageUrl,
    productId,
    req.user._id
  );

  product
    .save()
    .then(result => {
      console.log('Product Updated');
      res.redirect('/admin/products');
    })
    .catch(err => {
      console.log(err);
    });
};

exports.deleteProduct = (req, res, next) => {
  const productId = req.body.productId;
  Product.deleteById(productId)

    .then(() => {
      console.log('Deleted');
      return res.redirect('/admin/products');
    })
    .catch(err => {
      console.log(err);
    });
};
