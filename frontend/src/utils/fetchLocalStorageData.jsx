export const fetchUser = () => {
  const userInfo =
    localStorage.getItem("user") !== "undefined"
      ?JSON.parse(localStorage.getItem("user"))
      : localStorage.clear();

  return userInfo;
};

export const fetchCart = () => {
  const cartInfo =
    localStorage.getItem("cartItems") !== "undefined"
      ? JSON.parse(localStorage.getItem("cartItems"))
      : localStorage.clear();

  return cartInfo ? cartInfo : [];
};


export const fetchCategory = () => {
  const catInfo =
    localStorage.getItem("foodCategory") !== "undefined"
      ? JSON.parse(localStorage.getItem("foodCategory"))
      : localStorage.clear();

  return catInfo ? catInfo : [];
};
export const fetchfruitCategory = () => {
  const fruitcatInfo =
    localStorage.getItem("foodfruitCategory") !== "undefined"
      ? JSON.parse(localStorage.getItem("foodfruitCategory"))
      : localStorage.clear();

  return fruitcatInfo ? fruitcatInfo : [];
};
