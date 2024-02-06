// depend
import { createContext, useState, useEffect } from "react";
// variables
import books from "./books.json"
const BookContext = createContext({});

const BookContextProvider = ({ children }) => {
  // get all available books first
  const [allBooks, setAllBooks] = useState([])
  useEffect(() => {
    setAllBooks(books)
  }, [])
  // useEffect(() => {
  //   fetch("./books.json").then((res) => {
  //     return res.json()
  //   }).then((data) => {
  //     setAllBooks(data)
  //   })
  // }, []);
  // get all featured books
  const [featured, setFeatured] = useState([]);
  useEffect(() => {
    if (allBooks) {
      let features = allBooks.slice(0, 20);
      setFeatured([...features])
    }
  }, [allBooks])
  // get book categories
  const [categories, setCategories] = useState([])
  useEffect(() => {
    if (allBooks) {
      const categoriesList = Array.from(new Set(allBooks.map((item) => {
        return item.categories[0]
      })))
      setCategories(categoriesList)
    }
  }, [allBooks])
  // get chosen category of books in the catalogue page
  const [catalogueGenre, setCatalogueGenre] = useState(null);
  const [catalogueGenreData, setCatalogueGenreData] = useState(null);
  const [pages, setPages] = useState(null);
  const [year, setYear] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  useEffect(() => {
    let data;
    if (catalogueGenre) {
      setCurrentPage(1)
      data = allBooks.filter((item) => {
        return item.categories[0] === catalogueGenre
      });
      if (year) {
        setCurrentPage(1)
        data = data.filter((item) => {
          return Number(item?.publishedDate?.$date.substr(0, 4)) >= Number(year) || item.publishedDate?.date === null
        })
      }
      if (pages) {
        setCurrentPage(1)
        data = data.filter((item) => {
          return Number(item.pageCount) <= Number(pages)
        })
      }
      setCatalogueGenreData(data);
    }
  }, [catalogueGenre, pages, year])

  // get single book
  const [singleBook, setSingleBook] = useState(null)
  const [bookTitle, setBookTitle] = useState(null);
  const [checkPage, setCheckPage] = useState(null);

  useEffect(() => {
    if (bookTitle && allBooks.length > 0 && featured.length > 0) {
      let val = bookTitle.replaceAll("%20", " ")
      let data;
      if (checkPage === 3) {
        data = allBooks.find((item) => {
          return item.title === val
        })
      }
      else if (checkPage === 2) {
        data = featured.find((item) => {
          return item.title === val
        })
      }
      setSingleBook(data);
    }
  }, [bookTitle, allBooks, featured])
  // search for books
  const [searchTerm, setSearchTerm] = useState(null);
  const [searchedBooks, setSearchedBooks] = useState([])
  const [searchPage, setSearchPage] = useState(1);
  useEffect(() => {
    if (searchTerm === "") {
      setSearchedBooks([])
      return;
    }
    if (searchTerm !== null && searchTerm !== "") {
      setSearchPage(1);
      let re = new RegExp(searchTerm, "i")
      let data = allBooks.filter((item) => {
        return (item.title.toLowerCase() === searchTerm.toLowerCase() || item.title.toLowerCase().substr(0, 4) === searchTerm.toLowerCase().substr(0, 4) || item.categories.includes(searchTerm) || item?.longDescription?.match(re)?.length > 0)
      })
      setSearchedBooks(data)
    }
  }, [searchTerm, allBooks])
  return (
    <BookContext.Provider value={{ featured, categories, setCatalogueGenre, catalogueGenreData, setPages, setYear, year, pages, currentPage, setCurrentPage, singleBook, setBookTitle, setCheckPage, searchTerm, setSearchTerm, searchedBooks, searchPage, setSearchPage }}>
      {children}
    </BookContext.Provider>
  )
}
export { BookContextProvider, BookContext };