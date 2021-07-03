interface ILocation extends Location {
  pathname: string,
  index: number,
}

interface IBlog {
  loading: boolean,
  loaded: boolean,
  posts: IPost[]
}

interface IPost {
  _id: string,
  title: string,
  tags: string,
  category: number,
  backgroundURL: string,
  content: string,
  username: string,
  userIcon: string,
  createdAt: string,
  updatedAt: string,
  __v: number
}

interface IUser {
  _id?: string;
  email?: string;
  username?: string;
  iconURL?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

interface IUserStore {
  loggedIn: boolean,
  user: IUser
}

interface ICombinedStore {
  blog: IBlog,
  user: IUserStore,
}

interface ISkip {
  dateBefore: string,
}

export type {
  ILocation,
  IPost,
  IBlog,
  IUserStore,
  IUser,
  ICombinedStore,
  ISkip,
};
