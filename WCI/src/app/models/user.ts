export class User {
    public username: string;
    public password: string;
    public site: string;

    constructor(username: string, password: string, site: string) {
        this.username = username;
        this.password = password;
        this.site = site;
    }
}