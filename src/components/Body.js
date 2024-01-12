import RestaurantCard from "./RestaurantCard";
import { useState, useEffect, useContext } from "react";
import resList from "../utils/mockData2";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";

const Body = () => {
  const [listOfRestaurants, setListOfRestaurant] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [searchText, setSearchText] = useState("");
  const {loggedInUser, setUserName} = useContext(UserContext);
  // console.log(listOfRestaurants);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setListOfRestaurant(
      resList?.data.cards[2].card.card.gridElements.infoWithStyle.restaurants
    );

    setFilteredRestaurant(
      resList?.data.cards[2].card.card.gridElements.infoWithStyle.restaurants
    );
  };
  const onlineStatus = useOnlineStatus();

  if (onlineStatus === false) {
    return <h1>Please Check your Internet Connection</h1>;
  }

  return listOfRestaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter flex justify-center">
        <div className="search m-4 p-4">
          <input
            type="text"
            className="border border-solid border-black"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button
            className="px-4 py-2 bg-green-100 m-4 rounded-lg"
            onClick={() => {
              const filteredRestaurant = listOfRestaurants.filter((res) =>
                res.info.name.toLowerCase().includes(searchText.toLowerCase())
              );
              setFilteredRestaurant(filteredRestaurant);
            }}
          >
            Search
          </button>
        </div>
        <div className="search m-4 p-4 flex items-center">
          <button
            className="px-4 py-2 bg-gray-100 rounded-lg"
            onClick={() => {
              const filteredRestaurant = listOfRestaurants.filter(
                (res) => res.info.avgRating > 4.2
              );
              setFilteredRestaurant(filteredRestaurant);
            }}
          >
            Top Rated Restaurants
          </button>
        </div>
        <div className="search m-4 p-4 flex items-center">
          <label>UserName: </label>
          <input className="border border-black p-2"
            value={loggedInUser}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-wrap justify-center">
        {filteredRestaurant.map((restaurant) => (
          // <RestaurantCard key={restaurant.info.id} resData={restaurant} />
          <Link
            key={restaurant.info.id}
            to={"/restaurants/" + restaurant.info.id}
          >
            <RestaurantCard resData={restaurant} />
          </Link>
        ))}
      </div>
    </div>
  );
};
export default Body;
