"use client";
import { useQuery } from "@tanstack/react-query";
import PreferenceForm from "./components/form"; 
import Heading from "./components/heading";
import { useEffect, useState } from "react";
import LaptopCard from "./components/laptop";
import { Spinner } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BackButton } from "./components/backButton";
import HeroImage from "./components/heroImage";
async function getUsers(preferances: any[]) {
  try {
    const response = await fetch("http://127.0.0.1:5000/get_top_laptops", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ input_values: preferances }),
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
    if (processedData?.length === 0) {
      toast("No result found");
    } else {
      toast.success("Recommendations generated");
    }
    return processedData;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Rethrow the error to handle it further if needed
  }
}

function Home() {
  const [preferances, setPreferances] = useState<any[]>([]);
  const { isLoading, data, refetch } = useQuery<any[]>({
    queryKey: ["recommedations", preferances],
    queryFn: () => getUsers(preferances),
    staleTime: 5 * 1000,
    enabled: false,
  });
  const [mainData, setMainData] = useState<any>();
  console.log(mainData);
  
  useEffect(() => {
    setMainData(data);
  }, [data]);

  const onSubmit = (data: any) => {
    refetch();
  };

  return (
    <>
      <div
        className=" flex flex-col justify-center items-centerbg-amber-50 "
        style={{ overflow: "scroll" }}
      >
        {isLoading && (
          <div className="flex justify-center align-center z-2 fixed top-0 bottom-0">
            <Spinner animation="border" role="status" />
          </div>
        )}
        {(data === undefined ||
          data?.length === 0 ||
          mainData?.length === 0) && (
          <>
            <div className="flex h-screen ">
              <HeroImage />
              <div className="flex flex-col justify-center items-center w-[100%]">
                <Heading />
                <PreferenceForm
                  onSubmit={onSubmit}
                  preferances={preferances}
                  setPreferances={setPreferances}
                />
              </div>
            </div>
          </>
        )}
        {mainData && mainData?.length > 0 && (
          <>
            <div className="flex items-center justify-center relative">
              <BackButton
                handleClick={() => {
                  console.log("I am called");
                  setMainData([]);
                }}
              />
              <h2 className="text-xl text-center font-heading text-slate-800 p-4">
                We have crafted a laptop of{" "}
                <span className="text-purple-400 text-bold">
                  {preferances[3]}{" "}
                </span>
                brand in
                <span className="text-purple-400 text-bold">
                  {" "}
                  {preferances[0]}{" "}
                </span>
                category for
                <span className="text-purple-400 text-bold">
                  {" "}
                  {preferances[1]}{" "}
                </span>
                use with
                <span className="text-purple-400 text-bold">
                  {" "}
                  {preferances[2]}{" "}
                </span>
                OS
              </h2>
            </div>

            <div className=" flex flex-col gap-10 p-10 ">
              {mainData.map((item, index) => (
                <LaptopCard
                  key={index}
                  index={index}
                  name={item.name}
                  Brand={item.Brand}
                  graphicProcessor={item["Graphic Processor"]}
                  Price={item.Price}
                  ram={item['RAM(in GB)']}
                  ssdCapacity={item["SSD Capacity"]}
                />
              ))}
            </div>
          </>
        )}
      </div>
      <ToastContainer />
    </>
  );
}

export default Home;
