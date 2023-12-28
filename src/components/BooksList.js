import Book from './Book';
import classes from './BooksList.module.css';

const BookList = (props) => {
  return (
    <ul className={classes['books-list']}>
      {props.books.map((book) => (
        <Book
          key={book.id}
          title={book.title}
          authors={book.authors}
          publisher={book.publisher}
          image={book.image}
          info= {book.info}
        />
      ))}
    </ul>
  );
};

export default BookList;
