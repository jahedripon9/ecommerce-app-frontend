// Import useState hook from React
import { useState } from "react"

const Login = () => {

  // State to track whether the form is in 'Login' or 'Sign Up' mode
  const [currentState, setCurrentState] = useState('Sign Up');

  // Event handler for form submission
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    // Add your form submission logic here (e.g., API call)
  }

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800">

      {/* Title Section */}
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {/* Conditional rendering: Show Name field only for 'Sign Up' */}
      {currentState === 'Login' ? '' : <input type="text" className="w-full px-3 py-2 border border-gray-800" placeholder="Name" required />}

      {/* Email field */}
      <input type="email" className="w-full px-3 py-2 border border-gray-800" placeholder="Email" required />

      {/* Password field */}
      <input type="password" className="w-full px-3 py-2 border border-gray-800" placeholder="Password" required />

      {/* Forgot Password and Toggle between Login/Sign Up */}
      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer">Forgot your Password?</p>
        {
          currentState === 'Login'
            ? <p onClick={() => setCurrentState('Sign Up')} className="cursor-pointer">Create account</p>
            : <p onClick={() => setCurrentState('Login')} className="cursor-pointer">Login Here</p>
        }
      </div>

      {/* Submit Button */}
      <button className="bg-black text-white font-light px-8 py-2 mt-4">
        {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
      </button>
    </form>
  )
}

export default Login
