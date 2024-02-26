"use client";

import { formatDistance } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

import { Form } from "react-hook-form";
import { Post } from "@prisma/client";
import { DeleteForm, GetForms } from "@/actions/form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Delete, Edit, MoveRight, View } from "lucide-react";
import { Button } from "@/components/ui/button";

export async function FormCard({ form }: { form: Post }) {
  const router = useRouter();
  const handleDelete = async (id: string) => {
    await DeleteForm(id).then(() => {
      toast.success("Post Deleted");
      router.refresh();
    });
  };
  return (
    <Card className="bg-muted flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 justify-between">
          <span className="truncate font">{form.name}</span>
          {form.published && (
            <Badge className="bg-green-400 hover:bg-green-400/80 text-muted">
              Published
            </Badge>
          )}
          {!form.published && (
            <Badge
              className="bg-primary hover:bg-primary/80"
              variant={"destructive"}
            >
              Draft
            </Badge>
          )}
        </CardTitle>
        <CardDescription className="flex items-center justify-between text-muted-foreground text-sm">
          {formatDistance(form.createdAt, new Date(), {
            addSuffix: true,
          })}
          {form.published && (
            <span className="flex items-center gap-2">
              <View className="text-muted-foreground" />
              <span>{form.visits.toLocaleString()}</span>
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[20px] truncate text-sm text-muted-foreground">
        {form.description || "No description"}
      </CardContent>
      <CardFooter className="mt-auto pt-6">
        <div className="flex items-center gap-3 w-full mt-auto">
          {form.published && (
            <Button
              asChild
              className={`grow text-muted bg-muted-foreground hover:bg-muted-foreground/80 w-full text-md gap-4 `}
            >
              <Link href={`/post/${form.id}`}>
                View <MoveRight />
              </Link>
            </Button>
          )}
          {!form.published && (
            <Button
              asChild
              className={`grow text-muted px-2 bg-muted-foreground hover:bg-muted-foreground/80 w-full text-md gap-4 `}
            >
              <Link href={`/admin/build/${form.id}`}>
                Edit form <Edit />
              </Link>
            </Button>
          )}
          <Button
            onClick={() => handleDelete(form.id)}
            className="p-3"
            variant={"destructive"}
          >
            <Delete />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
