import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { CDN_URL } from "../utils/constants";
import MenuShimmer from "./MenuShimmer";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const resInfo = useRestaurantMenu(resId);
  const [showIndex, setShowIndex] = useState(null);

  if (resInfo === null) return <MenuShimmer />;
  const { name, cuisines, costForTwoMessage,cloudinaryImageId, areaName, locality, avgRating } = resInfo.cards[0].card.card.info;
  const { deliveryTime } = resInfo?.cards[0]?.card?.card?.info?.sla;
  const categories =
    resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) =>
        c.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );
  const toggleShowIndex = (index) => {
    if (showIndex === index) {
      setShowIndex(null);
    } else {
      setShowIndex(index);
    }
  };
  return (
    <div>
    <div className="flex mx-auto w-6/12">
      <img
        className="py-4 rounded-lg w-60 h-40"
        src={CDN_URL + cloudinaryImageId}
        alt="restaurant-logo"
      />
      <div>
        <div>
          <h1 className="pt-4 pl-2 font-bold text-3xl">{name}</h1>
          <div className="pl-2 mt-1">
            <p>{cuisines.join(",")}</p>
          </div>
          <div className="pl-2">
            <p>{`${areaName},${locality}`}</p>
          </div>
          <div className="h-6/12 flex mt-3 pl-2">
            <div className="w-2/12 flex text-lg font-bold">
              <span>{avgRating}</span>
              <span className="pl-1 mt-1">{<FaStar />}</span>
            </div>
            <span> &emsp;| </span>{" "}
            
            <div className="pl-2 w-9/12">{costForTwoMessage}</div>
          </div>
        </div>
      </div>
    </div>


      {categories.map((category, index) => (
        <RestaurantCategory
          key={category?.card?.card.title}
          data={category?.card?.card}
          showItems={index === showIndex ? true : false}
          setShowIndex={() => toggleShowIndex(index)}
        />
      ))}
    </div>
  );
};
export default RestaurantMenu;
