export interface User {
  euuid?: string;
  name?: string;
  active?: boolean;
  type?: string;
  password?: string;
  out_of_office?: boolean;
  user_profile?: UserProfile;
  roles?: Role[];
  modified_by?: ModifiedBy;
  modified_on?: Date;
}

interface ModifiedBy {
  name: string;
}

interface UserProfile {
  first_name?: string;
  last_name?: string;
  e_mail?: string;
  function?: string;
}

export interface Role {
  name?: string;
}
