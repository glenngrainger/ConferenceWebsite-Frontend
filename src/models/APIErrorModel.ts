export default interface APIErrorModel {
  errorMessage: string;
  errors: Errors;
}

export interface Errors {
  [key: string]: string[];
}
