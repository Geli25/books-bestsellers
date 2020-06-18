import React, { Fragment, useState, useEffect } from "react";
import clsx from "clsx";
import StarRating from "react-star-ratings";

import { Cancel } from "@material-ui/icons";

import { Box, Button, IconButton, Typography } from "@material-ui/core";

import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";

import ReviewForm from "./ReviewForm";
import BookReviews from "./BookReviews";

const BookDetails = ({
  classes,
  closeDetails,
  onAddSubmit,
  onDelete,
  onEditSubmit,
  book,
  username
}) => {
  const [reviewMode, setReviewMode] = useState(false);

  useEffect(() => {
    if (reviewMode) {
      setReviewMode(false);
    }
  }, [book.asin]);

  const hasInitialValues =
    book && book.product_reviews.some(review => review.isMe)
      ? book.product_reviews.find(review => review.isMe)
      : false;

  const formatBookDetails = () => {
    let hasType = true;
    let bookTypeIndex =
      book.name.indexOf(" Paperback ") === -1
        ? book.name.indexOf(" Hardcover ")
        : book.name.indexOf(" Paperback ");
    if (bookTypeIndex === -1) {
      hasType = false;
      bookTypeIndex = book.name.indexOf(" – ");
      if (bookTypeIndex === -1) {
        return book.name;
      }
    }
    const bookName = book.name.substring(0, bookTypeIndex);
    const bookDescr = !hasType
      ? book.name.substring(bookTypeIndex + 3)
      : book.name.substring(bookTypeIndex);

    return (
      <Box ml={3} mt={2}>
        <Typography variant="h6">
          <b>{bookName}</b>
        </Typography>
        <Box mt={1} mb={1}>
          <StarRating
            numberOfStars={5}
            rating={Number(book.rating) || 5}
            starRatedColor="#CC444B"
            starDimension="20"
            starSpacing="1px"
          />
          <Typography display="inline">
            <b>- {book.rating || "5.0"}</b> ({book.review_count || 0} reviews)
          </Typography>
        </Box>
        <Typography variant="body2">
          <i>{book.product_information.Publisher}</i>
        </Typography>
        <Typography variant="subtitle1">
          <b>{bookDescr}</b>
        </Typography>
        <Box mt={2}>
          <b>Description: </b>
          {book.full_description.substring(
            0,
            book.full_description.indexOf(".") + 1
          )}
        </Box>
      </Box>
    );
  };
  return (
    <Fragment>
      <Box p={2} className={clsx(classes.bookList, classes.scrollBar)}>
        <Box className={classes.closeButton}>
          <IconButton color="primary" onClick={closeDetails}>
            <Cancel />
          </IconButton>
        </Box>
        {book && (
          <Box p={2}>
            <Box className={classes.centerAlign}>
              <Box alignSelf="top" mt={2}>
                <img src={book.image_urls[0]} width={150} />
              </Box>
              {formatBookDetails()}
            </Box>
            <Box mt={3}>
              <Typography variant="h5">
                <b>Reviews</b>
              </Typography>
              {hasInitialValues && reviewMode !== "edit" && (
                <Box className={classes.centerAlign} mt={2}>
                  <Typography>
                    You have already submitted a review for this book.
                  </Typography>
                </Box>
              )}
              {!reviewMode && (
                <Box className={classes.centerAlign} mt={2} mb={4}>
                  <Button
                    color="secondary"
                    onClick={() =>
                      hasInitialValues
                        ? setReviewMode("edit")
                        : setReviewMode("add")
                    }
                    variant="contained"
                  >
                    <b>{hasInitialValues ? "Edit" : "Add"} your review</b>
                  </Button>
                </Box>
              )}
              {reviewMode && (
                <ReviewForm
                  asin={book.asin}
                  hasInitialValues={hasInitialValues}
                  onCancel={() => setReviewMode(false)}
                  onAddSubmit={onAddSubmit}
                  onEditSubmit={onEditSubmit}
                  username={username}
                />
              )}
              {reviewMode === "edit"
                ? book.product_reviews
                    .filter(review => !review.isMe)
                    .map(review => (
                      <BookReviews
                        key={review.author_name}
                        review={review}
                        username={username}
                      />
                    ))
                : book.product_reviews.map(review => (
                    <BookReviews
                      key={review.author_name}
                      onDelete={onDelete}
                      review={review}
                      reviewFor={book.asin}
                    />
                  ))}
            </Box>
          </Box>
        )}
      </Box>
    </Fragment>
  );
};

export default withStyles(styles)(BookDetails);
