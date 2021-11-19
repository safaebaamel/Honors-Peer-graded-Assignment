export class Feedback {
  firstname: string | undefined;
  lastname: string | undefined;
  telnum: number | undefined;
  email: string | undefined;
  agree: boolean | undefined;
  contacttype: string | undefined;
  message: string | undefined;
}

export const ContactType = ['None', 'Tel', 'Email'];
