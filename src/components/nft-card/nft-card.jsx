import classes from "./nft-card.module.css";

const NftCard = ({
  id,
  owner_id,
  rarity,
  price,
  image,
  status,
  pointsAwarded,
  onStake,
  onMint,
  bgNum = 0,
}) => {
  bgNum = bgNum % 12; // if more than 12 items are added, ensure that there is a valid bg for it

  const StakeButton = (
    <button
      className={`${classes.btn} ${classes.stake}`}
      onClick={() => onStake(id)}
    >
      Stake
    </button>
  );
  const MintButton = (
    <button
      className={`${classes.btn} ${classes.mint}`}
      onClick={() => onMint(id)}
    >
      Mint
    </button>
  );

  return (
    <div className={`${classes.nftCard} ${classes[`bg${bgNum}`]}`}>
      <img src={image} alt="nft" />
      {status === "mintable"
        ? MintButton
        : status === "stakable"
        ? StakeButton
        : /* will add points thing here */
          null}
    </div>
  );
};

export default NftCard;
