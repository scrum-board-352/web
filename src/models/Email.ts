namespace EmailModel {
  export interface BaseInfo {
    receiverMail: string;
    announcer: string;
  }

  export interface TeamInfo extends BaseInfo {
    teamId: string;
  }
}

export default EmailModel;
