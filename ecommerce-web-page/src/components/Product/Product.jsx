'use client';

import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
} from '@headlessui/react';
import { FunnelIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import ProductCard from './ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { findProducts } from '../../State/Product/Action';
import Pagination from '@mui/material/Pagination';

const sortOptions = [
  { label: 'Price: Low to High', value: 'price_low' },
  { label: 'Price: High to Low', value: 'price_high' },
  { label: 'Newest', value: 'newest' },
];

export default function Product() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { products, productsPage, loading } = useSelector(
    (state) => state.product
  );

  // ====== READ QUERY PARAMS ======
  const decodedQueryString = decodeURIComponent(location.search);
  const searchParams = new URLSearchParams(decodedQueryString);

  const colorValue = searchParams.get('color');
  const sizeValue = searchParams.get('size');
  const priceValue = searchParams.get('price');
  const discount = searchParams.get('discount');
  const sortValue = searchParams.get('sort');
  const pageNumber = searchParams.get('page') || 1;
  const stock = searchParams.get('stock');

  // ====== GET THIRD LEVEL FROM URL PATH ======
  // Example path:
  //  /men/clothing/mens-kurta        -> thirdLevelCategory = "mens-kurta"
  //  /women/clothing/dresses        -> thirdLevelCategory = "dresses"
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const thirdLevelCategory =
    pathSegments.length > 0 ? pathSegments[pathSegments.length - 1] : '';

  // ====== PAGINATION HANDLER ======
  const handlePaginationChange = (event, value) => {
    const s = new URLSearchParams(location.search);
    s.set('page', value);
    s.set('pageSize', 8);
    navigate({ search: `?${s.toString()}` });
  };

  // ====== SORT HANDLER ======
  const handleSortChange = (value) => {
    const s = new URLSearchParams(location.search);
    s.set('sort', value);
    s.set('page', 1); // back to first page on sort
    navigate({ search: `?${s.toString()}` });
  };

  // ====== FILTER HANDLER (if you use checkboxes later) ======
  const handleFilter = (value, sectionId) => {
    const s = new URLSearchParams(location.search);
    let filterValue = s.getAll(sectionId);

    if (filterValue.length > 0 && filterValue[0].split(',').includes(value)) {
      filterValue = filterValue[0]
        .split(',')
        .filter((item) => item !== value);

      if (filterValue.length === 0) {
        s.delete(sectionId);
      }
    } else {
      filterValue.push(value);
    }

    if (filterValue.length > 0) {
      s.set(sectionId, filterValue.join(','));
    }

    s.set('page', 1);
    navigate({ search: `?${s.toString()}` });
  };

  // ================== FETCH PRODUCTS ==================
  useEffect(() => {
    const [minPrice, maxPrice] = priceValue
      ? priceValue.split('-').map(Number)
      : [0, 2000000000]; // MUST be <= Integer.MAX_VALUE

    // IMPORTANT: send raw URL segment; backend will normalize & match
    const data = {
      category: thirdLevelCategory,
      color: colorValue ? colorValue.split(',') : [],
      size: sizeValue ? sizeValue.split(',') : [],
      minPrice,
      maxPrice,
      minDiscount: discount ? Number(discount) : 0,
      sort: sortValue || 'price_low',
      pageNumber: Math.max(0, Number(pageNumber) - 1),
      pageSize: 8,
      stock: stock || 'in_stock',
    };

    dispatch(findProducts(data));
  }, [
    thirdLevelCategory,
    colorValue,
    sizeValue,
    priceValue,
    discount,
    sortValue,
    pageNumber,
    stock,
    dispatch,
  ]);

  return (
    <div className="bg-white">
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24">
        {/* HEADER + SORT */}
        <div className="flex items-baseline justify-between border-b border-gray-200 pb-6">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            New Arrivals
          </h1>

          <div className="flex items-center gap-4">
            {/* SORT DROPDOWN */}
            <Menu as="div" className="relative inline-block text-left">
              <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                Sort
                <ChevronDownIcon className="size-5 ml-1 text-gray-400 group-hover:text-gray-500" />
              </MenuButton>
              <MenuItems className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none z-50">
                {sortOptions.map((opt) => (
                  <MenuItem key={opt.value}>
                    {({ active }) => (
                      <button
                        onClick={() => handleSortChange(opt.value)}
                        className={`${
                          active ? 'bg-gray-100' : ''
                        } w-full text-left px-4 py-2 text-sm text-gray-700`}
                      >
                        {opt.label}
                      </button>
                    )}
                  </MenuItem>
                ))}
              </MenuItems>
            </Menu>

            {/* FILTER BUTTON (optional for mobile) */}
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(true)}
              className="-m-2 p-2 text-gray-400 hover:text-gray-500 lg:hidden"
            >
              <span className="sr-only">Filters</span>
              <FunnelIcon className="size-5" />
            </button>
          </div>
        </div>

        {/* PRODUCTS */}
        <section className="pt-6 pb-24">
          <div className="grid grid-cols-1 gap-x-4 gap-y-10 lg:grid-cols-5">
            {/* (you can add sidebar filters here later as lg:col-span-1) */}

            <div className="lg:col-span-5 w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-white py-5">
                {loading && <p className="text-gray-500">Loading...</p>}

                {!loading && products?.length > 0 ? (
                  products.map((item) => (
                    <ProductCard key={item.id} product={item} />
                  ))
                ) : (
                  !loading && (
                    <p className="text-gray-500 col-span-4">
                      No products found
                    </p>
                  )
                )}
              </div>
            </div>
          </div>
        </section>

        {/* PAGINATION */}
        <section className="w-full">
          <div className="px-4 py-5 flex justify-center">
            <Pagination
              count={productsPage?.totalPages || 1}
              page={Number(pageNumber)}
              color="secondary"
              onChange={handlePaginationChange}
            />
          </div>
        </section>
      </main>
    </div>
  );
}
