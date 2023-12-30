import { useState } from "react";
import "./App.css";
import SearchBook from "./components/SearchBook";
import BooksList from "./components/BooksList";

function App() {
  
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchBooksHandler = async (searchedBook) => {

    // if the user submits an empty string
    if (searchedBook.trim().length === 0) {
      setError("No input! Please enter a valid book title");
      return;
    }

    setIsLoading(true);
    setError(null);

    // Timeout after 10 seconds
    const timeoutDuration = 10000;
    let timeoutId;

    const timeoutPromise = new Promise((_, reject) => {
      timeoutId = setTimeout(() => {
        reject(new Error(`The HTTP request took too long, more than ${timeoutDuration / 1000} seconds. Please try again.`));
      }, timeoutDuration);
    });
    
    // Defining the number of books displayed
    const maxResults = 20;

    try {
      
      const response = await Promise.race([
        fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${searchedBook}&maxResults=${maxResults}&key=AIzaSyC0YAhuKK1SG0NF1Wtxw7tGFxp5iS6hKFA`),
        timeoutPromise,
      ]);

      // if the API returns an error
      if (!response.ok) {
        throw new Error("Something went wrong! The API is returning an error.");
      }

      const data = await response.json();

      // if the API returns 0 results
      if (!data.items || data.items.length === 0) {
        setBooks([]);
        setError("No books found.");
      } else {
        const transformedBooks = data.items.map((bookData) => {
          const volumeInfo = bookData.volumeInfo || {};
          const imageLinks = volumeInfo.imageLinks || {};

          return {
            id: bookData.id,
            title: volumeInfo.title || "No title found",
            authors: volumeInfo.authors || "No authors found",
            publisher: volumeInfo.publisher || "No publisher found",
            image: imageLinks.thumbnail || "No image found",
            info: volumeInfo.canonicalVolumeLink || "No info found",
          };
        });

        setBooks(transformedBooks);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      clearTimeout(timeoutId); // Clear the timeout when the API request is complete
    }

    setIsLoading(false);
  };

  let content = <p></p>;

  if (books.length > 0) {
    content = <BooksList books={books} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p className="loading">Loading...</p>;
  }

  return (
    <>
      <h1>BOOK FINDER</h1>
      <section>
        <SearchBook onSearch={searchBooksHandler} />
      </section>
      <section>{content}</section>
    </>
  );
}

export default App;
