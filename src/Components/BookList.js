import React from "react";
import clsx from "clsx";

import { withStyles } from "@material-ui/core/styles";
import { List } from "@material-ui/core";
import BookItem from "./BookItem";
import styles from "./styles";

const BookList = ({ books, classes, toggleDetails, detailsOpen }) => {
  return (
    <List className={clsx(classes.bookList, classes.scrollBar)}>
      {books.map(book => (
        <BookItem
          book={book}
          detailsOpen={detailsOpen}
          key={book.asin}
          toggleDetails={toggleDetails}
        />
      ))}
    </List>
  );
};

export default withStyles(styles)(BookList);
