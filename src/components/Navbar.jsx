// Import necessary libraries and components
import { Link, NavLink } from 'react-router-dom';
import { assets } from '../assets/frontend_assets/assets.js';
import { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext.jsx';

const Navbar = () => {

  // State to manage the visibility of the sidebar menu for small screens
  const [visible, setVisible] = useState(false);

  // Destructure setShowSearch and getCartCount functions from ShopContext
  const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext);

  const logout = () => {
    navigate('/login');
    localStorage.removeItem('token');
    setToken('');
    setCartItems({});

  }

  return (
    <div className="flex items-center justify-between py-5 font-medium">

      {/* Logo - Links to Home page */}
      <Link to='/'>
        <img src={assets.logo} className='w-36' alt="logo" />
      </Link>

      {/* Navigation Links - Visible only on larger screens (sm and up) */}
      <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
        <NavLink to='/' className='flex flex-col items-center gap-1'>
          <p>Home</p>
          {/* Horizontal line below text, hidden by default */}
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
        <NavLink to='/collection' className='flex flex-col items-center gap-1'>
          <p>Collection</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
        <NavLink to='/about' className='flex flex-col items-center gap-1'>
          <p>About</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
        <NavLink to='/contact' className='flex flex-col items-center gap-1'>
          <p>Contact</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
      </ul>

      {/* Right-side icons: Search, Profile, Cart, and Menu */}
      <div className='flex items-center gap-6'>
        {/* Search Icon - Triggers search bar */}
        <img onClick={() => setShowSearch(true)} src={assets.search_icon} alt="search" className='w-5 cursor-pointer' />

        {/* Profile Icon with a Dropdown Menu */}
        <div className='group relative '>

          <img onClick={() => token ? null : navigate('/login')} src={assets.profile_icon} alt="profile" className='w-5 cursor-pointer' />
          {/* Dropdown menu appears on hover */}
          {
            token &&
            <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4 '>
              <div className='flex flex-col gap-2 w-36 py-3 bg-slate-100 text-gray-500 rounded items-center'>
                <p className='cursor-pointer hover:text-black'>My Profile</p>
                <p onClick={()=>navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
                <p onClick={logout} className='cursor-pointer hover:text-black'>Logout</p>
              </div>
            </div>
          }
        </div>

        {/* Cart Icon with Item Count */}
        <Link to='/cart' className='relative'>
          <img src={assets.cart_icon} className='w-5 min-w-5' alt="cart" />
          {/* Item count badge */}
          <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
        </Link>

        {/* Hamburger Menu Icon - Visible only on small screens (hidden on sm and up) */}
        <img onClick={() => setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt="menu" />
      </div>

      {/* Sidebar Menu - Visible on small screens */}
      <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
        <div className='flex flex-col text-gray-600'>
          {/* Back button to close the sidebar */}
          <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
            <img src={assets.dropdown_icon} alt="dropdown" className='h-4 rotate-180' />
            <p>Back</p>
          </div>

          {/* Sidebar Navigation Links */}
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/'>Home</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/collection'>Collection</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/about'>About</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/contact'>Contact</NavLink>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
