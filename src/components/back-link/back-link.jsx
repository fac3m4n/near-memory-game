import { Link } from "react-router-dom";
import classes from "./back-link.module.css";

const BackLink = ({ top = "5%", left = "5%", fontSize = "1.5rem" }) => {
  return (
    <Link to="/" className={classes.backLink} style={{ top, left, fontSize }}>
      {"<"} Back
    </Link>
  );
};

export default BackLink;
