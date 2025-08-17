import { Card, CardContent } from "@/components/ui/card";
import { Code } from "lucide-react";

export default function FormulaCard() {
  return (
    <Card className="bg-gradient-to-br from-blue-50 to-slate-50 border border-blue-200">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
          <Code className="text-primary mr-3 w-5 h-5" />
          Formula
        </h3>

        <div className="bg-white rounded-lg p-4 mb-4 border border-slate-200">
          <code className="text-sm text-slate-800 block leading-relaxed" data-testid="formula-code">
            drag_per_setting = max_drag / num_settings<br />
            drag_at_desired_setting = drag_per_setting * desired_setting<br />
            <span className="text-primary font-medium">return drag_at_desired_setting</span>
          </code>
        </div>

        <div className="text-sm text-slate-600 space-y-2">
          <p><strong>How it works:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Divides total drag evenly across all settings</li>
            <li>Multiplies by your desired setting number</li>
            <li>Provides precise drag value for that setting</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
