namespace DBC {
  interface Data {
    locale: string;
  }

  interface IProject {
    id: string;
    path: string;
    name: string;
    description?: string;
    createdAt?: number;
    updatedAt?: number;
  }
}
