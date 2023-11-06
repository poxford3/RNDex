export default API_CALL = async (url) => {
  try {
    const response = await fetch(url);
    const status = response.status;
    const json = await response.json();
    // console.log(url.split("/")[5]);
    // console.log("json len", Object.keys(json).length, url.split("/")[5]);

    return json;
  } catch (err) {
    console.log("issue", err);
  }
};
