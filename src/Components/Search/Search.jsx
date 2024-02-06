// depend
import { useContext, useState } from "react";
import { Link } from "react-router-dom"
import Pagination from '@mui/material/Pagination';
// files
import { BookContext } from "../../Context";
import Loading from "../Loading/Loading";

const Content = (item) => {
  const authors = item.authors.join(",");
  const categories = item.categories.join(",");
  return (
    <div className="single_featured_item single_item">
      <Link to={`/search/${item.title}`}><img src={item.thumbnailUrl} className="poster_image" onError={(e) => e.currentTarget.src = "../../../68-280x380.jpg"} /></Link>
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

const Search = () => {
  const { searchedBooks, searchPage, setSearchPage, searchTerm } = useContext(BookContext);
  const [booksPerPage] = useState(10);
  // paginate
  const indexOfLastBook = searchPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = searchedBooks?.slice(indexOfFirstBook, indexOfLastBook);

  const paginate = (e, value) => {
    setSearchPage(value);
    window.scrollTo({ top: -600, behavior: 'smooth' });
  };
  
  return (
    <>
      <section id="search">
        {searchedBooks.length === 0 && searchTerm && <div className="title">
          <h1>No Results Found</h1>
        </div>}
        {searchedBooks.length > 0 && <main id="featured">
          <div className="container">
            <div className="title">
              <h1>Search Results</h1>
            </div>
            <section className="featured_section section" style={{ marginBottom: "1em" }}>
              {currentBooks.map((item) => {
                return (
                  <Content {...item} key={item.title} />
                )
              })}
            </section>
            {searchedBooks.length > 10 &&
              <Pagination
                color="standard"
                shape="rounded"
                defaultPage={1}
                count={Math.ceil(searchedBooks.length / booksPerPage)}
                page={searchPage}
                onChange={paginate}
                size="large"
              />
            }
          </div>
          {searchTerm !== "" && <div className="border"></div>}
        </main>}
      </section>
    </>
  )
}
export default Search;