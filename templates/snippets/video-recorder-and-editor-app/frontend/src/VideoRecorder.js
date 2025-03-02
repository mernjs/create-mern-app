import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import { CameraIcon, MicrophoneIcon, PauseIcon, PlayIcon, StopIcon, ShareIcon } from '@heroicons/react/24/solid';

const VideoRecorder = () => {
    const [recording, setRecording] = useState(false);
    const [paused, setPaused] = useState(false);
    const [videoUrl, setVideoUrl] = useState('');
    const mediaRecorderRef = useRef(null);
    const videoRef = useRef(null);
    const webcamRef = useRef(null);
    const chunks = useRef([]);
    const [recordingTime, setRecordingTime] = useState(0);
    const recordingIntervalRef = useRef(null);
    const [showSettings, setShowSettings] = useState(false);
    const [useWebcam, setUseWebcam] = useState(true);
    const [useMic, setUseMic] = useState(true);
    const [showPreview, setShowPreview] = useState(false);
    const [videos, setVideos] = useState([]);
    const [videoTitle, setVideoTitle] = useState("");
    const [microphoneDevices, setMicrophoneDevices] = useState([]);
    const [selectedMicrophone, setSelectedMicrophone] = useState(null);
    const [showMicrophoneMenu, setShowMicrophoneMenu] = useState(false);
    const [screenSharingStream, setScreenSharingStream] = useState(null);
    const [webcamStream, setWebcamStream] = useState(null);

    const fetchVideos = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/videos');
            setVideos(response.data);
            if (response.data.length > 0) {
                setVideoUrl(`http://localhost:5000/${response.data[0]?.filePath}`);
                setVideoTitle(response.data[0]?.title);
            }
        } catch (error) {
            console.error("Error fetching videos:", error);
        }
    };

    useEffect(() => {
        fetchVideos();
        navigator.mediaDevices.enumerateDevices().then(devices => {
            const mics = devices.filter(device => device.kind === 'audioinput');
            setMicrophoneDevices(mics);
            if (mics.length > 0) {
                setSelectedMicrophone(mics[0]);
            }
        });
    }, []);

    const startScreenSharing = async () => {
        try {
            const stream = await navigator.mediaDevices.getDisplayMedia({
                video: {
                    cursor: "always"
                },
                audio: false // No audio from screen sharing by default
            });
    
            setScreenSharingStream(stream);
            
            // If recording has already started, add the screen share tracks to the current recording stream
            if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
                const currentStream = mediaRecorderRef.current.stream;
                stream.getTracks().forEach(track => {
                    currentStream.addTrack(track);
                });
            }
            
            // Update the video preview if recording
            if (videoRef.current) {
                videoRef.current.srcObject = mediaRecorderRef.current.stream;
            }
    
        } catch (error) {
            console.error("Error starting screen sharing:", error);
            alert("Error starting screen sharing: " + error.message);
        }
    };
    
    const startRecording = async () => {
        setShowSettings(false);
        setShowPreview(true);
        try {
            let audioStream = null;
    
            if (useMic && selectedMicrophone) {
                try {
                    audioStream = await navigator.mediaDevices.getUserMedia({
                        audio: { deviceId: { exact: selectedMicrophone.deviceId } }
                    });
                } catch (error) {
                    console.warn("Failed to access selected microphone, falling back to default.", error);
                    audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
                }
            }
    
            let combinedStream = new MediaStream();
    
            // Always add webcam stream if it's active
            if (useWebcam) {
                const webcamStream = await navigator.mediaDevices.getUserMedia({ video: true });
                setWebcamStream(webcamStream);
                combinedStream.addTrack(webcamStream.getVideoTracks()[0]);
            }
    
            // Add audio stream if available
            if (audioStream) {
                combinedStream.addTrack(audioStream.getAudioTracks()[0]);
            }
    
            // Add screen sharing stream if it's active
            if (screenSharingStream) {
                screenSharingStream.getTracks().forEach(track => combinedStream.addTrack(track));
            }
    
            if (videoRef.current) {
                videoRef.current.srcObject = combinedStream;
            }
    
            const mediaRecorder = new MediaRecorder(combinedStream);
            mediaRecorderRef.current = mediaRecorder;
    
            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    chunks.current.push(event.data);
                }
            };
    
            mediaRecorder.onstop = async () => {
                const blob = new Blob(chunks.current, { type: 'video/webm' });
                const url = URL.createObjectURL(blob);
                setVideoUrl(url);
                chunks.current = [];
                await uploadVideo(blob);
                await fetchVideos();
                stopScreenSharing();
                stopWebcam();
            };
    
            mediaRecorder.start();
            setRecording(true);
            setPaused(false);
            setRecordingTime(0);
            recordingIntervalRef.current = setInterval(() => {
                setRecordingTime(prev => prev + 1);
            }, 1000);
    
        } catch (error) {
            console.error("Error accessing media devices:", error);
            alert("Error accessing media devices: " + error.message);
        }
    };
    
    

    const stopScreenSharing = () => {
        if (screenSharingStream) {
            screenSharingStream.getTracks().forEach(track => track.stop());
            setScreenSharingStream(null);
        }
    };

    const stopWebcam = () => {
        if (webcamStream) {
            webcamStream.getTracks().forEach(track => track.stop());
            setWebcamStream(null);
        }
        setUseWebcam(false);
    };

    const pauseRecording = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
            mediaRecorderRef.current.pause();
            setPaused(true);
            clearInterval(recordingIntervalRef.current);
        }
    };

    const resumeRecording = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === "paused") {
            mediaRecorderRef.current.resume();
            setPaused(false);
            recordingIntervalRef.current = setInterval(() => {
                setRecordingTime(prev => prev + 1);
            }, 1000);
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
        }
        const tracks = videoRef.current?.srcObject?.getTracks();
        tracks?.forEach(track => track.stop());

        setRecording(false);
        setPaused(false);
        clearInterval(recordingIntervalRef.current);
        setShowPreview(false);
        stopScreenSharing();
        stopWebcam();
    };

    const onPlay = (video) => {
        setVideoUrl(`http://localhost:5000/${video.filePath}`);
        setVideoTitle(video.title);
    };

    const uploadVideo = async (videoBlob) => {
        const formData = new FormData();
        formData.append('video', videoBlob, `recording_${Date.now()}.webm`);

        try {
            const response = await axios.post('http://localhost:5000/api/videos/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data.message);
        } catch (error) {
            console.error("Error uploading video:", error);
        }
    };

    useEffect(() => {
        if (!recording) {
            setRecordingTime(0);
        }
    }, [recording]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const toggleMicrophoneMenu = () => {
        setShowMicrophoneMenu(!showMicrophoneMenu);
    };

    const selectMicrophone = (device) => {
        setSelectedMicrophone(device);
        setShowMicrophoneMenu(false);
    };

    useEffect(() => {
        if (recording) {
            document.title = `${formatTime(recordingTime)} || Recording`;
        } else {
            document.title = "Video Recorder";
        }
        return () => {
            document.title = "Video Recorder";
        };
    }, [recordingTime, recording]);

    return (
        <div className="flex flex-col h-screen bg-gray-900 text-white">
            <header className="bg-gray-800 p-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold">Video Recorder</h1>
                {recording ? (
                    <div className="flex items-center">
                        <span className="mr-4 text-lg">{formatTime(recordingTime)}</span>
                        {paused ? (
                            <button onClick={resumeRecording} className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md flex items-center">
                                <PlayIcon className="w-5 h-5 mr-2" /> Resume
                            </button>
                        ) : (
                            <button onClick={pauseRecording} className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded-md flex items-center">
                                <PauseIcon className="w-5 h-5 mr-2" /> Pause
                            </button>
                        )}
                        <button onClick={stopRecording} className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md flex items-center ml-4">
                            <StopIcon className="w-5 h-5 mr-2" /> Stop
                        </button>
                    </div>
                ) : (
                    <button onClick={() => setShowSettings(true)} className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md flex items-center">
                        <CameraIcon className="w-5 h-5 mr-2" /> Record Video
                    </button>
                )}
            </header>

            <div className="flex flex-grow overflow-hidden">
                <main className="flex-grow p-4 relative overflow-hidden">
                    {showPreview && (
                        <div className="relative mb-6">
                            <video
                                ref={videoRef}
                                autoPlay
                                muted
                                className="w-full h-auto max-h-[80vh] border border-gray-700 rounded-lg shadow-md"
                                controls
                            />
                            {useWebcam && (
                                <video
                                    ref={webcamRef}
                                    autoPlay
                                    muted
                                    className="absolute w-32 h-32 rounded-full border-2 border-blue-400 shadow-lg bottom-4 right-4"
                                />
                            )}
                        </div>
                    )}

                    {showSettings && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
                            <div className="bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-lg">
                                <h2 className="text-xl font-semibold mb-4">Recording Settings</h2>
                                <label className="block mb-3 flex items-center">
                                    <input type="checkbox" checked={useWebcam} onChange={() => setUseWebcam(!useWebcam)} className="mr-2" />
                                    <CameraIcon className="w-5 h-5 mr-2" /> Use Webcam
                                </label>
                                <label className="block mb-3 flex items-center">
                                    <input type="checkbox" checked={useMic} onChange={() => setUseMic(!useMic)} className="mr-2" />
                                    <MicrophoneIcon className="w-5 h-5 mr-2" /> Use Microphone
                                </label>
                                {useMic && (
                                    <div className="mb-3">
                                        <button onClick={toggleMicrophoneMenu} className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition flex items-center">
                                            {selectedMicrophone ? selectedMicrophone.label : "Select Microphone"} <MicrophoneIcon className="w-5 h-5 ml-2" />
                                        </button>
                                        {showMicrophoneMenu && (
                                            <div className="mt-2 bg-gray-700 border border-gray-600 rounded-lg shadow-lg">
                                                {microphoneDevices.map((device) => (
                                                    <div
                                                        key={device.deviceId}
                                                        className="p-2 hover:bg-gray-600 cursor-pointer"
                                                        onClick={() => selectMicrophone(device)}
                                                    >
                                                        {device.label || `Microphone ${device.deviceId}`}
                                                        {selectedMicrophone && selectedMicrophone.deviceId === device.deviceId && " ✓"}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}
                                <div className="flex justify-end space-x-4">
                                    <button onClick={startRecording} className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md flex items-center">
                                        <CameraIcon className="w-5 h-5 mr-2" /> Start Recording
                                    </button>
                                    <button onClick={() => setShowSettings(false)} className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-md">
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {videoUrl && !showPreview && (
                        <div>
                            <h3 className="text-lg font-semibold mb-2">{videoTitle}</h3>
                            <video
                                src={videoUrl}
                                controls
                                className="w-full h-auto max-h-[80vh] border border-gray-700 rounded-lg shadow-md"
                            />
                        </div>
                    )}
                </main>

                <aside className="w-64 border-l border-gray-700 bg-gray-800 overflow-y-auto">
                    <h2 className="text-lg font-semibold p-4">Recorded Videos</h2>
                    <div className="p-4 space-y-4">
                        {videos.map((video, index) => (
                            <div
                                key={index}
                                className="p-4 bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                                onClick={() => onPlay(video)}
                            >
                                <h3 className="font-semibold">{video.title}</h3>
                                <p className="text-gray-400 text-sm">Click to play</p>
                            </div>
                        ))}
                    </div>
                </aside>
            </div>

            <footer className="bg-gray-800 p-3 text-center">
                <p className="text-gray-400">© 2024 Video Recorder App</p>
            </footer>

            {recording && (
                <div className="fixed bottom-5 right-5">
                    {screenSharingStream ? (
                        <button onClick={stopScreenSharing} className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition flex items-center">
                            <StopIcon className="w-5 h-5 mr-2" /> Stop Sharing
                        </button>
                    ) : (
                        <button onClick={startScreenSharing} className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition flex items-center">
                            <ShareIcon className="w-5 h-5 mr-2" /> Share Screen
                        </button>
                    )}
                </div>
            )}

            {useWebcam && (
                <div className="fixed bottom-20 right-5">
                    <button onClick={stopWebcam} className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition flex items-center">
                        <StopIcon className="w-5 h-5 mr-2" /> Stop Camera
                    </button>
                </div>
            )}
        </div>
    );
};

export default VideoRecorder;
