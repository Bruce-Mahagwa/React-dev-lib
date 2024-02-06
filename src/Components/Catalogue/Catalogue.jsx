// files
import { BookContext } from "../../Context";
// depend
import { useContext, useState } from "react";
import Pagination from '@mui/material/Pagination';
import { Link } from "react-router-dom"

const Categories = ({ categories }) => {
  const { setCatalogueGenre, setPages, setYear, pages } = useContext(BookContext);
  const [openOptions, setOpenOptions] = useState(false);
  // open more filter options or close
  function toggleOptions() {
    setOpenOptions(prev => !prev);
  }
  if (openOptions === false) {
    setYear(null);
    setPages(null);
  }
  function handleChange(e) {
    const { value } = e.target;
    setCatalogueGenre(value)
  }

  return (
    <header id="catalogue_header">
      <div className="catalogue_buttons">
        <form action="#">
          <label htmlFor="genres_catalogue">Select Book Genres</label>
          <select name="categories" id="genres_catalogue" onChange={handleChange}>
            {categories.map((item) => {
              return (
                <option value={item} key={item}>{item}</option>
              )
            })}
          </select>
        </form>
        <button className = "btn" onClick = {toggleOptions}>More options</button>
        {openOptions && <form action = "#" className = "more_options">
				<label htmlFor = "year">Year</label>
        <select name="year" id="year" onChange={(e) => setYear(e.target.value)} style = {{marginBottom: "1em"}}>
          <option value="1970" selected>Since 1970</option>
          <option value="1980">Since 1980</option>
          <option value="1990">Since 1990</option>
          <option value="2000">Since 2000</option>
          <option value="2005">Since 2005</option>
          <option value="2010">Since 2010</option>
          <option value="2015">Since 2015</option>
          <option value="2017">Since 2017</option>
          <option value="2019">Since 2019</option>
        </select>
				<label htmlFor = "pages">Pages</label>
				<input type = "range" min = "0" max = "1000" step = "1" id = "pages" onChange = {(e) => setPages(e.target.value)} /><span>{pages ? pages : ""}</span>
			</form>}
      </div>
    </header>
  )
}

const Content = (item) => {
  const authors = item.authors.join(",");
  const categories = item.categories.join(",");
  return (
    <div className="single_catalogue_item single_item">
      <Link to={`/catalogue/${item.title}`}><img src={item.thumbnailUrl} className="poster_image" onError={(e) => e.currentTarget.src = "../../../68-280x380.jpg"} /></Link>
      <div className="single_catalogue_item_details">
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

const Catalogue = () => {
  const [booksPerPage] = useState(10);
  const { categories, catalogueGenreData, currentPage, setCurrentPage, year, pages} = useContext(BookContext);

  // paginate
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = catalogueGenreData?.slice(indexOfFirstBook, indexOfLastBook);
  
  const paginate = (e, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: -600, behavior: 'smooth' });
  };
  
  return (
    <>
      {catalogueGenreData && currentBooks?.length === 0 && (year || pages) && <div className="title" style = {{display: "block"}}>
            <h1>No Results Found</h1>
        <p style = {{color: "red"}}>Here</p>
          </div>}
    <section id="catalogue">
      <Categories categories={categories} />
      {(catalogueGenreData !== null && catalogueGenreData !== undefined && catalogueGenreData.length > 0) && <main>
        <div className="container">
          <div className="title">
            <h1>{catalogueGenreData[0].categories[0]}</h1>
          </div>
          <section className="catalogue_section section">
            {currentBooks.map((item) => {
              return (
                <Content {...item} key={item.title} />
              )
            })}
          </section>
          {catalogueGenreData.length > 10 &&
            <Pagination
              color="standard"
              shape="rounded"
              defaultPage={1}
              count={Math.ceil(catalogueGenreData.length / booksPerPage)}
              page={currentPage}
              onChange={paginate}
              size="large"
            />
          }

        </div>
      </main>}
    </section>
    </>
  )
}
export default Catalogue