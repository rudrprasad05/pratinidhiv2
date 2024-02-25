import { VerifyEmail } from "@/actions/user";
import { verify } from "crypto";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function VerifyEmailForm({ token }: { token: string }) {
  const template = (title: string, description: string) => {
    return (
      <div className="max-w-lg mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>{title}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>{description}</CardDescription>
          </CardContent>
        </Card>
      </div>
    );
  };
  let final = template("Error", "Contact site admin");
  if (!token) {
    return (final = template(
      "No token",
      "PLease check if the correct link was selected"
    ));
  }
  const res = await VerifyEmail(token).then((resposnse) => {
    if (resposnse == null) {
      return (final = template(
        "Invalid Token",
        "PLease check if the correct link was selected"
      ));
    } else if (resposnse) {
      return (final = template("Email has been verified", "Thank you"));
    }
  });

  return final;
}
