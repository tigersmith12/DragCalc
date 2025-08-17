import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lightbulb, Upload } from "lucide-react";

interface ExampleCardProps {
  onLoadExample: () => void;
}

export default function ExampleCard({ onLoadExample }: ExampleCardProps) {
  return (
    <Card className="bg-amber-50 border border-amber-200">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
          <Lightbulb className="text-amber-500 mr-3 w-5 h-5" />
          Example
        </h3>

        <div className="text-sm text-slate-700 space-y-2">
          <div><strong>Input:</strong></div>
          <ul className="list-disc list-inside ml-2 space-y-1" data-testid="example-inputs">
            <li>Max Drag: 100</li>
            <li>Number of Settings: 10</li>
            <li>Desired Setting: 3</li>
          </ul>

          <div className="mt-3"><strong>Calculation:</strong></div>
          <div className="bg-white rounded-lg p-3 border border-amber-200" data-testid="example-calculation">
            <div>drag_per_setting = 100 ÷ 10 = 10</div>
            <div>drag_at_setting_3 = 10 × 3 = <span className="font-bold text-primary">30</span></div>
          </div>
        </div>

        <Button
          type="button"
          data-testid="button-load-example"
          className="mt-4 w-full bg-amber-100 hover:bg-amber-200 text-amber-800 font-medium"
          variant="ghost"
          onClick={onLoadExample}
        >
          <Upload className="w-4 h-4 mr-2" />
          Load Example Values
        </Button>
      </CardContent>
    </Card>
  );
}
