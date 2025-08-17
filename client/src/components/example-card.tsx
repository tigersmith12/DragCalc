import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lightbulb, Upload } from "lucide-react";

interface ExampleCardProps {
  onLoadExample: () => void;
}

export default function ExampleCard({ onLoadExample }: ExampleCardProps) {
  return (
    <Card className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4 flex items-center">
          <Lightbulb className="text-amber-500 mr-3 w-5 h-5" />
          Example
        </h3>

        <div className="text-sm text-slate-700 dark:text-gray-300 space-y-2">
          <div className="text-slate-800 dark:text-white"><strong>Input:</strong></div>
          <ul className="list-disc list-inside ml-2 space-y-1" data-testid="example-inputs">
            <li>Max Drag: 100</li>
            <li>Number of Settings: 10</li>
            <li>Desired Setting: 3</li>
          </ul>

          <div className="mt-3 text-slate-800 dark:text-white"><strong>Calculation:</strong></div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-amber-200 dark:border-amber-700" data-testid="example-calculation">
            <div>drag_per_setting = 100 ÷ 10 = 10</div>
            <div>drag_at_setting_3 = 10 × 3 = <span className="font-bold text-primary">30</span></div>
          </div>
        </div>

        <Button
          type="button"
          data-testid="button-load-example"
          className="mt-4 w-full bg-amber-100 dark:bg-amber-900/50 hover:bg-amber-200 dark:hover:bg-amber-900/70 text-amber-800 dark:text-amber-200 font-medium"
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