//depend
import { useContext, useRef } from "react"
import { useLocation } from "react-router-dom";
// files
import { BookContext } from "../../Context";
const Banner = () => {
  const { setSearchTerm } = useContext(BookContext);
  const inputValue = useRef()
  function submitSearch() {
    let value = inputValue.current.value;
    setSearchTerm(value)
  }
  // check page url
  const page = useLocation()
  const location= useLocation()
  return (
    <section id="banner">
      <div className="banner_container">
        <h1>Welcome to our book reference site where you can search for hundreds of programming books</h1>
        {location.pathname === "/" && <div className="input_container">
          <input type="text" name="search" placeholder="search" className="input" ref={inputValue} />
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 search_box" onClick={submitSearch}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </div>}
      </div>
    </section>
  )
}
export default Banner;