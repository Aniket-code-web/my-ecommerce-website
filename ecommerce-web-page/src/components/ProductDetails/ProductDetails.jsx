import { StarIcon } from '@heroicons/react/20/solid'
import { Grid } from '@mui/material';
import ProductReviewCard from './ProductReviewCards';
import { mens_kurta } from '../../Data/mens_kurta';
import HomeSectionCard from '../HomeSectionCard/HomeSectionCard';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { findProductsByID } from '../../State/Product/Action';
import { addItemToCart } from '../../State/Cart/Action';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function ProductDetails() {

  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();

  // 👇 size state
  const [selectedSize, setSelectedSize] = useState(null);

  // 🔥 Get product state from Redux correctly
  const { product: singleProduct, loading, error } = useSelector(
    (store) => store.product   // keep this as per your store setup
  );

  console.log("ALL PARAMS:", params);
  console.log("PRODUCT ID:", params.id);
  console.log("BACKEND PRODUCT:", singleProduct);
  console.log("SELECTED SIZE:", selectedSize);

 const handleAddToCart = () => { 
  if (!selectedSize) {
    alert("Please select a size before adding to cart!");
    return;
  }

  const data = {
    productId: Number(params.id),
    size: selectedSize,
    quantity: 1
  };

  dispatch(addItemToCart(data));
  navigate("/cart");
};


  useEffect(() => {
    if (params.id) {
      dispatch(findProductsByID({ productId: params.id }));
    }
  }, [params.id, dispatch]);

  // Loading
  if (loading) {
    return <h1 className="text-center text-lg py-10">Loading Product...</h1>;
  }

  // No Product
  if (error || !singleProduct) {
    return (
      <h1 className="text-center text-red-600 text-lg py-10">
        Product Not Found or Error Loading Product
      </h1>
    );
  }

  return (
    <div className="bg-white lg:px-20">
      <div className="pt-6">

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb">
          <ol className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <li className="text-sm text-gray-600">Home</li>
            <li>/</li>
            <li className="text-sm text-gray-600">{singleProduct?.category?.name}</li>
            <li>/</li>
            <li className="text-sm font-medium text-gray-900">{singleProduct?.title}</li>
          </ol>
        </nav>

        {/* Product Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-10 px-4 pt-10">

          {/* ================= Image Section ================= */}
          <div className="flex flex-col items-center">
            <div className="overflow-hidden rounded-lg max-w-md w-full">
              <img
                src={singleProduct?.imageUrl}
                alt={singleProduct?.title}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* ================= Product Info ================= */}
          <div className="lg:pt-8">

            <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
              {singleProduct?.title}
            </h1>

            {/* Price */}
            <div className="flex space-x-4 items-center text-lg lg:text-xl font-semibold mt-3">
              <p className="text-gray-900">₹{singleProduct?.discountedPrice}</p>
              <p className="line-through opacity-60">₹{singleProduct?.price}</p>
              <p className="text-green-600 font-semibold">
                {Math.round(((singleProduct.price - singleProduct.discountedPrice) / singleProduct.price) * 100)}% Off
              </p>
            </div>

            {/* Reviews */}
            <div className="mt-3 flex items-center">
              <div className="flex items-center">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <StarIcon
                    key={rating}
                    className={classNames(
                      rating < 4 ? 'text-yellow-400' : 'text-gray-300',
                      'h-4 w-4'
                    )}
                  />
                ))}
              </div>
              <p className="ml-2 text-xs text-gray-500">120 reviews</p>
            </div>

            {/* ================= Sizes ================= */}
            <div className="mt-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-medium text-gray-900">Size</h3>
                <a href="#" className="text-xs font-medium text-indigo-600 hover:text-indigo-500">
                  Size guide
                </a>
              </div>

              <div className="grid grid-cols-4 gap-2 sm:grid-cols-7 mt-2">
                {singleProduct?.sizes?.length > 0 ? (
                  [...singleProduct.sizes]
                    .sort(
                      (a, b) =>
                        ["S", "M", "L", "XL", "XXL"].indexOf(a.name) -
                        ["S", "M", "L", "XL", "XXL"].indexOf(b.name)
                    )
                    .map((s, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedSize(s.name)}
                        className={
                          "flex items-center justify-center rounded-md border px-2 py-2 text-sm font-medium uppercase shadow-sm " +
                          (selectedSize === s.name
                            ? "bg-indigo-600 text-white border-indigo-600"
                            : "bg-white text-gray-900 border-gray-300 hover:bg-gray-50")
                        }
                      >
                        {s.name}
                      </button>
                    ))
                ) : (
                  <p className="text-sm text-gray-400 col-span-4">No sizes available</p>
                )}
              </div>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              className="mt-8 w-full rounded-md bg-indigo-600 py-3 text-md text-white font-medium hover:bg-indigo-700"
            >
              Add to Cart
            </button>

            {/* Description */}
            <div className="mt-6">
              <p className="text-sm text-gray-600">{singleProduct?.description}</p>
            </div>

            {/* Brand */}
            <div className="mt-6 border-t pt-6">
              <h3 className="text-sm font-medium text-gray-900">Brand</h3>
              <p className="text-sm text-gray-600">{singleProduct?.brand}</p>
            </div>

          </div>
        </section>

        {/* ================= Similar Products ================= */}
        <section className="pt-10">
          <h1 className="py-5 text-xl font-bold">Similar Products</h1>
          <div className="flex flex-wrap space-y-5">
            {mens_kurta.map((item, index) => (
              <HomeSectionCard key={index} product={item} />
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
