const data = {
  restaurants: [],
};

// Get all restaurants
exports.getAllRestaurants = (req, res) => {
  res.status(200).json({
    status: "success",
    data,
  });
};

// Get restaurant based on id
exports.getRestaurantById = (req, res) => {
  const { restaurantId } = req.params;
  const restaurant = data.restaurants.find((restaurant) => {
    return restaurant._id === +restaurantId;
  });

  res.status(200).json({
    status: "success",
    data: restaurant,
  });
};

// Add restaurant
exports.addRestaurant = (req, res) => {
  const { body } = req;
  body._id = data.restaurants.length + 1;
  data.restaurants.push(body);
  res.status(201).json({
    status: "success",
    data,
  });
};

// Update restaurant based on id
exports.updateRestaurant = (req, res) => {
  const { restaurantId } = req.params;
  data.restaurants.map((restaurant) => {
    if (restaurant._id === +restaurantId) {
      restaurant.name = req.body.name;
    }
  });
  res.status(200).json({
    status: "success",
    data,
  });
};

// Delete restaurant based on id
exports.deleteRestaurant = (req, res) => {
  const { restaurantId } = req.params;
  const newRestaurants = data.restaurants.filter(
    (restaurant) => restaurant._id !== +restaurantId
  );
  data.restaurants = [...newRestaurants];

  res.status(200).json({
    status: "success",
    data,
  });
};
