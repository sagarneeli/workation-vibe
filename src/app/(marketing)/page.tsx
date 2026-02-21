export default function LandingPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
                <h1 className="text-6xl font-bold">
                    Welcome to <a className="text-blue-600" href="#">Workation Vibe</a>
                </h1>
                <p className="mt-3 text-2xl">
                    Discover the best places to work remotely.
                </p>
            </main>
        </div>
    )
}
