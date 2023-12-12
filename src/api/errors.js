/* eslint-disable max-classes-per-file */
import { HTTP_ERRORS } from "@/api/constants"

export class PublicError extends Error {}

export class HttpPublicError extends PublicError {}

export class HttpNotFoundError extends HttpPublicError {
  statusCode = HTTP_ERRORS.NOT_FOUND

  constructor(message = "Not found") {
    super(message)
  }
}

export class HttpForbiddenError extends HttpPublicError {
  statusCode = HTTP_ERRORS.FORBIDDEN

  constructor(message = "Forbidden") {
    super(message)
  }
}

export class HttpArgumentsError extends HttpPublicError {
  statusCode = HTTP_ERRORS.UNPROCESSABLE_ENTITY

  constructor(errors) {
    super(
      !errors
        ? "Invalid arguments."
        : `Invalid arguments:\n\t${errors.join("\n\t")}`.trim(),
    )
  }
}

export class HttpDuplicateError extends HttpPublicError {
  statusCode = HTTP_ERRORS.DUPLICATE

  constructor(resource) {
    super(!resource ? "Resource already exists" : `${resource} already exists`)
  }
}

export class HttpAuthenticationError extends HttpPublicError {
  statusCode = HTTP_ERRORS.UNAUTHORIZED

  constructor(message = "Invalid credentials") {
    super(message)
  }
}
