export {};

declare global {
  namespace Express {
    interface User {
      email: string;
      username: string;
      profileImage: string;
    }
  }
}
