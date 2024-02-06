// depend
import {useContext, useEffect, useState} from "react"
import {useLocation} from "react-router-dom";
// files
import {BookContext} from "../../Context";
const SinglePage = () => {
  const {singleBook, setBookTitle, setCheckPage} = useContext(BookContext);
  // const [locationData, setLocationData] = useState(null)
  const location = useLocation();
  const locationData = location.pathname.split("/")
  useEffect(() => {
    if (locationData) {
      let len = locationData.length
      // console.log("here", len)
      setCheckPage(len);
      setBookTitle(locationData[len - 1]);
    }
  }, [])

  let authors, categories;
  if (singleBook) {
    authors = singleBook.authors.join(",");
    categories = singleBook.categories.join(",");
  }
  return (
    <>
  {singleBook !== null && singleBook !== undefined && <section id = "single_book">
	<div className = "single_book_container">
		<div className = "img_container">
			<img src={singleBook.thumbnailUrl} className="poster_image" onError={(e) => e.currentTarget.src = "../../../68-280x380.jpg"} />
		</div>
		<div className = "book_details">
			<h3>{singleBook.title}</h3>
			<p>{authors}</p>
			<h5>{categories}</h5>
		</div>
		<div className = "book_text">
			 <p>{singleBook.longDescription ? singleBook.longDescription : singleBook.shortDescription ? singleBook.shortDescription : "no description"}</p>
		</div>
	</div>
</section>
}
  </>
  )
}
export default SinglePage