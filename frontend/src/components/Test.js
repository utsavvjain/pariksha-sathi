import React from "react"
import { useParams } from "react-router-dom"
import WaitScrren from "./WaitScreen"
export default function Test(props) {
    let params = useParams()
    const [questions, setQuestions] = React.useState([])
    const [current, setCurrent] = React.useState(1)
    const [selection, setSelection] = React.useState(-1)
    const [response, setResponse] = React.useState([])
    const [wait, setWait] = React.useState(true)
    const selectOption = (index) => {
        setSelection(index)
        let res = response;
        res[current - 1] = index
        setResponse(res)
        sendQuestionResponse(index)
    }
    const sendQuestionResponse = (res) => {
        let req = {
            questionIndex: current - 1,
            answerIndex: res
        }
        fetch("/api/subject/" + params.subject, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + JSON.parse(localStorage.getItem("login_details")).JWT
            },
            body: JSON.stringify(req)
        }).then((response) => {
            if (response.status != 200) console.error("Unsucessfull request")
        })
    }
    const clearSelection = () => {
        setSelection(-1)
        let res = response;
        res[current - 1] = -1
        setResponse(res)
        sendQuestionResponse(-1)

    }
    React.useEffect(() => {
        fetch("/api/subject/" + params.subject, {
            'method': 'GET',
            headers: {
                'authorization': 'Bearer ' + JSON.parse(localStorage.getItem("login_details")).JWT
            }
        }
        ).then((response) => response.json()).then((response) => {
            console.log(response)
            setQuestions(response.questions)
            setResponse(response.responses)
            setSelection(response.responses[0])
            setWait(false)
        })
    }, [])
    if (wait) return (<WaitScrren />)
    return (
        <div class=' min-h-screen absolute top-0 left-0 bottom-0 right-0'>
            <div class='mt-20 p-5' >
                <div class='container flex justify-between space-x-6'>
                    <div class='w-2/3 min-h-screen'>
                        <div class='flex justify-between'>
                            <h2 class="text-1xl  font-bold mb-2 text-violet-500 ">
                                Question {current}.
                            </h2>
                            <button class="rounded-full bg-blue-400 p-2 text-xs mb-2 text-white hover:bg-blue-500 shadow-rose-200xl" onClick={clearSelection}>
                                Clear Selection
                            </button>

                        </div>
                        <h2 class="text-2xl font-bold mb-2 text-black ">
                            {
                                questions.length > 0 && questions[current - 1].question

                            }
                        </h2>
                        <div class='grid grid-cols-2 my-5'>
                            {
                                questions[current - 1].options.map((value, index) => {
                                    if (selection == index)
                                        return (
                                            <button class='rounded-full m-2 bg-green-400 shadow-lg flex justify-center text-white   p-5' >{value}</button>
                                        )

                                    return (
                                        <button class='rounded-full m-2 bg-gray-400 shadow-lg flex justify-center text-white  hover:bg-violet-500 p-5' onClick={() => { selectOption(index) }} >{value}</button>
                                    )

                                })

                            }


                        </div>
                    </div>
                    <div class='w-1/3 min-h-screen bg-gray-50 p-4 rounded-2xl shadow-2xl border-violet-500 border-t-2 '>
                        <h2 class="text-4xl justify-center flex font-bold mb-2 text-violet-600 ">
                            {params.subject.replace('-',' ')}
                        </h2>

                        <hr class='my-3   text-black' />
                        <h2 class="text-1xl font-bold mb-2 text-black ">
                            Questions
                        </h2>
                        <div class='grid grid-cols-5'>
                            {
                                questions.map((value, idx) => {
                                    if (idx == current - 1) return (
                                        <div class='rounded-full m-2 shadow-lg flex justify-center text-white  bg-violet-500 p-4'>{idx + 1}</div>
                                    )
                                    if (response[idx] != -1) {
                                        return (
                                            <div class='rounded-full m-2 bg-green-300 shadow-lg flex justify-center text-white  hover:bg-violet-500 p-4' onClick={() => {
                                                setCurrent(idx + 1)
                                                setSelection(response[idx])
                                            }}>{idx + 1}</div>
                                        )
                                    }
                                    return (
                                        <div class='rounded-full m-2 bg-gray-300 shadow-lg flex justify-center text-white  hover:bg-violet-500 p-4' onClick={() => {
                                            setCurrent(idx + 1)
                                            setSelection(response[idx])
                                        }}>{idx + 1}</div>
                                    )
                                })
                            }
                        </div>

                        <div class='flex justify-between  my-40 space-x-16'>
                            <button class='w-1/2 rounded-full bg-slate-400 shadow-gray-300  text-white hover:bg-violet-500 shadow-xl p-5' onClick={() => {
                                if (current > 1) {
                                    let crnt = current - 1
                                    setCurrent(crnt)
                                    setSelection(response[crnt - 1])
                                }
                            }}>Previous</button>
                            <button class='w-1/2 rounded-full bg-slate-400 shadow-gray-300  text-white hover:bg-violet-500 shadow-xl p-5 '
                                onClick={() => {
                                    if (current < questions.length) {
                                        let crnt = current + 1
                                        setCurrent(crnt)
                                        setSelection(response[crnt - 1])
                                    }
                                }}>Next</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}