import { useRef } from 'react';
import classes from './SearchBook.module.css';

function SearchBook(props) {
  
  const titleRef = useRef('');

  function submitHandler(event) {
    event.preventDefault();
    const title = titleRef.current.value;
    props.onSearch(title);
  }

  return (
    <div className={classes.control}>
      <form className={classes.inputContainer} onSubmit={submitHandler}>
        <input
          type='text'
          id='title'
          placeholder='Search Book'
          ref={titleRef}
        />
        <button>Search</button>
      </form>
    </div>
  );
}

export default SearchBook;