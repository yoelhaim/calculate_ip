import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ResultsProps {
  networkId: string;
  broadcastId: string;
}

export default function Results({ networkId, broadcastId }: ResultsProps) {
  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Results</CardTitle>
      </CardHeader>
      <CardContent>
        <p>
          <strong>Network ID:</strong> {networkId || "N/A"}
        </p>
        <p>
          <strong>Broadcast ID:</strong> {broadcastId || "N/A"}
        </p>
      </CardContent>
    </Card>
  );
}
