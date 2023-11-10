export default API_CALL = async (url) => {
  try {
    const response = await fetch(url);
    const status = response.status;
    const json = await response.json();

    return json;
  } catch (err) {
    console.log("issue", err);
  }
};
