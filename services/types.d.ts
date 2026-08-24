declare global {
  namespace Sofiamatics {
    interface Request<T = unknown, U = unknown, V = unknown> {
      params?: T;
      query?: U;
      body?: V;
    }

    interface Response<T = unknown> {
      message: string;
      statusCode: number;
      data: T;
    }
  }
}

export {};
