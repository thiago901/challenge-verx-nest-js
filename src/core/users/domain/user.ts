import { Entity } from '@shared/entities/entity';

export interface UserProps {
  name: string;
  email: string;
  password: string;
  active: boolean;
}

export class User extends Entity<UserProps> {
  constructor(props: UserProps, id?: string) {
    super(props, id);
  }

  public get id() {
    return this._id;
  }
  public get name() {
    return this.props.name;
  }
  public set name(name: string) {
    this.props.name = name;
  }
  public get password() {
    return this.props.password;
  }
  public set password(password: string) {
    this.props.password = password;
  }
  public get email() {
    return this.props.email;
  }
  public set email(email: string) {
    this.props.email = email;
  }
  public get active() {
    return this.props.active;
  }
  public set active(active: boolean) {
    this.props.active = active;
  }
}
