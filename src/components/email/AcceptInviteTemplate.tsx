import * as React from "react";

interface VerifyEmailEmailTemplateProps {
  email: string;
  inviteToken: string;
}

export const AcceptInviteTemplate: React.FC<
  Readonly<VerifyEmailEmailTemplateProps>
> = ({ email, inviteToken }) => (
  <div>
    <h1>You have been invited to join Shri Pratinidhi Sanatan Sabha of Fiji</h1>
    <p>To accept, click on this link:</p>
    <a href={`http://localhost:3000/auth/verify-email?token=${inviteToken}`}>
      Click here to verify your email
    </a>
  </div>
);
