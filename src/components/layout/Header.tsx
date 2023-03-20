const Header = () => {
    return (
      <header className="bg-gray-800 shadow">
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-extrabold leading-9 text-white">
            Top Free Books: 
            <span className="block md:inline text-2xl sm:text-3xl ml-1">Trending Public Domain Books<sup>*</sup></span>
          </h1>
          <p className="text-base font-semibold leading-7 text-fuchsia-400 mb-2">*from the Project Gutenberg website</p>
        </div>
      </header>
    )
  }
  
  export default Header
  