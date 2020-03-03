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
    id: number;
    name: string;
    avatar: string;
  }

  export interface PrivateInfo extends PublicInfo {
    email: string;
  }
  
}

export default UserModel;
