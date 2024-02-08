import { Searchbar } from "./Components/Searchbar";
import React, { useState, useEffect } from "react";
import { Card } from "./Components/Card";

export function Home() {
  let searchOn = true;
  const [searchData, setSearchData] = useState("");

  const handleSearchData = (data) => {
    setSearchData(data);
  };

  return (
    <div className="min-h-screen w-auto bg-gray-900 text-white">
      <p className="text-center pt-5 text-xl font-black text-blue-600">
        WEATHERIA
      </p>
      <div className=" pt-[25rem] w-1/2 mx-auto">
        {searchOn ? (
          <Searchbar sendDataToHome={handleSearchData} />
        ) : (
          <>
            <Card />
          </>
        )}
      </div>
    </div>
  );
}
