export class ResponseInfoError extends Error {
  constructor(err) {
    if (err && !(err.error instanceof ProgressEvent)) {
      super(err.error);
    } else {
      console.log(err);
      super('Server unavailable. Try again later.');
    }
  }
}
