
export const Loader = () => {
  return (
    <div className=" w-full h-full fixed inset-0 flex items-center justify-center">
      <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-primary-300"></div>
    </div>
  );
};

export const FullLoader = () => {
  return (
    <div className="w-full h-screen absolute inset-0 z-50 bg-white flex items-center justify-center">
      <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-primary-300"></div>
    </div>
  )
}

export const ButtonLoader = ({className}:any) => {
  return (
    <div className="w-full h-full flex items-center">
      <div className={`animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 ${className} border-primary-300`}></div>
    </div>
  )
}