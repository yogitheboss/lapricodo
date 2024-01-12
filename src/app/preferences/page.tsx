"use client";
import { useQuery } from "@tanstack/react-query";
import PreferenceForm from "./components/form";
import Heading from "./components/heading";
import { useState } from "react";

async function getUsers(preferances: any[]) {
  console.log("pref",preferances);

  try {
    const response = await fetch("http://127.0.0.1:5000/get_top_laptops", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ input_values: ["Mid Range", "asus", "gaming"] }),
    });

    if (!response.ok) {
      throw new Error("Error fetching data");
    }

    const text = await response.text();
    let sanitizedText = text.replace(/NaN/g, "null"); // Replace NaN with null
    sanitizedText = sanitizedText.replace(/,(?=,)|,.$/, ""); // Remove trailing commas

    const data = JSON.parse(sanitizedText);

    // Replace null values with a default value or string in each item
    const processedData = data.map((item) => {
      // Check and replace null in specific fields
      const fieldsToCheck = ["Processor", "Operating System"]; // Add more fields as needed
      fieldsToCheck.forEach((field) => {
        if (item[field] === null) {
          item[field] = "N/A"; // Replace null with "N/A"
        }
      });

      return item;
    });

    return processedData;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Rethrow the error to handle it further if needed
  }
}

function Page() {
  const [preferances, setPreferances] = useState<any[]>([]);
  const { data, refetch } = useQuery<any[]>({
    queryKey: ["recommedations", preferances],
    queryFn: () => getUsers(preferances),
    staleTime: 5 * 1000,
    enabled: false,
  });
 
  console.log(data);
  const onSubmit = (data: any) => {
    setPreferances([data.budgetTo, data.useCase, data.os, data.brand]);
    refetch();
  };
  return (
    <div className=" flex flex-col justify-center items-center h-lvh bg-amber-50 ">
      <Heading />
      <PreferenceForm
        onSubmit={onSubmit}
        preferances={preferances}
        setPreferances={setPreferances}
      />
    </div>
  );
}

export default Page;
