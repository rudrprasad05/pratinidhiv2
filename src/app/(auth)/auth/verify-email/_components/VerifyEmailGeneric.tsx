import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

export default function VerifyEmailGeneric() {
  return (
    <div className="max-w-lg mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Account has been created</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>
            Verify your email. Go to your email and click on the link. <br />
            Dont see one? Check your spam
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
}
