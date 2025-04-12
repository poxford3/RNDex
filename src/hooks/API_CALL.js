const API_CALL = async (url) => {
  console.log('api call', url);
  const errMsg = { error: `api call failed: ${err}` };
  try {
    const response = await fetch(url);

    if (!response.ok) {
      console.log('status not ok')
      return errMsg;
    }

    const json = await response.json();
    return json;
  } catch (err) {
    console.log("issue", err);
    return errMsg;
  }
};

export default API_CALL;
