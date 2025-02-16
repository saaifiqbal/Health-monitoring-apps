import React, { useEffect, useRef, useState } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "../config/firebaseConfig";
import NotificationSound from "./alertAudio.mp3";

const FirebaseData = () => {
    const [data, setData] = useState(null);
    const [isFall, setIsFall] = useState(false);
    const [audioEnabled, setAudioEnabled] = useState(false);
console.log({data})
    const audioPlayer = useRef(new Audio(NotificationSound)); // ✅ Creates a persistent Audio instance

    useEffect(() => {
        audioPlayer.current.loop = true; // ✅ Ensures the audio loops

        if (isFall && audioEnabled) {
            console.log("Attempting to play audio...");
            audioPlayer.current.play().catch(err => console.error("Failed to play:", err));
        } else {
            console.log("Stopping audio...");
            audioPlayer.current.pause();
            audioPlayer.current.currentTime = 0;
        }
    }, [isFall, audioEnabled]); // ✅ Triggers only when `isFall` or `audioEnabled` changes

    useEffect(() => {
        const dbRef = ref(database, "sensor_data");
        onValue(dbRef, (snapshot) => {
            if (snapshot.exists()) {
                setData(snapshot.val());
            } else {
                console.log("No data available");
            }
        });
    }, []);

    useEffect(() => {
        const dbRef = ref(database, "fall_detection");
        onValue(dbRef, (snapshot) => {
            if (snapshot.exists()) {
                console.log("fall", snapshot.val())
                setIsFall(snapshot.val());
            } else {
                console.log("No Fall data available");
            }
        });
    }, []);

    const stopAlert = () => {
        setIsFall(false);
    };

    const enableAudio = () => {
        setAudioEnabled(true);
        audioPlayer.current.play().catch(err => console.error("Failed to play:", err));
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
            {/* Main Content */}
            <div className="flex-1 p-6">
                <h2 className="text-3xl font-semibold text-gray-800 mb-6">Sensor Data Overview</h2>

                {/* Fall Alert */}
                {isFall && (
                    <div className="bg-red-500 text-white p-4 rounded-lg mb-4 flex justify-between items-center">
                        <span>🚨 Fall detected! Take immediate action.</span>
                        <button onClick={stopAlert} className="bg-white text-red-500 px-4 py-2 rounded-lg font-semibold">
                            Stop Alert
                        </button>
                    </div>
                )}

                {/* Enable Audio Button */}
                {!audioEnabled && (
                    <button onClick={enableAudio} className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4">
                        Enable Audio Alerts 🔊
                    </button>
                )}

                {/* Sensor Data */}
                {data ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        <div className="bg-white shadow-md rounded-lg p-6">
                            <h3 className="text-xl font-semibold">Heart Rate</h3>
                            <p className="text-gray-700 text-lg">{data.heart_rate} bpm</p>
                        </div>
                        <div className="bg-white shadow-md rounded-lg p-6">
                            <h3 className="text-xl font-semibold">SpO2</h3>
                            <p className="text-gray-700 text-lg">{data.spO2} %</p>
                        </div>
                        <div className="bg-white shadow-md rounded-lg p-6">
                            <h3 className="text-xl font-semibold">Temperature</h3>
                            <p className="text-gray-700 text-lg">{data.temperature}°C</p>
                        </div>
                    </div>
                ) : (
                    <p className="text-lg text-gray-700">Loading...</p>
                )}
            </div>
        </div>
    );
};

export default FirebaseData;
