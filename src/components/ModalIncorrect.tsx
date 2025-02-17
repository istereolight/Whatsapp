export const ModalIncorrect = ({
  setIsModalStartUpOpen
}) => {

  const handleClick = () => {
    setIsModalStartUpOpen(true);
  }

  return (
    <div className='absolute top-[200px] left-[500px] z-10 text-white bg-[#49575f] w-[450px] h-[200px] rounded-xl'>
      <div className="h-full flex flex-col items-center justify-center">
        <h3 className="mx-5">The data you entered is incorrect!</h3>
        <button 
          className="w-[150px] mt-5 border-2 border-gray-500 rounded-lg px-4 py-2 hover:bg-gray-500"
          onClick={handleClick}
          >
          Try again
        </button>
      </div>
    </div>
  )
}

