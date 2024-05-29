export type INavLink = {
    route: string;
    label: string;
  };

  export type IPost = {
    id: string;
    userId: string;
    content: string;
    imageUrl: string;
    likes: string[];
    comments: string[];
    category: string;
    tags: string[];
    timestamp: string;
  };

  export type IUser = {
    id: string;
    username: string;
    email: string;
    password: string;
    profilePicture?: string;
    bio?: string;
    followers?: string[];
    following?: string[];
    isAdmin?: boolean;
    createdAt?: string;
    country?: string;
    githubLink?: string;
    tags?: string[];
    verified?: boolean;
    likedPosts?: string[];
  };