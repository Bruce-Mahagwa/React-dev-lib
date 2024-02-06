// files
import './App.css'
import Layout from "./Pages/Layout/Layout"
import {BookContextProvider} from "./Context";
import CataloguePage from "./Pages/Catalogue/CataloguePage";
import SingleBookPage from "./Pages/SingleBook/SingleBookPage";
import AboutPage from "./Pages/About/AboutPage"
import HomePage from "./Pages/HomePage/HomePage";
// depend
import {Route, Routes} from "react-router-dom";
export default function App() {
  return (
    <BookContextProvider>
      <Routes>
        <Route path = "/" element = {<Layout />}>
          <Route path = "/" element = {<HomePage />}></Route>
          <Route path = "/catalogue" element = {<CataloguePage />}></Route>
          <Route path = "/:id" element = {<SingleBookPage />}></Route>
          <Route path = "/catalogue/:id" element = {<SingleBookPage />}></Route>
          <Route path = "/search/:id" element = {<SingleBookPage />}></Route>
          <Route path = "/about" element = {<AboutPage />}></Route>
        </Route>
      </Routes>
    </BookContextProvider>
  )
}
