export class User {
    constructor(
      public username: string,
      public first_name: string,
      public last_name: string,
      public email: string,
      public token: string,
      public refresh_token: string
    ) {
      this.username = username;
      this.first_name = first_name;
      this.last_name = last_name;
      this.email = email;
      this.token = token;
      this.refresh_token = refresh_token;
    }
  }