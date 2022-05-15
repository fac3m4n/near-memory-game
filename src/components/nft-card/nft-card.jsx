import classes from "./nft-card.module.css";

const NftCard = ({
  id,
  owner_id,
  rarity,
  price,
  image,
  status,
  pointsAwarded,
  bgNum = 0,
}) => {
  bgNum = bgNum % 12; // if more than 12 items are added, ensure that there is a valid bg for it

  return <div className={`${classes.nftCard} ${classes[`bg${bgNum}`]}`}></div>;
};

export default NftCard;
