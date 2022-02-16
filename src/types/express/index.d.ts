export {};

declare global {
  namespace Express {
    interface User {
      username: string;
      profileImage: string;
    }
  }
}
