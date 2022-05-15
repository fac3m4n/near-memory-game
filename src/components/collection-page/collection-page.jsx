import classes from "./collection-page.module.css";

const CollectionPage = () => {
  return (
    <div className={classes.collectionContainer}>
      <div className={classes.collectionContent}>
        <div className={classes.cardGrid}></div>
      </div>
    </div>
  );
};

export default CollectionPage;
