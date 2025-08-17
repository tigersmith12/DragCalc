import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { CalculationInputs, CalculationResult } from "@/pages/home";

interface ResultDisplayProps {
  inputs: CalculationInputs;
  result: CalculationResult;
}

export default function ResultDisplay({ inputs, result }: ResultDisplayProps) {
  return (
    <Card className="shadow-xl">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
          <TrendingUp className="text-green-600 mr-3 w-5 h-5" />
          Result
        </h3>

        <div className="text-center">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 mb-4">
            <div className="text-sm text-slate-600 mb-1">Drag at Desired Setting</div>
            <div className="text-3xl font-bold text-slate-800" data-testid="text-result">
              {result.isValid ? result.finalResult.toFixed(4) : "--"}
            </div>
            <div className="text-sm text-slate-500 mt-1">units</div>
          </div>

          {/* Calculation Steps */}
          {result.isValid && (
            <div className="text-left space-y-2 text-sm text-slate-600" data-testid="calculation-steps">
              <div className="bg-slate-50 rounded-lg p-3">
                <div className="font-medium mb-1">Calculation Steps:</div>
                <div>
                  1. Drag per setting = {inputs.maxDrag} ÷ {inputs.numSettings} = {result.dragPerSetting.toFixed(4)}
                </div>
                <div>
                  2. Final result = {result.dragPerSetting.toFixed(4)} × {inputs.desiredSetting} = {result.finalResult.toFixed(4)}
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
