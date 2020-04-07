function get(key, fallbackValue) {
  try {
    return JSON.parse(localStorage.getItem(key)) || fallbackValue;
  } catch (error) {
    console.error(error);
    return fallbackValue;
  }
}

function set(key, value) {
  try {
    return localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(error);
  }
}

export default {
  get,
  set,
};
