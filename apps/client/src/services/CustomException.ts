export default class CustomException {
  statusCode = 0;

  message = '';

  stack = '';

  constructor(error: any) {
    if (error instanceof CustomException) {
      this.statusCode = error.statusCode;
      this.message = error.message;
      this.stack = error.stack;
    } if (error instanceof Response) {
      this.statusCode = Number(error.status);
      this.message = error.statusText;
    } else if (error instanceof Error) {
      this.statusCode = 0;
      this.message = error.message;
      this.stack = error.stack || '';
    } else if (typeof error === 'string') {
      this.message = error;
      switch (error) {
        case 'Failed to fetch':
          this.statusCode = 500;
          break;
        default:
      }
    }
  }
}
