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

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <Button
              type="button"
              data-testid="button-calculate"
              className="flex-1 bg-primary text-white px-6 py-3 font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              onClick={() => {/* Real-time calculation already handled */}}
            >
              <Calculator className="w-4 h-4 mr-2" />
              Calculate
            </Button>
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
      </CardContent>
    </Card>
  );
}