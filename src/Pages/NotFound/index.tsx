
const NotFound = () => {
    return (
        <div className="h-screen w-full flex items-center justify-center bg-white">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-primary-200">404 - Page Not Found</h1>
                <p className="text-primary-100">Sorry, the page you're looking for does not exist.</p>
                <img src="/Assets/404.gif" alt="404 GIF" className="mt-4 w-full max-w-md mx-auto" />
            </div>
        </div>
    );
};

export default NotFound;