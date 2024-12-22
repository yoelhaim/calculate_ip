import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ExplanationProps {
  steps: string[];
}

export default function Explanation({ steps }: ExplanationProps) {
  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Calculation Explanation</CardTitle>
      </CardHeader>
      <CardContent>
        <pre className="whitespace-pre-wrap text-sm">{steps.join("\n")}</pre>
      </CardContent>
    </Card>
  );
}
