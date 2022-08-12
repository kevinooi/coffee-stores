import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
});

const getUrlForCoffeeStore = (query, latlong, limit) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latlong}&limit=${limit}`;
};

const getListOfCoffeeStorePhotos = async () => {
  const photos = await unsplash.search.getPhotos({
    query: "coffee shop",
    page: 1,
    perPage: 30,
  });
  const unsplashResults = photos.response.results.map(
    (result) => result.urls["small"]
  );
  return unsplashResults;
};

export const fetchCoffeeStores = async (
  latLong = "6.475702029010933%2C100.55613146212643",
  limit = 9
) => {
  const photos = await getListOfCoffeeStorePhotos();
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
    },
  };

  const response = await fetch(
    getUrlForCoffeeStore("cafe", latLong, limit),
    options
  );
  const data = await response.json();
  return data.results.map((result, i) => {
    const neighborhood = result.location.neighborhood;
    return {
      id: result.fsq_id,
      name: result.name,
      address: result.location.address ?? "",
      neighbourhood:
        neighborhood && neighborhood.length > 0 ? neighborhood[0] : "",
      imgUrl: photos && photos.length > 0 ? photos[i] : null,
    };
  });
};
