export default API_CALL = async (url) => {
  const response = await fetch(url);
  const json = await response.json();

  return json;
};
