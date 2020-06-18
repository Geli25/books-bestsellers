import React, { Fragment } from "react";
import { ArrowForwardIos } from "@material-ui/icons";
import StarRating from "react-star-ratings";
import {
  Box,
  IconButton,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Typography
} from "@material-ui/core";

import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";

const BookItem = ({ book, classes, toggleDetails, detailsOpen }) => {
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
      <Box ml={4} className={classes.listItem}>
        <ListItemText>
          <b>{bookName}</b>
        </ListItemText>
        <StarRating
          numberOfStars={5}
          rating={Number(book.rating) || 5}
          starRatedColor="#CC444B"
          starDimension="15"
          starSpacing="1px"
        />
        <Typography display="inline">
          <b>- {book.rating || "5.0"}</b>
        </Typography>
        <Typography variant="body2">
          <i>{book.product_information.Publisher}</i>
        </Typography>
        <Typography variant="subtitle1">
          <b>{bookDescr}</b>
        </Typography>
      </Box>
    );
  };

  return (
    <ListItem
      button
      onClick={() => toggleDetails(book.asin)}
      selected={book.asin === detailsOpen}
      style={{ padding: detailsOpen ? 10 : 20, display: "flex" }}
    >
      {!detailsOpen && (
        <Box mr={detailsOpen ? 0 : 3} width={50}>
          <Typography variant="h4">
            <small>#</small>
            {book.rank}
          </Typography>
        </Box>
      )}
      <img src={book.image_urls[0]} width="100vw" />
      {!detailsOpen && (
        <Fragment>
          {formatBookDetails()}
          <ListItemSecondaryAction onClick={() => toggleDetails(book.asin)}>
            <IconButton>
              <ArrowForwardIos />
            </IconButton>
          </ListItemSecondaryAction>
        </Fragment>
      )}
    </ListItem>
  );
};

export default withStyles(styles)(BookItem);
