export const errorHandler = (data, res, code = 400) => {
  res.status(code).json({
    hasError: true,
    errorMessage: data,
  });
};

export const responseHandler = (data, res, code = 200) => {
  res.status(code).json({
    hasError: false,
    body: data,
  });
};

export const validateAllFields = (fields) => {
  for (let key in fields) {
    if (fields[key] === "") {
      throw `${key} required`;
    }
  }
};
