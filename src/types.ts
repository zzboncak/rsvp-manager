export enum RSVP_Options {
  WILL_ATTEND = "Will attend",
  DECLINE = "Regetfully decline",
  NO_RESPONSE = "Not yet responded"
}

export enum Age {
  ADULT = "Adult",
  CHILD = "Child"
}

export type Invite = {
  id: number;
  family_name: string;
  head_of_house: string;
  keyword: string;
  dietary_restrictions?: string | null;
  favorite_song?: string | null;
};

export type InviteRequest = Omit<Invite, "id">;

export type InviteUpdateRequest = Partial<InviteRequest> & {
  reset_diet?: boolean;
  reset_song?: boolean;
};

export type Person = {
  id: number;
  family_id: number;
  last_name: string;
  first_name: string;
  rsvp: RSVP_Options;
  person_age: Age;
  allowed_extra?: boolean;
  extra_confirmed?: RSVP_Options;
};

export type PersonRequest = Omit<Person, "id">;

export type PersonUpdateRequest = Partial<PersonRequest>;
