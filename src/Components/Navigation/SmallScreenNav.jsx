// depend
import {Link} from "react-router-dom";
import {useState} from "react"
import logo from "../../images/free-logoa.jpg"
// variables 
const styleOpenNav = {
  left: "0",
  opacity: "1"
}
const SmallScreenNav = () => {
  // open or close small screen nav
  const [openNav, setOpenNav] = useState(false)
  function toggleNavOpen() {
    setOpenNav((prev) => true);
  }
  function toggleNavClose() {
    setOpenNav((prev) => false);
  }
  return (
    <header id="small_screen_header">
      <div className="small_screen_nav_container">
        <div className="small_screen_nav_logo_container">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" onClick = {toggleNavOpen}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
          <img src={logo} alt="logo" className="logo" />
        </div>
        <nav id="small_screen_nav" style = {openNav ? styleOpenNav: {}}>
          <div className="small_screen_nav_logo_container">
            <img src="../../../free-logoa.jpg" alt="logo" className="logo" />
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" onClick = {toggleNavClose}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <ul>
            <li><Link to = "/">Home</Link></li>
            <li><Link to = "/catalogue">Catalogue</Link></li>
            <li><Link to = "/about">About Us</Link></li>
          </ul>
          <ul>
            <li><a href = "https://www.linkedin.com/in/bruce-mahagwa-3a658b228/" target = "blank">Linkedin</a></li>
            <li><a href = "https://github.com/Bruce-Mahagwa" target = "blank">Github</a></li>
            <li><a href = "https://replit.com/@brucejacob" target = "blank">Replit</a></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
export default SmallScreenNav;