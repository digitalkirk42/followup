import React, { useState, useEffect /* etc. */ } from "react";
import { Card, CardContent } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { Textarea } from "./components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./components/ui/tabs";
import { Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell } from "./components/ui/table";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function SalesFollowUpDashboard() {
  const [step, setStep] = useState(0);
  const [responses, setResponses] = useState({});
  const [summary, setSummary] = useState("");
  const [records, setRecords] = useState([]);

  const questions = [
    "Hi Doctor, just following up on your recent conversation with our sales rep. Did you find the information about the product helpful?",
    "Did the sales rep provide all the necessary materials or sales aides during the discussion?",
    "Do you have any concerns or hesitations about the product that you'd like to share?",
    "Would you be open to a follow-up conversation or receiving additional information?"
  ];

  const handleSubmit = () => {
    const entries = Object.entries(responses)
      .map(([q, a]) => `Q: ${q}\nA: ${a}`)
      .join("\n\n");

    const helpful = responses[questions[0]].toLowerCase().includes("yes");
    const materials = responses[questions[1]].toLowerCase().includes("yes");
    const concerns = responses[questions[2]];
    const openFollowUp = responses[questions[3]].toLowerCase().includes("yes");

    const executiveSummary = `Executive Summary:\n\n${helpful ? "The doctor found the information helpful." : "The doctor had issues with the information provided."}
${materials ? "Sales aides were provided and used effectively." : "There may have been gaps in sales materials."}
${concerns ? `Concerns noted: ${concerns}` : "No major concerns raised."}
${openFollowUp ? "Open to further engagement." : "Follow-up may not be welcomed."}`;

    const fullTranscript = entries;
    const record = {
      id: records.length + 1,
      helpful,
      materials,
      concerns: concerns || "None",
      openFollowUp,
      summary: executiveSummary,
      transcript: fullTranscript,
    };
    setRecords([record, ...records]);
    setSummary(executiveSummary + "\n\n\nFull Transcript:\n\n" + fullTranscript);
    setStep(0);
    setResponses({});
  };

  const handleChange = (value) => {
    setResponses({ ...responses, [questions[step]]: value });
  };

  const chartData = [
    { name: "Helpful Info", value: records.filter(r => r.helpful).length },
    { name: "Used Materials", value: records.filter(r => r.materials).length },
    { name: "Open to Follow-Up", value: records.filter(r => r.openFollowUp).length },
    { name: "Raised Concerns", value: records.filter(r => r.concerns && r.concerns !== "None").length },
  ];

  return (
    <Tabs defaultValue="interview" className="max-w-6xl mx-auto mt-10 p-6">
      <TabsList>
        <TabsTrigger value="interview">New Interview</TabsTrigger>
        <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
      </TabsList>

      <TabsContent value="interview">
        <Card>
          <CardContent className="space-y-4 p-6">
            {step < questions.length ? (
              <div className="space-y-4">
                <p className="text-lg font-medium">{questions[step]}</p>
                <Textarea
                  placeholder="Type your response..."
                  onChange={(e) => handleChange(e.target.value)}
                />
                <Button onClick={() => setStep(step + 1)}>Next</Button>
              </div>
            ) : (
              <Button onClick={handleSubmit}>Generate Executive Summary</Button>
            )}
            {summary && (
              <div className="mt-6">
                <h2 className="text-xl font-bold mb-2">Summary</h2>
                <pre className="whitespace-pre-wrap bg-gray-100 p-4 rounded-lg text-sm">
                  {summary}
                </pre>
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="dashboard">
        <Card>
          <CardContent className="p-6">
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeaderCell>ID</TableHeaderCell>
                  <TableHeaderCell>Summary</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {records.map((rec) => (
                  <TableRow key={rec.id}>
                    <TableCell>{rec.id}</TableCell>
                    <TableCell>
                      <pre className="whitespace-pre-wrap text-sm">
                        {rec.summary.split("\n\n")[0]}
                      </pre>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="analytics">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4">Conversation Insights</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="value" fill="#4f46e5" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
