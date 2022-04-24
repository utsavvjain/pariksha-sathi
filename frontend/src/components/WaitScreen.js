import Spinner from "./Spinner";

export default function WaitScrren() {
    return (
        <div class='z-50 bg-white absolute top-0 right-0 left-0 bottom-0 min-h-fit'>            
                    <h2 class="text-5xl  font-bold mb-2 text-violet-500 flex justify-center text-center mt-60">
                        Parisha Sathi - A one stop solution for all problem
                    </h2>
                <div class="flex justify-center items-center">
                    <div class="spinner-border  my-4 animate-spin w-10 h-10 border-6 rounded-full" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
        </div>
    )
}