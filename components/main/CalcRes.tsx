"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Results from "./Results";
import Explanation from "./Explanation";

export default function IpSubnetCalculator() {
  const [ipAddress, setIpAddress] = useState("");
  const [subnetMask, setSubnetMask] = useState("");
  const [networkId, setNetworkId] = useState("");
  const [broadcastId, setBroadcastId] = useState("");
  const [calculationSteps, setCalculationSteps] = useState<string[]>([]);

  const calculateNetworkAndBroadcast = () => {
    const ipOctets = ipAddress.split(".").map(Number);
    const maskOctets = subnetMask.split(".").map(Number);

    if (ipOctets.length !== 4 || maskOctets.length !== 4) {
      alert("Please enter valid IP address and subnet mask");
      return;
    }

    const steps: string[] = [];
    const networkOctets: number[] = [];
    const broadcastOctets: number[] = [];

    for (let i = 0; i < 4; i++) {
      networkOctets[i] = ipOctets[i] & maskOctets[i];
      broadcastOctets[i] = networkOctets[i] | (255 - maskOctets[i]);

      steps.push(`Octet ${i + 1}:`);
      steps.push(
        `Network ID: ${ipOctets[i]} AND ${maskOctets[i]} = ${networkOctets[i]}`
      );
      steps.push(
        `Broadcast ID: ${networkOctets[i]} OR ${255 - maskOctets[i]} = ${
          broadcastOctets[i]
        }`
      );
      steps.push("");
    }

    setNetworkId(networkOctets.join("."));
    setBroadcastId(broadcastOctets.join("."));
    setCalculationSteps(steps);
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>IP Subnet Calculator</CardTitle>
          <CardDescription>
            Calculate Network ID and Broadcast ID from IP address and Subnet
            Mask
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="ip-address">IP Address</Label>
            <Input
              id="ip-address"
              placeholder="e.g., 192.168.1.1"
              value={ipAddress}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setIpAddress(e.target.value)
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="subnet-mask">Subnet Mask</Label>
            <Input
              id="subnet-mask"
              placeholder="e.g., 255.255.255.0"
              value={subnetMask}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSubnetMask(e.target.value)
              }
            />
          </div>
          <Button onClick={calculateNetworkAndBroadcast}>Calculate</Button>
          <Results networkId={networkId} broadcastId={broadcastId} />
          <Explanation steps={calculationSteps} />
        </CardContent>
      </Card>
    </div>
  );
}
