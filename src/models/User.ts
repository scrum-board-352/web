namespace UserModel {
  export interface LoginInfo {
    username: string;
    password: string;
  }

  export interface RegisterInfo {
    username: string;
    email: string;
    password: string;
  }

  export interface PublicInfo {
    id: string;
    name: string;
    avatar: string;
  }

  export interface PrivateInfo extends PublicInfo {
    email: string;
  }

  export interface UpdateInfo {
    username: string;
    password?: string;
    power?: string;
    avatar?: string;
  }
}

export default UserModel;
