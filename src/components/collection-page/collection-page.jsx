import { useEffect, useState } from "react";
import classes from "./collection-page.module.css";

import { v4 } from "uuid";

import NftCard from "../nft-card/nft-card";

import useAccount from "../../store/account.store";
import { Container, Spinner } from "react-bootstrap";

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

// TODO: replace dummy data with backend stuff
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
  const { account, accountId } = useAccount();

  const [loading, setLoading] = useState(true);
  const [nftCards, setNftCards] = useState(collectionItems); // TODO: replace with empty inital array (when adding API calls)

  useEffect(() => {
    // TODO: call API and get list of NFTs for user (run setNftCards once you're done with the fetching, followed by setLoading(false))

    // set loading to false after done (either wrap in async await, or do then chaining)
    setLoading(false);
  }, []);

  const onMintNft = async (nftId) => {
    // TODO: call API/invoke SC to mint the NFT (account object and accountId are already available above)
    console.log({ account, accountId, nftId });

    // TODO: @lanxion to add state logic after API calls are done
  };
  const onStakeNft = async (nftId) => {
    // TODO: call API/invoke SC to stake the NFT (account object and accountId are already available above)
    console.log({ account, accountId, nftId });

    // TODO: @lanxion to add state logic after API calls are done
  };

  // wait for async fetching to finish
  if (loading)
    return (
      <Container>
        <Spinner />
      </Container>
    );

  return (
    <div className={classes.collectionContainer}>
      <div className={classes.collectionContent}>
        <div className={classes.cardGrid}>
          {nftCards.map((nft, idx) => (
            <NftCard
              key={nft.id}
              {...nft}
              bgNum={idx}
              onMint={onMintNft}
              onStake={onStakeNft}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CollectionPage;
