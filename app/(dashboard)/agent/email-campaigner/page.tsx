// Filename: page.tsx
// Path: @/app/(dashboard)/agent/email-campaigner/
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { ActionState } from "@/lib/action-helpers";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

import { type Schema } from "./shared";
import { AgentForm as Form } from "./form";
import { agentAction } from "./action";
import { Spinner } from "@/components/ui/spinner";

export default function Page() {
  const [state, action, pending] = useActionState<ActionState, Schema>(
    agentAction,
    { error: false, message: "", response: "" },
  );

  if (state?.error) {
    toast(state.message);
  }

  return (
    <Tabs defaultValue="input">
      <TabsList>
        <TabsTrigger value="input">Input</TabsTrigger>
        <TabsTrigger value="output">Output</TabsTrigger>
      </TabsList>
      <TabsContent value="input" className="w-[400px]">
        <Card>
          <CardContent>
            <Form action={action} pending={pending} />
            {state?.error && (
              <div className="text-destructive text-sm">{state.error}</div>
            )}
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="output">
        <Card>
          <CardContent>
            <div className="prose max-w-full">
              {state.success ? (
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {state.success}
                </ReactMarkdown>
              ) : pending ? (
                <Spinner />
              ) : (
                <CardTitle>Output will appear here...</CardTitle>
              )}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
