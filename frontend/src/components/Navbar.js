import { Link } from "react-router-dom";

export default function Navbar(props) {
  return (
    <nav class="relative flex flex-wrap items-center justify-between px-2 py-3 bg-white bg-opacity-40 mb-3 z-40 h-15 shadow-lg">
      <div class="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <div class="w-full relative flex justify-between lg:w-auto  px-4 lg:static lg:block lg:justify-start">
          <Link to='/' class="text-xl font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-purple-700" href="/">
            Pariksha Sathi
          </Link>
        </div>
        <div class="lg:flex flex-grow items-center" id="example-navbar-warning">
          <ul class="flex flex-col lg:flex-row list-none ml-auto">
            <li class="nav-item">
              <Link to='/' class="text-sm font-bold leading-relaxed inline-block mr-5 py-2 whitespace-nowrap uppercase text-black hover:text-gray-700" href="/">
                Home
              </Link>
            </li>
            <li class="nav-item">
              <div class="text-sm font-bold leading-relaxed inline-block mr-5 py-2 whitespace-nowrap uppercase text-black hover:text-gray-700" onClick={() => {
                localStorage.removeItem("login_details")
                props.dispatch({
                  type: "LOGGED_IN",
                  payload: false
                })

              }}>
                Logout
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}