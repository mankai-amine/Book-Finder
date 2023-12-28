import "./App.css";
import SearchBook from "./components/SearchBook";
import BooksList from "./components/BooksList";

function App() {
  
  function searchBooksHandler (title) {
    console.log(title)
  }

  const books = [{
    id: 'id',
    title: "title",
    authors: ["author 1", "author 2"],
    publisher: "publisher",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Google_Images_2015_logo.svg/1200px-Google_Images_2015_logo.svg.png",
    info: "info",
  }];

  return (
    <>
      <section>
        <SearchBook onSearch={searchBooksHandler} />
      </section>
      <section>
        <BooksList books={books} />
      </section>
    </>
  );
}

export default App;
