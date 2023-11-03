const capitalizeString = (str) => {
  if (str != null) {
    if (typeof str == "string") {
      str = str
        .replaceAll("-", " ")
        .toLowerCase()
        .split(" ")
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(" ");
      return str;
    } else {
      return str;
    }
  } else {
    return null;
  }
};

export const capitalizeGens = (str) => {
  if (str != null) {
    str = str.replace("-", " ").toLowerCase().split(" ");

    let new_str = [];
    new_str[0] = str[0].charAt(0).toUpperCase() + str[0].substring(1);
    new_str[1] = str[1].toUpperCase();
    new_str = new_str.join(" ");

    return new_str;
  } else {
    return null;
  }
};

export default capitalizeString;
