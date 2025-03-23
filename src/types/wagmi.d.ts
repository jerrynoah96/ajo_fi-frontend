declare module '@wagmi/core' {
  export class UserRejectedRequestError extends Error {
    constructor(message: string) {
      super(message);
      this.name = 'UserRejectedRequestError';
    }
  }
} 