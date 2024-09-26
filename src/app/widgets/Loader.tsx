const LoadingPage = () => {
    // return <LoadingSkeleton />
    return (
        <div className="min-h-screen bg-bg flex justify-center items-center">
            <div className="animate-spin w-2 h-2 border-2 border-softpink rounded-full"></div>
        </div>
    )
};

export default LoadingPage;