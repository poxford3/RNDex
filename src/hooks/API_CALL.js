async function API_CALL(url) {
  const errMsg = { rndex_error: `api call failed` };
  try {
    // console.log('api try', url);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000); // 8s timeout
    const response = await fetch(url, { signal: controller.signal });
    // console.log('resp', response);
    // console.log('resp ok', response.ok);
    clearTimeout(timeout);

    if (!response.ok) {
      throw new Error (`Response error: ${response.status}`);
    }

    const json = await response.json();
    return json
  } catch (err) {
    console.log('api catch');
    console.error("issue", err.name === 'AbortError' ? 'Fetch timed out' : err);
    return errMsg
  } 
};

export default API_CALL;

// test endpoint: const url = "https://fake-json-api.mock.beeceptor.com/users"