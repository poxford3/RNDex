const capitalizeString = (str) => {
  if (str != null) {
    str = str
      .replace("-", " ")
      .toLowerCase()
      .split(" ")
      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
      .join(" ");
    return str;
  } else {
    return null;
  }
};

export default capitalizeString;
