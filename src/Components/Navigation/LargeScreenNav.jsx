// depend
import {Link} from "react-router-dom";
import logo from "../../images/free-logoa.jpg"
const LargeScreenNav = () => {
  return (
    <header id = "large_screen_header">
	  <div className = "large_screen_nav_container">
		<div>
			<img src = {logo} alt = "logo" className = "logo" />	
		</div>
		<div>
			<ul>
            <li><Link to = "/">Home</Link></li>
            <li><Link to = "/catalogue">Catalogue</Link></li>
            <li><Link to = "/about">About Us</Link></li>
      </ul>
		</div>
	</div>
</header>
  )
}
export default LargeScreenNav;