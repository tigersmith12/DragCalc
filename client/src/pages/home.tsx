import { useState, useEffect } from "react";
import { Calculator } from "lucide-react";
import CalculatorForm from "@/components/calculator-form";
import ResultDisplay from "@/components/result-display";
import FormulaCard from "@/components/formula-card";
import ExampleCard from "@/components/example-card";
import ThemeToggle from "@/components/theme-toggle";
import Footer from "@/components/footer";

export interface CalculationInputs {
  maxDrag: number;
  numSettings: number;
  desiredSetting: number;
}

export interface CalculationResult {
  dragPerSetting: number;
  finalResult: number;
  isValid: boolean;
}

export default function Home() {
  const [inputs, setInputs] = useState<CalculationInputs>({
    maxDrag: 0,
    numSettings: 0,
    desiredSetting: 0,
  });

  const [result, setResult] = useState<CalculationResult>({
    dragPerSetting: 0,
    finalResult: 0,
    isValid: false,
  });

  const calculateDrag = (newInputs: CalculationInputs) => {
    const { maxDrag, numSettings, desiredSetting } = newInputs;

    // Validate inputs
    if (maxDrag <= 0 || numSettings <= 0 || desiredSetting <= 0 || desiredSetting > numSettings) {
      setResult({
        dragPerSetting: 0,
        finalResult: 0,
        isValid: false,
      });
      return;
    }

    // Perform calculation using the provided algorithm
    const dragPerSetting = maxDrag / numSettings;
    const dragAtDesiredSetting = dragPerSetting * desiredSetting;

    setResult({
      dragPerSetting,
      finalResult: dragAtDesiredSetting,
      isValid: true,
    });
  };

  const handleInputChange = (newInputs: CalculationInputs) => {
    setInputs(newInputs);
    calculateDrag(newInputs);
  };

  const handleClear = () => {
    const clearedInputs = { maxDrag: 0, numSettings: 0, desiredSetting: 0 };
    setInputs(clearedInputs);
    setResult({
      dragPerSetting: 0,
      finalResult: 0,
      isValid: false,
    });
  };

  const handleLoadExample = () => {
    const exampleInputs = { maxDrag: 100, numSettings: 10, desiredSetting: 3 };
    setInputs(exampleInputs);
    calculateDrag(exampleInputs);
  };

  useEffect(() => {
    document.title = "Drag Calculator - Professional Tool";
  }, []);

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        {/* Theme Toggle */}
        <div className="flex justify-end mb-6">
          <ThemeToggle />
        </div>
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-xl mb-4">
            <Calculator className="text-white w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">Drag Calculator</h1>
          <p className="text-slate-600 dark:text-gray-400 max-w-2xl mx-auto">
            Calculate drag values based on maximum drag, number of settings, and desired setting using our precision algorithm.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calculator Input Section */}
          <div className="lg:col-span-2">
            <CalculatorForm
              inputs={inputs}
              onInputChange={handleInputChange}
              onClear={handleClear}
            />
          </div>

          {/* Results and Formula Section */}
          <div className="space-y-6">
            <ResultDisplay
              inputs={inputs}
              result={result}
            />
            <FormulaCard />
            <ExampleCard onLoadExample={handleLoadExample} />
          </div>
        </div>
        
        <Footer />
      </div>
    </div>
  );
}
