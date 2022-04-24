import React from 'react'
import { Link } from 'react-router-dom';
import WaitScrren from './WaitScreen';
function SubjectCards(props) {
    return (
        <div class="block p-6 max-w-sm bg-slate-50 rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 my-2">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{props.subject}</h5>
            <p class="font-normal text-gray-700 dark:text-gray-400">Test your skills of {props.subject} by taking the following test</p>
            <Link to={'/test/' + props.subject.split(" ").join("-")}>
                <button class='rounded-lg bg-gray-200 p-2 my-3 text-violet-800'>Attempt Test</button>
            </Link>
            <hr class='mt-3 mb-3' />
            <p class='text-xs text-gray-500 flex align-baseline'>
                <img alt="button" src="https://relevel.com/_next/image?url=%2Fpost-slot-booking%2Fbulb.svg&w=16&q=75" decoding="async" class='inline-block align-middle' />
                &nbsp;&nbsp;PC with an internet is mandatory for taking the Test.</p>
        </div>)
}
function InformationPannel(props) {
    const [time, setTime] = React.useState()
    function showTime() {
        let time = new Date();
        let hour = time.getHours();
        let min = time.getMinutes();
        let sec = time.getSeconds();
        let am_pm = "AM";
        let hr;
        if (hour > 12) {
            hour -= 12;
            am_pm = "PM";
        }
        if (hour == 0) {
            hour = 12;
            am_pm = "AM";
        }

        hour = hour < 10 ? "0" + hour : hour;
        min = min < 10 ? "0" + min : min;
        sec = sec < 10 ? "0" + sec : sec;
        let ct = hour + ":"
            + min + ":" + sec + ' ' + am_pm;

        setTime(ct)
    }

    React.useEffect(() => {
        setInterval(showTime, 1000);
        showTime()
    }, [])
    return (
        <div class='container  px-10 py-6'>
            <h2 class="text-6xl font-bold mb-2 text-black ">
                Welcome, {props.name}
            </h2>
            <h3 class="text-lg font-bold mb-2 px-1 text-teal-600 ">
                Current time : {time}
            </h3>
        </div>
    )
}
export default function Dashboard(props) {
    const [wait, setWait] = React.useState(true)
    const [subjects, setSubjects] = React.useState([])
    React.useEffect(() => {
        fetch('/api/user/subjects', {
            'method': 'GET',
            headers: {
                'authorization': 'Bearer ' + JSON.parse(localStorage.getItem("login_details")).JWT
            }
        }).then((response) => response.json()).then((response) => {
            console.log(response)
            setSubjects(response.subjects)
            setWait(false)
        })
    }, [])
    if (wait) return (<WaitScrren />)
    return (
        <div class=" min-h-screen absolute top-0 left-0 bottom-0 right-0">
            <div class='mt-20'>
                <InformationPannel name={props.name} />
                <div class='px-10'>
                    <h2 class="text-2xl font-bold mb-2 text-black ">
                        Test your skills
                    </h2>
                    <div class='grid grid-cols-3'>
                        {
                            subjects.map((value, idx) => {
                                return (
                                    <SubjectCards subject={value} />
                                )
                            })
                        }
                    </div>
                </div>
                <div class='px-10 py-5'>
                    <h2 class="text-sm font-bold mb-2 text-gray-700 ">
                    </h2>
                    *Once started, you cannot reattempt the test, In case of any failure drop a mail at support.
                </div>
            </div>
        </div>
    )
}