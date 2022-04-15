import React from "react";
import { Navigate } from "react-router-dom";
function SlideText() {
    return (
        <div class="carousel-caption  md:block absolute text-center">
            <h1 class="text-4xl">Pariksha Sathi</h1>
            <p class="text-xl ">One stop solution for all exams</p>
        </div>
    )
}
export default function Home(props) {
    const [slide, setSlide] = React.useState(0)
    const [username,setUsername]=React.useState('')
    const [password,setPassword]=React.useState('')
    const [redirect,setRedirect]=React.useState(false)
    function login(){
        return fetch("/api/auth/signin",{
          method : 'POST',
          headers : {
            'Content-Type' : 'application/json'
          },
          body : JSON.stringify({"username" : username,"password" : password})
        }).then((response)=>{
          if(response.status==200) return response.json()
        }).then((login_details)=>{
          localStorage.setItem("login_details",login_details)
            props.dispatch({
              type : "LOGGED_IN",
              payload : true
            })           
        })
    }
        
    const nextSlider=()=>{
        if(slide===2) setSlide(0)
        else setSlide(slide+1)
    }
    const prevSlider=()=>{
        if(slide===0) setSlide(2)
        else setSlide(slide-1)
    }
    
    if(redirect) return (
      <Navigate replace to="/"/>
    )
    return (
        <>

        <div id="carouselExampleCaptions" class="carousel slide relative" data-bs-ride="carousel">
            <div class="carousel-indicators absolute right-0 bottom-0 left-0 flex justify-center p-0 mb-4">
                <button
                    type="button"
                    data-bs-target="#carouselExampleCaptions"
                    data-bs-slide-to="0"
                    class={(slide===0)?"active":''}
                    aria-current="true"
                    aria-label="Slide 1"
                ></button>
                <button
                    type="button"
                    data-bs-target="#carouselExampleCaptions"
                    data-bs-slide-to="1"
                    aria-label="Slide 2"
                    class={(slide===1)?"active":''}
                ></button>
                <button
                    type="button"
                    data-bs-target="#carouselExampleCaptions"
                    data-bs-slide-to="2"
                    class={(slide===2)?"active":''}
                    aria-label="Slide 3"
                ></button>
            </div>
            <div class="carousel-inner relative w-full overflow-hidden">
            <div class={["carousel-item relative float-left w-full",(slide===0)?"active":''].join(' ')}>
                    <img
                        src="https://images.indianexpress.com/2017/02/exam-student-7591.jpg"
                        class="block w-full object-fit h-screen"
                        alt="..."
                    />
                    <SlideText />
                </div>
                <div class={["carousel-item relative float-left w-full",(slide===1)?"active":''].join(' ')}>
                    <img
                        src="https://marvel-b1-cdn.bc0a.com/f00000000026007/resilienteducator.com/wp-content/uploads/2014/11/math-teacher.jpg"
                        class="block w-full object-fit h-screen"
                        alt="..."
                    />
                    <SlideText />
                </div>
                <div class={["carousel-item relative float-left w-full",(slide===2)?"active":''].join(' ')}>
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
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide="prev"
                onClick={prevSlider}
            >
                <span class="carousel-control-prev-icon inline-block bg-no-repeat" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button
                class="carousel-control-next absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0"
                type="button"
                data-bs-target="#carouselExampleCaptions"
                onClick={nextSlider}
                data-bs-slide="next"
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
        <form>


          <div class="mb-6">
            <input
              type="text"
              class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="exampleFormControlInput2"
              placeholder="Email address"
              value={username}
              onChange={(ev)=>{setUsername(ev.target.value)}}
            />
          </div>

          <div class="mb-6">
            <input
              type="password"
              class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="exampleFormControlInput2"
              placeholder="Password"
              value={password}
              onChange={(ev)=>{setPassword(ev.target.value)}}
            />
          </div>

          <div class="text-center lg:text-left">
            <button
              type="button"
              onClick={login}
              class="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            >
              Login
            </button>
            <p class="text-sm font-semibold mt-2 pt-1 mb-0">
              Or Don't have an account?
              <a
                href=""
                class="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                >Register</a
              >
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