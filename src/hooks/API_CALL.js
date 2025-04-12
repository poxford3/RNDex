async function API_CALL(url) {
  const errMsg = { rndex_error: `api call failed` };
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error (`Response error: ${response.status}`);
    }

    const json = await response.json();
    return json
  } catch (err) {
    console.error("issue", err);
    return errMsg
  } 
};

export default API_CALL;

// test endpoint: const url = "https://fake-json-api.mock.beeceptor.com/users"