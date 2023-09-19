import Image from "next/image"
import AuthForm from "./components/AuthForm"

export default function Home() {
    return (
        <div
            className="
            flex 
            justify-center
            
        "
        >
            <video
                src="/videos/bg-fluid2.mp4"
                autoPlay
                loop
                muted
                className="
                    fixed
                "
            >
            </video>
            <div className="wrapper md:opacity-0"></div>
            <div className="absolute top-6 justify-center items-center sm:mx-auto mx-20 sm:w-full sm:max-w-md bg-white rounded-lg pb-10 shadow-gray-600 shadow-md ">
                <Image
                    alt="React"
                    height={60}
                    width={60}
                    src='/images/react.png'
                    title="React"
                    className="mx-auto w-auto mt-5 hover:animate-spin"
                    priority
                />
                <h2
                    className="
                    mt-6
                    text-center
                    text-3xl
                    lg:text-4xl
                    font-bold
                    tracking-tight
                    text-black
                "
                >
                    Login
                </h2>
                <AuthForm />
            </div>
            
        </div>
    )
}
