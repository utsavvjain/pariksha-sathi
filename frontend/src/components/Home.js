import React from "react";
import { Navigate } from "react-router-dom";
import Modal from "./Modal";
import Spinner from "./Spinner";
function SlideText() {
  return (
    <div class="carousel-caption  md:block absolute text-center">
      <h1 class="text-4xl">Pariksha Sathi</h1>
      <p class="text-xl ">One stop solution for all exams</p>
    </div>
  )
}
function RegistrationModal({ showModal, setShowModal, setShowNotificationModal }) {
  const [username, setUsername] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [renterPassword, setRenterPassword] = React.useState("")
  const [usernameError, setUsernameError] = React.useState("")
  const [passwordError, setPasswordError] = React.useState("")
  const [renterPasswordError, setRenterPasswordError] = React.useState("")
  const [showSpinner, setShowSpinner] = React.useState(false)
  const registerUser = () => {
    let error = false;
    let uname = username.trim()
    if (uname.length == 0) {
      setUsernameError("Please enter username")
      error = true
    }
    let pwd = password.trim()
    if (password.length == 0) {
      setPasswordError("Please enter password")
      error = true
    }
    else {
      let pwdAgain = renterPassword.trim()
      if (pwdAgain.length == 0) {
        setRenterPasswordError("Please re-enter password")
        error = true
      }
      else if (pwdAgain !== pwd) {
        setRenterPasswordError("Password do not match")
        error = true
      }
    }
    if (error) return;
    setShowSpinner(true)
    fetch("/api/auth/signup", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "username": uname, "password": pwd })
    }).then((response) => {
      setShowSpinner(false)
      if (response.status == 200) {
        closeModal()
        setShowNotificationModal(true)
        return undefined
      }
      return response.json()
    }).then((error) => {
      console.log(error)
      if(!error) return;
      if (error.username) setUsernameError(error.username)

    })
  }
  function closeModal() {
    setUsername("")
    setPassword("")
    setRenterPassword("")
    setUsernameError("")
    setPasswordError("")
    setRenterPasswordError("")
    setShowModal(false)
  }
  return (
    <>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Register User
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={closeModal}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <div class="mb-6">
                    <input
                      type="text"
                      class={(usernameError.length != 0) ? "form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none  border-red-600" : "form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none "}
                      id="username"
                      value={username}
                      onChange={(ev) => { setUsername(ev.target.value); setUsernameError("") }}
                      placeholder="Username"
                    />
                    <p class="text-red-500 text-sm">{usernameError}</p>
                  </div>
                  <div class="mb-6">
                    <input
                      type="password"
                      class={(passwordError.length != 0) ? "form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none  border-red-600" : "form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none "}
                      id="password"
                      value={password}
                      onChange={(ev) => { setPassword(ev.target.value); setPasswordError("") }}
                      placeholder="Password"
                    />
                    <p class="text-red-500 text-sm">{passwordError}</p>
                  </div>
                  <div class="mb-6">
                    <input
                      type="password"
                      class={(renterPasswordError.length != 0) ? "form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none  border-red-600" : "form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none "}
                      id="renterPassword"
                      value={renterPassword}
                      onChange={(ev) => { setRenterPassword(ev.target.value); setRenterPasswordError("") }}
                      placeholder="Renter Password"
                    />
                    <p class="text-red-500 text-sm">{renterPasswordError}</p>
                  </div>

                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={registerUser}
                  >
                    Register
                    &nbsp;&nbsp;
                    <Spinner showSpinner={showSpinner} />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  )
}
export default function Home(props) {
  const [slide, setSlide] = React.useState(0)
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [redirect, setRedirect] = React.useState(false)
  const [showModal, setShowModal] = React.useState(false)
  const [showSpinner, setShowSpinner] = React.useState(false)
  const [usernameError, setUsernameError] = React.useState("")
  const [passwordError, setPasswordError] = React.useState("")
  const [error, setError] = React.useState("")
  const [showNotificationModal, setShowNotificationModal] = React.useState(false);

  function login() {
    let error = false;
    let uname = username.trim()
    let pwd = password.trim()
    if (uname.length == 0) {
      setUsernameError("Enter username")
      error = true
    }
    if (pwd.length == 0) {
      setPasswordError("Enter username")
      error = true
    }
    if (error) return;
    setShowSpinner(true)
    fetch("/api/auth/signin", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "username": username, "password": password })
    }).then((response) => {
      setShowSpinner(false)
      if (response.status == 200) return response.json()
      if (response.status == 401) setError("Invalid username/password")
      return null
    }).then((login_details) => {
      if (login_details) {
        localStorage.setItem("login_details", JSON.stringify(login_details))
        props.dispatch({
          type: "LOGGED_IN",
          payload: true
        })
      }
    })
  }

  const nextSlider = () => {
    if (slide === 2) setSlide(0)
    else setSlide(slide + 1)
  }
  const prevSlider = () => {
    if (slide === 0) setSlide(2)
    else setSlide(slide - 1)
  }

  if (redirect) return (
    <Navigate replace to="/" />
  )
  return (
    <>
      <Modal setShowModal={setShowNotificationModal} showModal={showNotificationModal} header={"Notification"} body={<>

        User Registered
      </>} />
      <RegistrationModal showModal={showModal} setShowModal={setShowModal} setShowNotificationModal={setShowNotificationModal} />
      <div id="carouselExampleCaptions" class="carousel slide relative" data-bs-ride="carousel">
        <div class="carousel-indicators absolute right-0 bottom-0 left-0 flex justify-center p-0 mb-4">
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="0"
            class={(slide === 0) ? "active" : ''}
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="1"
            aria-label="Slide 2"
            class={(slide === 1) ? "active" : ''}
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="2"
            class={(slide === 2) ? "active" : ''}
            aria-label="Slide 3"
          ></button>
        </div>
        <div class="carousel-inner relative w-full overflow-hidden">
          <div class={["carousel-item relative float-left w-full", (slide === 0) ? "active" : ''].join(' ')}>
            <img
              src="https://images.indianexpress.com/2017/02/exam-student-7591.jpg"
              class="block w-full object-fit h-screen"
              alt="..."
            />
            <SlideText />
          </div>
          <div class={["carousel-item relative float-left w-full", (slide === 1) ? "active" : ''].join(' ')}>
            <img
              src="https://marvel-b1-cdn.bc0a.com/f00000000026007/resilienteducator.com/wp-content/uploads/2014/11/math-teacher.jpg"
              class="block w-full object-fit h-screen"
              alt="..."
            />
            <SlideText />
          </div>
          <div class={["carousel-item relative float-left w-full", (slide === 2) ? "active" : ''].join(' ')}>
            <img
              src="https://i.imgflip.com/617f33.jpg"
              class="block w-full object-fit h-screen"
              alt="..."
            />
            <SlideText />
          </div>
        </div>
        <button
          class="carousel-control-prev absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0"
          type="button"
          onClick={prevSlider}
        >
          <span class="carousel-control-prev-icon inline-block bg-no-repeat" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0"
          type="button"
          onClick={nextSlider}
        >
          <span class="carousel-control-next-icon inline-block bg-no-repeat" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
      <section class="h-screen">
        <div class="px-6 h-full text-gray-800">
          <div
            class="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6"
          >
            <div
              class="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0"
            >
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                class="w-full"
                alt="Sample image"
              />
            </div>
            <div class="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
              <p class="text-red-500 text-lg m-2">  {error}</p>
              <form>
                <div class="mb-6">
                  <input
                    type="text"
                    class={(usernameError.length != 0) ? "form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none  border-red-600" : "form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none "}
                    id="username"
                    placeholder="Username"
                    value={username}
                    onChange={(ev) => { setUsername(ev.target.value); setUsernameError(""); setError("") }}
                  />
                  <p class="text-red-500 text-sm">{usernameError}</p>
                </div>

                <div class="mb-6">
                  <input
                    type="password"
                    class={(passwordError.length != 0) ? "form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none  border-red-600" : "form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none "}
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(ev) => { setPassword(ev.target.value); setPasswordError(""); setError("") }}
                  />
                  <p class="text-red-500 text-sm">{passwordError}</p>
                </div>

                <div class="text-center lg:text-left">
                  <button
                    type="button"
                    onClick={login}
                    class="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Login&nbsp;&nbsp;
                    <Spinner showSpinner={showSpinner} />
                  </button>
                  <p class="text-sm font-semibold mt-2 pt-1 mb-0">
                    Or Don't have an account?
                    <a
                      href=""
                      onClick={(ev) => { ev.preventDefault() }}
                      class="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                      onClick={(ev) => { ev.preventDefault(); setShowModal(true) }}
                    >Register</a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}