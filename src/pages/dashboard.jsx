import React, { useEffect, useState } from "react";
import { database } from "../config/firebaseConfig";
import { ref, onValue } from "firebase/database";

const RealtimeData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const dataRef = ref(database, "sensorData"); // Replace with your actual node path

    const unsubscribe = onValue(dataRef, (snapshot) => {
      if (snapshot.exists()) {
        setData(snapshot.val());
      } else {
        setData(null);
      }
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, [database]);

  console.log("data", data)

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-2">Realtime Data</h2>
      {data ? (
        <pre className="bg-gray-200 p-2 rounded">{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p className="text-gray-500">No data available</p>
      )}
    </div>
  );
};

export default RealtimeData;
