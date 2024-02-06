// depend
import { useContext } from "react";
import { Link } from "react-router-dom";
// files
import { BookContext } from "../../Context";
import Loading from "../Loading/Loading";
const Content = (item) => {
  const authors = item.authors.join(",");
  const categories = item.categories.join(",");
  return (
    <div className="single_featured_item single_item">
      <Link to={`/${item.title}`}><img src={item.thumbnailUrl} className="poster_image" onError={(e) => e.currentTarget.src = "../../../68-280x380.jpg"} /></Link>
      <div className="single_featured_item_details">
        <h3>{item.title}</h3>
        <small>by {authors}</small>
        <p>{categories}</p>
        <div className="featured_text">
          <p>{item.shortDescription ? item.shortDescription : item.longDescription ? item.longDescription : "no description"}</p>
        </div>
      </div>
    </div>
  )
}

const Featured = () => {
  const { featured } = useContext(BookContext);
  return (
    <>
      {!featured && <Loading />}
    {featured && <main id="featured">
        <div className="container">
          <div className="title">
            <h1>Featured Books</h1>
          </div>
          <section className="featured_section section">
            {featured.map((item) => {
              return (
                <Content {...item} key={item.title} />
              )
            })}
          </section>
        </div>
      </main>}
    </>
  )
}
export default Featured;