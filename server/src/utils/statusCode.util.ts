class HTTPStatusCodes {
  static success = {
    OK: 200,
    CREATED: 201,
  };

  static clientError = {
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
  };

  static serverError = {
    INTERNAL_SERVER_ERROR: 500,
  };
}

export default HTTPStatusCodes;
