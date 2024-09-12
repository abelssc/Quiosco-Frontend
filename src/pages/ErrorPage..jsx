import { useNavigate, useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error=useRouteError();
    const navigate = useNavigate();
    console.log(error);
    
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 shadow-md rounded-lg">
                <h1 className="text-6xl font-extrabold text-red-600 mb-4">
                    Oops!
                </h1>
                <p className="text-xl font-semibold text-gray-800 mb-2">
                    Sorry, an unexpected error has occurred.
                </p>
                <p className="text-gray-500">
                    <i>{error?.statusText || error?.message || "Unknown error"}</i>
                </p>
                <button
                    className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    onClick={() => navigate("/")}
                >
                    Go back to Home
                </button>
            </div>
        </div>
    );
}