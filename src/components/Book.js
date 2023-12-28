import classes from './Book.module.css';

const Book = (props) => {

  return (
    <li className={classes.book}>
      <h2>{props.title}</h2>
      <h3>By: {props.authors}</h3>
      <h3>Published By: {props.publisher}</h3>
      <img src={props.image} alt={props.image}/>
      <div>
        <a href={props.info} target="_blank" rel="noopener noreferrer">
          <button>See this Book</button>
        </a>
      </div>
    </li>
  );
};

export default Book;
