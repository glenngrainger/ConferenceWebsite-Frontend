export default interface APIErrorModel {
  errorMessage: "";
  errors: Errors;
}

export interface Errors {
  [key: string]: string[];
}
