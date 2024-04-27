const info = (...params) => {
  return console.log(...params);
};

const error = (...params) => {
  return console.error(...params);
};

export default { info, error };
