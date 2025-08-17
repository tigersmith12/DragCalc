import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator, Trash2, Settings, Target, Weight } from "lucide-react";
import { CalculationInputs } from "@/pages/home";

interface CalculatorFormProps {
  inputs: CalculationInputs;
  onInputChange: (inputs: CalculationInputs) => void;
  onClear: () => void;
}

interface ValidationErrors {
  maxDrag: string;
  numSettings: string;
  desiredSetting: string;
}

export default function CalculatorForm({ inputs, onInputChange, onClear }: CalculatorFormProps) {
  const [errors, setErrors] = useState<ValidationErrors>({
    maxDrag: "",
    numSettings: "",
    desiredSetting: "",
  });

  const validateInput = (value: number, fieldName: string, min: number = 0.01): string => {
    if (!value || value === 0) {
      return `${fieldName} is required`;
    }
    if (isNaN(value) || value < min) {
      return `${fieldName} must be a positive number greater than ${min}`;
    }
    return "";
  };

  const validateDesiredSetting = (desiredSetting: number, numSettings: number): string => {
    if (desiredSetting > numSettings && numSettings > 0) {
      return "Desired setting cannot be greater than number of settings";
    }
    return "";
  };

  const handleInputChange = (field: keyof CalculationInputs, value: string) => {
    const numValue = parseFloat(value) || 0;
    const newInputs = { ...inputs, [field]: numValue };

    // Validate current field
    let fieldError = "";
    switch (field) {
      case "maxDrag":
        fieldError = validateInput(numValue, "Maximum Drag");
        break;
      case "numSettings":
        fieldError = validateInput(numValue, "Number of Settings", 1);
        break;
      case "desiredSetting":
        fieldError = validateInput(numValue, "Desired Setting", 1) || 
                   validateDesiredSetting(numValue, newInputs.numSettings);
        break;
    }

    // Also revalidate desired setting if num settings changed
    let desiredSettingError = errors.desiredSetting;
    if (field === "numSettings") {
      desiredSettingError = validateInput(newInputs.desiredSetting, "Desired Setting", 1) || 
                           validateDesiredSetting(newInputs.desiredSetting, numValue);
    }

    setErrors({
      ...errors,
      [field]: fieldError,
      ...(field === "numSettings" && { desiredSetting: desiredSettingError }),
    });

    onInputChange(newInputs);
  };

  const handleClear = () => {
    setErrors({
      maxDrag: "",
      numSettings: "",
      desiredSetting: "",
    });
    onClear();
  };

  // Calculate real-time results
  const isValidCalculation = inputs.maxDrag > 0 && inputs.numSettings > 0 && inputs.desiredSetting > 0 && inputs.desiredSetting <= inputs.numSettings;
  const dragPerSetting = isValidCalculation ? inputs.maxDrag / inputs.numSettings : 0;
  const result = isValidCalculation ? dragPerSetting * inputs.desiredSetting : 0;

  return (
    <Card className="shadow-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
      <CardContent className="p-8">
        <h2 className="text-xl font-semibold text-slate-800 dark:text-white mb-6 flex items-center">
          <Settings className="text-primary mr-3 w-5 h-5" />
          Input Parameters
        </h2>

        <div className="space-y-6">
          {/* Max Drag Input */}
          <div className="relative">
            <Label htmlFor="maxDrag" className="block text-sm font-medium text-slate-700 dark:text-gray-200 mb-2">
              Maximum Drag <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Input
                type="number"
                id="maxDrag"
                data-testid="input-max-drag"
                placeholder="Enter maximum drag value"
                min="0.01"
                step="0.01"
                value={inputs.maxDrag || ""}
                onChange={(e) => handleInputChange("maxDrag", e.target.value)}
                className="w-full px-4 py-3 pr-12 text-lg border-slate-300 dark:border-gray-600 focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-gray-700 text-black dark:text-white"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <Weight className="w-5 h-5 text-slate-400 dark:text-gray-400" />
              </div>
            </div>
            <p className="text-sm text-slate-500 dark:text-gray-400 mt-1">The maximum drag value of your reel</p>
            {errors.maxDrag && (
              <div className="text-red-500 text-sm mt-1" data-testid="error-max-drag">
                {errors.maxDrag}
              </div>
            )}
          </div>

          {/* Number of Settings Input */}
          <div className="relative">
            <Label htmlFor="numSettings" className="block text-sm font-medium text-slate-700 dark:text-gray-200 mb-2">
              Number of Settings <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Input
                type="number"
                id="numSettings"
                data-testid="input-num-settings"
                placeholder="Enter total number of settings"
                min="1"
                step="1"
                value={inputs.numSettings || ""}
                onChange={(e) => handleInputChange("numSettings", e.target.value)}
                className="w-full px-4 py-3 pr-12 text-lg border-slate-300 dark:border-gray-600 focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-gray-700 text-black dark:text-white"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <Settings className="w-5 h-5 text-slate-400 dark:text-gray-400" />
              </div>
            </div>
            <p className="text-sm text-slate-500 dark:text-gray-400 mt-1">Total number of available settings</p>
            {errors.numSettings && (
              <div className="text-red-500 text-sm mt-1" data-testid="error-num-settings">
                {errors.numSettings}
              </div>
            )}
          </div>

          {/* Desired Setting Input */}
          <div className="relative">
            <Label htmlFor="desiredSetting" className="block text-sm font-medium text-slate-700 dark:text-gray-200 mb-2">
              Desired Setting <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Input
                type="number"
                id="desiredSetting"
                data-testid="input-desired-setting"
                placeholder={inputs.numSettings > 0 ? `Enter setting (1-${inputs.numSettings})` : "Enter desired setting number"}
                min="1"
                max={inputs.numSettings > 0 ? inputs.numSettings : undefined}
                step="1"
                value={inputs.desiredSetting || ""}
                onChange={(e) => handleInputChange("desiredSetting", e.target.value)}
                className="w-full px-4 py-3 pr-12 text-lg border-slate-300 dark:border-gray-600 focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-gray-700 text-black dark:text-white"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <Target className="w-5 h-5 text-slate-400 dark:text-gray-400" />
              </div>
            </div>
            <p className="text-sm text-slate-500 dark:text-gray-400 mt-1">
              The specific setting you want to calculate for{inputs.numSettings > 0 ? ` (1-${inputs.numSettings})` : ""}
            </p>
            {errors.desiredSetting && (
              <div className="text-red-500 text-sm mt-1" data-testid="error-desired-setting">
                {errors.desiredSetting}
              </div>
            )}
          </div>

          {/* Real-time Result Display */}
          <div className="pt-4">
            <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl p-6 mb-4 text-center">
              <div className="text-sm text-slate-600 dark:text-gray-400 mb-1">Drag at Desired Setting</div>
              <div className="text-3xl font-bold text-slate-800 dark:text-white" data-testid="text-result">
                {isValidCalculation ? result.toFixed(4) : "--"}
              </div>
              <div className="text-sm text-slate-500 dark:text-gray-400 mt-1">units</div>
            </div>

            {/* Calculation Steps */}
            {isValidCalculation && (
              <div className="text-left space-y-2 text-sm text-slate-600 dark:text-gray-400 mb-4" data-testid="calculation-steps">
                <div className="bg-slate-50 dark:bg-gray-700 rounded-lg p-3">
                  <div className="font-medium mb-1 text-slate-800 dark:text-white">Calculation Steps:</div>
                  <div>
                    1. Drag per setting = {inputs.maxDrag} ÷ {inputs.numSettings} = {dragPerSetting.toFixed(4)}
                  </div>
                  <div>
                    2. Final result = {dragPerSetting.toFixed(4)} × {inputs.desiredSetting} = {result.toFixed(4)}
                  </div>
                </div>
              </div>
            )}

            {/* Clear Button */}
            <div className="flex justify-center">
              <Button
                type="button"
                variant="outline"
                data-testid="button-clear"
                className="px-6 py-3 border border-slate-300 dark:border-gray-600 text-slate-700 dark:text-gray-200 font-medium hover:bg-slate-50 dark:hover:bg-gray-700 focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
                onClick={handleClear}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Clear
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}