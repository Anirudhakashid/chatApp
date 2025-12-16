//* async handler to wrap the controllers and catch errors this avoids try catch blocks in each controller

const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => {
      next(err);
    });
  };
};

export { asyncHandler };
