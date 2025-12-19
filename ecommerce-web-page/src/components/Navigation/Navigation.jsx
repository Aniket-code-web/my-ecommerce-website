import { Fragment, useEffect, useState } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react'
import { Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useLocation, useNavigate } from 'react-router-dom'
import AuthModel from '../../Auth/AuthModel'
import { useDispatch, useSelector } from 'react-redux'
import { getUser, logout } from '../../State/Auth/Action'
import { Avatar } from "@mui/material";


// TEMP USER STATE (replace true/false to test avatar)
const user = false; // false = show Sign in, true = show Avatar

const navigation = {
  categories: [
    {
      id: 'women',
      name: 'Women',
      featured: [
        {
          name: 'New Arrivals',
          href: '/women/new-arrivals',
          imageSrc:
            'https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-01.jpg',
          imageAlt: 'Models sitting back to back.',
        },
        {
          name: 'Basic Tees',
          href: '/women/basic-tees',
          imageSrc:
            'https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-02.jpg',
          imageAlt: 'Close up of Basic Tee bundle.',
        },
      ],
      sections: [
        {
          id: 'clothing',
          name: 'Clothing',
          items: [
            { name: 'Tops', href: '/women/clothing/tops' },
            { name: 'Dresses', href: '/women/clothing/dresses' },
            { name: 'Women Jeans', href: '/women/clothing/women-jeans' },
            { name: 'Lengha Choli', href: '/women/clothing/lengha-choli' },
            { name: 'Sweaters', href: '/women/clothing/sweaters' },
            { name: 'T-Shirts', href: '/women/clothing/t-shirts' },
            { name: 'Jackets', href: '/women/clothing/jackets' },
            { name: 'Gowns', href: '/women/clothing/gowns' },
            { name: 'Sarees', href: '/women/clothing/sarees' },
            { name: 'Kurtas', href: '/women/clothing/kurtas' },
          ],
        },
        {
          id: 'accessories',
          name: 'Accessories',
          items: [
            { name: 'Watches', href: '/women/accessories/watches' },
            { name: 'Wallets', href: '/women/accessories/wallets' },
            { name: 'Bags', href: '/women/accessories/bags' },
            { name: 'Sunglasses', href: '/women/accessories/sunglasses' },
            { name: 'Hats', href: '/women/accessories/hats' },
            { name: 'Belts', href: '/women/accessories/belts' },
          ],
        },
        {
          id: 'brands',
          name: 'Brands',
          items: [
            { name: 'Full Nelson', href: '/women/brands/full-nelson' },
            { name: 'My Way', href: '/women/brands/my-way' },
            { name: 'Re-Arranged', href: '/women/brands/re-arranged' },
            { name: 'Counterfeit', href: '/women/brands/counterfeit' },
            { name: 'Significant Other', href: '/women/brands/significant-other' },
          ],
        },
      ],
    },

    // ================= MEN =================
    {
      id: 'men',
      name: 'Men',
      featured: [
        {
          name: 'New Arrivals',
          href: '/men/new-arrivals',
          imageSrc:
            'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg',
          imageAlt: 'Men new arrivals image',
        },
        {
          name: 'Artwork Tees',
          href: '/men/artwork-tees',
          imageSrc:
            'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-02-image-card-06.jpg',
          imageAlt: 'Men artwork tees',
        },
      ],
      sections: [
        {
          id: 'clothing',
          name: 'Clothing',
          items: [
            { name: 'Mens Kurtas', href: '/men/clothing/mens-kurta' },
            { name: 'Shirt', href: '/men/clothing/shirt' },
            { name: 'Men Jeans', href: '/men/clothing/men-jeans' },
            { name: 'Sweaters', href: '/men/clothing/sweaters' },
            { name: 'T-Shirts', href: '/men/clothing/t-shirts' },
            { name: 'Jackets', href: '/men/clothing/jackets' },
            { name: 'Activewear', href: '/men/clothing/activewear' },
          ],
        },
        {
          id: 'accessories',
          name: 'Accessories',
          items: [
            { name: 'Watches', href: '/men/accessories/watches' },
            { name: 'Wallets', href: '/men/accessories/wallets' },
            { name: 'Bags', href: '/men/accessories/bags' },
            { name: 'Sunglasses', href: '/men/accessories/sunglasses' },
            { name: 'Hats', href: '/men/accessories/hats' },
            { name: 'Belts', href: '/men/accessories/belts' },
          ],
        },
        {
          id: 'brands',
          name: 'Brands',
          items: [
            { name: 'Re-Arranged', href: '/men/brands/re-arranged' },
            { name: 'Counterfeit', href: '/men/brands/counterfeit' },
            { name: 'Full Nelson', href: '/men/brands/full-nelson' },
            { name: 'My Way', href: '/men/brands/my-way' },
          ],
        },
      ],
    },
  ],

  pages: [

  ],
};


const disabledLinks = [
  // Women - Clothing
  // '/women/clothing/tops', // Enabled
  // '/women/clothing/dresses', // Enabled
  '/women/clothing/women-jeans',
  // '/women/clothing/lengha-choli', // Enabled
  '/women/clothing/sweaters',
  '/women/clothing/t-shirts',
  '/women/clothing/jackets',
  // '/women/clothing/gowns', // Enabled
  // '/women/clothing/sarees', // Enabled
  '/women/clothing/kurtas',
  // Women - Accessories
  '/women/accessories/watches',
  '/women/accessories/wallets',
  '/women/accessories/bags',
  '/women/accessories/sunglasses',
  '/women/accessories/hats',
  '/women/accessories/belts',
  // Women - Brands
  '/women/brands/full-nelson',
  '/women/brands/my-way',
  '/women/brands/re-arranged',
  '/women/brands/counterfeit',
  '/women/brands/significant-other',
  // Men - Clothing
  // '/men/clothing/mens-kurta', // Enabled
  // '/men/clothing/shirt', // Enabled
  // '/men/clothing/men-jeans', // Enabled
  '/men/clothing/sweaters',
  '/men/clothing/t-shirts',
  '/men/clothing/jackets',
  '/men/clothing/activewear',
  // Men - Accessories
  '/men/accessories/watches',
  '/men/accessories/wallets',
  '/men/accessories/bags',
  '/men/accessories/sunglasses',
  '/men/accessories/hats',
  '/men/accessories/belts',
  // Men - Brands
  '/men/brands/re-arranged',
  '/men/brands/counterfeit',
  '/men/brands/full-nelson',
  '/men/brands/my-way',
];

export default function Navigation() {
  const [openAuthModel, setOpenAuthModel] = useState(false)
  const [open, setOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const navigate = useNavigate()
  const token = localStorage.getItem("jwt");
  const auth = useSelector(state => state.auth);
  const user = auth?.user;
  const dispatch = useDispatch();
  const location = useLocation();


  const handleLogout = () => {
    dispatch(logout())
    handleCloseUserMenu();
  }

  const handleCloseUserMenu = () => {
    setIsUserMenuOpen(false);
  };

  const handleOpen = () => setOpenAuthModel(true)
  const handleClose = () => {
    setOpenAuthModel(false)

  }

  useEffect(() => {
    if (token) {
      dispatch(getUser(token));
    }
  }, [token, auth.token])


  useEffect(() => {
    if (auth.user) {
      handleClose();
    }
    if (location.pathname === "/login" || location.pathname === "/register") {
      navigate(-1);
    }

  }, [auth.user])



  return (
    <div className="bg-white z-50">

      {/* ================= MOBILE MENU ================= */}
      <Dialog open={open} onClose={setOpen} className="relative z-40 lg:hidden">
        <DialogBackdrop transition className="fixed inset-0 bg-black bg-opacity-25" />

        <div className="fixed inset-0 z-40 flex">
          <DialogPanel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">

            {/* Close Button */}
            <div className="flex px-4 pt-5 pb-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex items-center rounded-md p-2 text-gray-400"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            {/* Tabs */}
            <TabGroup className="mt-2">
              <div className="border-b border-gray-200">
                <TabList className="-mb-px flex space-x-8 px-4">
                  {navigation.categories.map((category) => (
                    <Tab key={category.name} className="flex-1 px-1 py-4 text-base text-gray-900">
                      {category.name}
                    </Tab>
                  ))}
                </TabList>
              </div>

              <TabPanels as={Fragment}>
                {navigation.categories.map((category) => (
                  <TabPanel key={category.name} className="space-y-10 px-4 pt-10 pb-8">
                    <div className="grid grid-cols-2 gap-x-4">
                      {category.featured.map((item) => (
                        <div key={item.name} className="text-sm">
                          <img src={item.imageSrc} className="rounded-lg w-full" />
                          <a href={item.href} className="mt-6 block font-medium text-gray-900">
                            {item.name}
                          </a>
                        </div>
                      ))}
                    </div>

                    {category.sections.map((section) => (
                      <div key={section.name}>
                        <p className="font-medium text-gray-900">{section.name}</p>
                        <ul className="mt-6 flex flex-col space-y-6">
                          {section.items.map((item) => (
                            <li key={item.name}>
                              <a href={item.href} className={disabledLinks.includes(item.href) ? "text-gray-300 pointer-events-none" : "text-gray-500"}>
                                {item.name} {disabledLinks.includes(item.href) && <span className='text-gray-400'>(upcoming)</span>}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </TabPanel>
                ))}
              </TabPanels>
            </TabGroup>

            {/* Pages */}
            <div className="space-y-6 border-t px-4 py-6">
              {navigation.pages.map((page) => (
                <a key={page.name} href={page.href} className="block text-gray-900">
                  {page.name}
                </a>
              ))}
            </div>

            {/* Logged In */}
            {user && (
              <div className="space-y-6 border-t px-4 py-6">
                <div className="flex items-center gap-3">
                  <Avatar>{user?.firstName?.[0]}</Avatar>
                  <span className="text-gray-900 font-medium">
                    {user?.firstName}
                  </span>
                </div>

                <a
                  onClick={() => {
                    setOpen(false);
                    navigate("/profile");
                  }}
                  className="block text-gray-900 cursor-pointer"
                >
                  Profile
                </a>

                <a
                  onClick={() => {
                    setOpen(false);
                    navigate("/account/orders");
                  }}
                  className="block text-gray-900 cursor-pointer"
                >
                  My Orders
                </a>

                <a
                  onClick={() => {
                    setOpen(false);
                    dispatch(logout());
                  }}
                  className="block text-gray-900 cursor-pointer"
                >
                  Logout
                </a>
              </div>
            )}


            {/* Sign In (Mobile) */}
            {/* Sign In (Mobile) */}
            {!user && (
              <div className="space-y-6 border-t px-4 py-6">
                <button
                  onClick={() => {
                    setOpen(false);   // close mobile menu
                    handleOpen();     // open auth modal
                  }}
                  className="block text-gray-900"
                >
                  Sign in
                </button>

                <button
                  onClick={() => {
                    setOpen(false);
                    handleOpen();
                  }}
                  className="block text-gray-900"
                >
                  Create account
                </button>
              </div>
            )}

            {/* CAD REMOVED */}
          </DialogPanel>
        </div>
      </Dialog>

      {/* ================= DESKTOP NAV ================= */}

      <header className="relative bg-white">
        <p className="flex h-10 items-center justify-center bg-indigo-600 text-sm text-white">
          Get free delivery on orders over $100
        </p>



        <nav className="mx-auto max-w-7xl px-4">
          <div className="border-b">
            <div className="flex h-16 items-center">

              {/* Mobile Menu Button */}
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="rounded-md bg-white p-2 text-gray-400 lg:hidden"
              >
                <Bars3Icon className="h-6 w-6" />
              </button>

              {/* Logo */}
              <div
                onClick={() => navigate("/")}
                className="flex items-center gap-2 cursor-pointer select-none"
              >
                {/* A Logo */}
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-black">
                  <span className="text-2xl font-extrabold text-orange-500">
                    A
                  </span>
                </div>

                {/* Brand Text */}
                <div className="leading-tight">
                  <p className="text-sm font-semibold text-gray-900">
                    Aniket
                  </p>
                  <p className="text-xs text-gray-500">
                    Ecommerce
                  </p>
                </div>
              </div>


              {/* Categories */}
              <PopoverGroup className="hidden lg:ml-10 lg:block">
                <div className="flex h-full space-x-8">

                  {/* ✨ NEW FIXED DROPDOWN CODE HERE */}
                  {navigation.categories.map((category) => (
                    <Popover key={category.name} className="flex flex-col">
                      <PopoverButton className="text-sm text-gray-700 hover:text-gray-800">
                        {category.name}
                      </PopoverButton>

                      <PopoverPanel transition className="absolute inset-x-0 top-full text-sm bg-white shadow-lg z-50 transform transition ease-out duration-200 data-[closed]:opacity-0 data-[closed]:translate-y-1">

                        <div className="mx-auto max-w-7xl px-8 py-10">
                          <div className="grid grid-cols-5 gap-x-8 gap-y-10">

                            {/* LEFT SECTION LISTS */}
                            {category.sections?.map((section) => (
                              <div key={section.name}>
                                <p className="font-medium text-gray-900">{section.name}</p>
                                <ul className="mt-4 space-y-4">
                                  {section.items.map((item) => (
                                    <li key={item.name}>
                                      <a href={item.href} className={disabledLinks.includes(item.href) ? "text-gray-400 pointer-events-none" : "text-gray-600 hover:text-gray-800"}>
                                        {item.name} {disabledLinks.includes(item.href) && <span className='text-gray-500'>(upcoming)</span>}
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}

                            {/* FEATURED IMAGES */}
                            <div className="col-span-2 grid grid-cols-2 gap-8">
                              {category.featured?.map((item) => (
                                <div key={item.name} className="group relative text-base">
                                  <img
                                    src={item.imageSrc}
                                    alt={item.imageAlt}
                                    className="rounded-lg w-full"
                                  />
                                  <a
                                    href={item.href}
                                    className="mt-4 block font-medium text-gray-900"
                                  >
                                    {item.name}
                                  </a>
                                </div>
                              ))}
                            </div>

                          </div>
                        </div>


                      </PopoverPanel>
                    </Popover>
                  ))}

                  {/* Keep pages */}
                  {navigation.pages.map((page) => (
                    <a key={page.name} href={page.href} className="text-sm font-medium text-gray-700 hover:text-gray-800">
                      {page.name}
                    </a>
                  ))}

                  <button className='text-gray-700' onClick={() => navigate("/admin")}>
                    View Admin Dashboard(Demo)
                  </button>
                </div>

              </PopoverGroup>


              {/* RIGHT SIDE */}
              {/* RIGHT SIDE */}
              <div className="ml-auto flex items-center">

                {/* SIGN IN / AVATAR */}
                <div className="hidden lg:flex lg:items-center lg:space-x-6">

                  {auth.user?.firstName ? (
                    <Menu as="div" className="relative inline-block text-left z-50">

                      <MenuButton className="flex items-center justify-center h-9 w-9 rounded-full bg-indigo-600 text-white font-semibold shadow hover:bg-indigo-700 transition">
                        {auth.user.firstName[0].toUpperCase()}
                      </MenuButton>

                      <MenuItems
                        transition
                        className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 
        ring-black ring-opacity-5 focus:outline-none z-50
        transform transition-all duration-200 ease-out
        data-[closed]:scale-95 data-[closed]:opacity-0"
                      >
                        <MenuItem>
                          {({ active }) => (
                            <button
                              onClick={() => navigate("/profile")}
                              className={`${active ? "bg-gray-100" : ""
                                } block w-full text-left px-4 py-2 text-sm text-gray-700`}
                            >
                              Profile
                            </button>
                          )}
                        </MenuItem>

                        <MenuItem>
                          {({ active }) => (
                            <button
                              onClick={() => navigate("/account/orders")}
                              className={`${active ? "bg-gray-100" : ""
                                } block w-full text-left px-4 py-2 text-sm text-gray-700`}
                            >
                              My Orders
                            </button>
                          )}
                        </MenuItem>

                        <MenuItem>
                          {({ active }) => (
                            <button
                              onClick={handleLogout}
                              className={`${active ? "bg-gray-100" : ""
                                } block w-full text-left px-4 py-2 text-sm text-gray-700`}
                            >
                              Logout
                            </button>
                          )}
                        </MenuItem>

                      </MenuItems>
                    </Menu>
                  ) : (
                    <button
                      onClick={handleOpen}
                      className="text-sm font-medium text-gray-700 hover:text-gray-900"
                    >
                      Sign in
                    </button>
                  )}
                </div>

                {/* Search */}
                <button
                  onClick={() => navigate("/search")}
                  className="p-2 text-gray-400 hover:text-gray-500 ml-10"
                >
                  <MagnifyingGlassIcon className="h-6 w-6" />
                </button>

                {/* CART (FIXED) */}
                <button
                  onClick={() => navigate("/cart")}
                  className="group -m-2 flex items-center p-2 ml-10"
                >
                  <ShoppingBagIcon className="h-6 w-6 text-gray-400 group-hover:text-gray-500" />

                  <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                    {useSelector((state) => state.cart.cart?.totalItem ?? 0)}
                  </span>
                </button>

              </div>

            </div>
          </div>
        </nav>
      </header>

      {/* AUTH MODAL */}
      <AuthModel handleClose={handleClose} open={openAuthModel} />
    </div>
  )
}
