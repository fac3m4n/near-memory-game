import classes from "./collection-page.module.css";

import { v4 } from "uuid";
import NftCard from "../nft-card/nft-card";

/*
  export type NftModel = {
    id: string;
    owner_id: string;
    rarity: "common" | "uncommon" | "rare" | "mythical" | "epic";
    price: number;
    image: string;
    status: "mintable" | "stakable" | "staked";
    pointsAwarded: number;
}
*/

const collectionItems = [
  {
    id: v4(),
    owner_id: "test",
    rarity: "common",
    price: 200,
    image: "/img/nft/bear.png",
    status: "mintable",
    pointsAwarded: 0,
  },
  {
    id: v4(),
    owner_id: "test",
    rarity: "uncommon",
    price: 300,
    image: "/img/nft/cat.png",
    status: "mintable",
    pointsAwarded: 0,
  },
  {
    id: v4(),
    owner_id: "test",
    rarity: "rare",
    price: 400,
    image: "/img/nft/chicken.png",
    status: "stakable",
    pointsAwarded: 0,
  },
  {
    id: v4(),
    owner_id: "test",
    rarity: "common",
    price: 200,
    image: "/img/nft/cow.png",
    status: "mintable",
    pointsAwarded: 0,
  },
  {
    id: v4(),
    owner_id: "test",
    rarity: "common",
    price: 220,
    image: "/img/nft/crocodile.png",
    status: "staked",
    pointsAwarded: 250,
  },
  {
    id: v4(),
    owner_id: "test",
    rarity: "legendary",
    price: 500,
    image: "/img/nft/deer.png",
    status: "stakable",
    pointsAwarded: 0,
  },
  {
    id: v4(),
    owner_id: "test",
    rarity: "uncommon",
    price: 250,
    image: "/img/nft/dog-2.png",
    status: "stakes",
    pointsAwarded: 200,
  },
  {
    id: v4(),
    owner_id: "test",
    rarity: "mythical",
    price: 500,
    image: "/img/nft/dog.png",
    status: "mintable",
    pointsAwarded: 0,
  },
  {
    id: v4(),
    owner_id: "test",
    rarity: "rare",
    price: 350,
    image: "/img/nft/elephant.png",
    status: "stakable",
    pointsAwarded: 0,
  },
  {
    id: v4(),
    owner_id: "test",
    rarity: "common",
    price: 200,
    image: "/img/nft/fox.png",
    status: "mintable",
    pointsAwarded: 0,
  },
  {
    id: v4(),
    owner_id: "test",
    rarity: "uncommon",
    price: 300,
    image: "/img/nft/koala.png",
    status: "staked",
    pointsAwarded: 180,
  },
  {
    id: v4(),
    owner_id: "test",
    rarity: "common",
    price: 150,
    image: "/img/nft/tiger.png",
    status: "mintable",
    pointsAwarded: 0,
  },
];

const CollectionPage = () => {
  return (
    <div className={classes.collectionContainer}>
      <div className={classes.collectionContent}>
        <div className={classes.cardGrid}>
          {collectionItems.map((nft, idx) => (
            <NftCard key={nft.id} {...nft} bgNum={idx} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CollectionPage;
