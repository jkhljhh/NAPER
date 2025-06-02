// Filename: page.tsx
// Path: @/app/(dashboard)/foundation/market/
"use client";

import { Suspense } from "react";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Form } from "./form";

const PageData = {
  title: "Market",
  description: "Market description",
};

export default function Page() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{PageData.title}</CardTitle>
        <CardDescription>{PageData.description}</CardDescription>
        <CardAction>
          <Form />
        </CardAction>
      </CardHeader>
      <CardContent>Data display</CardContent>
    </Card>
  );
}
