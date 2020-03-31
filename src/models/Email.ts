namespace EmailModel {
  export interface BaseInfo {
    receiverMail: string;
    receiver: string;
  }

  export interface TeamInfo extends BaseInfo {
    teamId: string;
  }
}

export default EmailModel;
