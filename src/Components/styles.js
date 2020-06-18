const drawerWidth = "51vw";
const drawerOpenWidth = "10vw";

const styles = theme => ({
  centerAlign: {
    display: "flex",
    justifyContent: "center"
  },
  container: {
    height: "100vh",
    width: "100vw"
  },
  closeButton: {
    float: "right"
  },
  bookList: {
    height: "100%",
    overflowY: "overlay",
    width: "100%"
  },
  details: {
    width: "50vw",
    marginLeft: "1vw",
    height: "100%"
  },
  titleText: {
    paddingTop: "5vh",
    textAlign: "center"
  },
  flex: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "75%",
    marginTop: "5vh"
  },
  hideDetails: {
    display: "none"
  },
  drawer: {
    position: "relative",
    width: drawerWidth,
    flexShrink: 0,
    height: "100%"
  },
  drawerOpen: {
    width: drawerOpenWidth
  },
  drawerClose: {
    width: drawerWidth
  },
  scrollBar: {
    "&::-webkit-scrollbar": {
      height: "0.4em",
      width: "0.4em"
    },
    "&::-webkit-scrollbar-track": {
      boxShadow: "none !important",
      webkitBoxShadow: "none !important",
      backgroundColor: "transparent"
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#e5e5e5",
      borderRadius: 50
    }
  },
  listItem: {
    maxWidth: "52%"
  }
});

export default styles;
