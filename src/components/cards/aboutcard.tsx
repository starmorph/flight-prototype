import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function AboutCard() {
  return (
    <div className="max-w-xl mx-auto mt-10">
      <Card>
        <CardHeader>
          <CardTitle>Flight Planner Demo</CardTitle>
          <CardDescription> This repo demonstrates returning flight text data with natural language. It utilizes a JSON store of flight data, with types to describe the structure of the JSON. I then use a Vercel AI SDK tool function for searching and returning the correct flights according to the query.</CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground/90 leading-normal prose"> 

        </CardContent>
      </Card>
    </div>
  )
}
