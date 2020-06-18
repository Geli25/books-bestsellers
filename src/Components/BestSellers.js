import React, { useState } from "react";
import clsx from "clsx";
import moment from "moment";
import { Box, Paper, Grow, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import styles from "./styles";

import BookList from "./BookList";
import BookDetails from "./BookDetails";

const booksJSON = require("../data/ProductData.json");

const BestSellers = ({ classes }) => {
  const [detailsOpen, setDetails] = useState(false);
  const [books, setBooks] = useState(booksJSON.slice(0, 10));
  const [username, setUsername] = useState("");

  const addReview = (asin, reviewDetails) => {
    let newBooks = [...books];
    const index = books.findIndex(book => book.asin === asin);
    const reviewCount = Number(books[index].review_count) + 1;
    const reviewData = {
      ...reviewDetails,
      reviewed_date: moment().format("LL")
    };
    newBooks.splice(index, 1, {
      ...books[index],
      product_reviews: [
        reviewData,
        ...(books[index].product_reviews ? books[index].product_reviews : {})
      ],
      review_count: reviewCount.toString()
    });
    setBooks(newBooks);
    if (!username) {
      setUsername(reviewDetails.author_name);
    }
  };

  const deleteReview = asin => {
    const index = books.findIndex(book => book.asin === asin);
    const reviewIndex = books[index].product_reviews.findIndex(
      review => review.isMe
    );
    let newBooks = [...books];
    let newReviews = [
      ...(books[index].product_reviews ? books[index].product_reviews : {})
    ];
    newReviews.splice(reviewIndex, 1);
    newBooks.splice(index, 1, {
      ...books[index],
      product_reviews: newReviews
    });
    setBooks(newBooks);
  };

  const replaceReview = (asin, reviewDetails) => {
    const index = books.findIndex(book => book.asin === asin);
    const reviewIndex = books[index].product_reviews.findIndex(
      review => review.isMe
    );
    let newBooks = [...books];
    let newReviews = [
      ...(books[index].product_reviews ? books[index].product_reviews : {})
    ];
    const reviewData = {
      ...reviewDetails,
      reviewed_date: moment().format("LL") + " (Edited)"
    };
    newReviews.splice(reviewIndex, 1, reviewData);
    newBooks.splice(index, 1, {
      ...books[index],
      product_reviews: newReviews
    });
    setBooks(newBooks);
  };

  return (
    <Box className={classes.container}>
      <Box className={classes.titleText}>
        <Typography variant="h4">Amazon's Best Selling Books</Typography>
      </Box>
      <Box className={classes.flex}>
        <Grow in style={{ transformOrigin: "0 0 0" }} timeout={600}>
          <Paper
            className={clsx(classes.drawer, {
              [classes.drawerOpen]: detailsOpen,
              [classes.drawerClose]: !detailsOpen
            })}
            elevation={5}
          >
            <BookList
              books={books}
              detailsOpen={detailsOpen}
              toggleDetails={setDetails}
            />
          </Paper>
        </Grow>
        <Grow
          in={!!detailsOpen}
          style={{ transformOrigin: "0 0 0" }}
          {...(detailsOpen ? { timeout: 600 } : {})}
        >
          <Paper
            className={clsx(
              detailsOpen ? classes.details : classes.hideDetails
            )}
            elevation={5}
          >
            <BookDetails
              book={
                detailsOpen && books.find(book => book.asin === detailsOpen)
              }
              closeDetails={() => setDetails(false)}
              onDelete={deleteReview}
              onAddSubmit={addReview}
              onEditSubmit={replaceReview}
              username={username}
            />
          </Paper>
        </Grow>
      </Box>
    </Box>
  );
};

export default withStyles(styles)(BestSellers);
