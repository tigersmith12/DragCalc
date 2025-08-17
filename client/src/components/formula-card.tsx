import { Card, CardContent } from "@/components/ui/card";
import { Code } from "lucide-react";

export default function FormulaCard() {
  return (
    <Card className="bg-gradient-to-br from-blue-50 to-slate-50 dark:from-blue-900/20 dark:to-slate-900/20 border border-blue-200 dark:border-blue-800">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4 flex items-center">
          <Code className="text-primary mr-3 w-5 h-5" />
          Formula
        </h3>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-4 border border-slate-200 dark:border-gray-700">
          <code className="text-sm text-slate-800 dark:text-gray-200 block leading-relaxed" data-testid="formula-code">
            drag_per_setting = max_drag / num_settings<br />
            drag_at_desired_setting = drag_per_setting * desired_setting<br />
            <span className="text-primary font-medium">return drag_at_desired_setting</span>
          </code>
        </div>

        <div className="text-sm text-slate-600 dark:text-gray-400 space-y-2">
          <p className="text-slate-800 dark:text-white"><strong>How it works:</strong></p>
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