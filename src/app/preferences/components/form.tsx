import { useState } from "react";
import DropDownContainer from "../../components/dropDown";
interface PreferenceFormProps {
  onSubmit: (preferences: Preferences) => void;
  preferances: any[];
  setPreferances: (preferances: any[]) => void;
}

interface Preferences {
  budgetTo: string;
  useCase: string;
  os: string;
  brand: string;
}

const PreferenceForm: React.FC<PreferenceFormProps> = ({ onSubmit,preferances,setPreferances }) => {
  const [budgetTo, setBudgetTo] = useState<string>("");
  const [useCase, setUseCase] = useState<string>("");
  const [os, setOs] = useState<string>("");
  const [brand, setBrand] = useState<string>("");

  const handleSubmit = () => {
    const preferences: Preferences = {
      budgetTo,
      useCase,
      os,
      brand,
    };
    setPreferances([budgetTo,useCase,os,brand]);
    onSubmit(preferences);
  };

  return (
    <div className="max-w-md min-w-[600px] mx-auto mt-8 p-6 bg-amber-100 rounded shadow-md">
      <DropDownContainer
        label="Budget"
        options={["Pocket Friendly", "Mid Range", "High End"]}
        priority={budgetTo}
        setPriority={setBudgetTo}
      />
      <DropDownContainer
        label="Use Case"
        options={["Gaming", "Everyday", "Professional"]}
        priority={useCase}
        setPriority={setUseCase}
      />
      <DropDownContainer
        label="Brand"
        options={[
          "HP",
          "Dell",
          "MSI",
          "ASUS",
          "realme",
          "avita",
          "ACER",
          "Samsung",
          "Infinix",
          "LG",
          "Apple",
          "Nokia",
          "MI",
          "Lenevo",
          "Vaio",
          "Redmibook",
        ]}
        priority={brand}
        setPriority={setBrand}
      />
      <DropDownContainer
        label="OS"
        options={["Windows", "macOS"]}
        priority={os}
        setPriority={setOs}
      />
      <button
        className="bg-amber-600 hover:bg-amber-500 text-white  py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-amber-50 disabled:text-slate-400 mt-4"
        onClick={handleSubmit}
        disabled={!budgetTo || !useCase || !os || !brand}
      >
        Submit
      </button>
    </div>
  );
};

export default PreferenceForm;
