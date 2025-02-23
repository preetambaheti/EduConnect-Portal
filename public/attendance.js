// Load face-api.js (Face Recognition Library)
const loadModels = async () => {
    await faceapi.nets.tinyFaceDetector.loadFromUri('/model');
    await faceapi.nets.faceLandmark68Net.loadFromUri('/model');
    await faceapi.nets.faceRecognitionNet.loadFromUri('/model');
    await faceapi.nets.ssdMobilenetv1.loadFromUri('/model');
    await faceapi.nets.faceExpressionNet.loadFromUri('/model');
};

// Access Camera and Display Video
const startVideo = () => {
    const video = document.getElementById('video');
    navigator.mediaDevices.getUserMedia({ video: {} })
        .then(stream => video.srcObject = stream)
        .catch(err => console.error("Error accessing webcam: ", err));
};

// Capture Image and Perform Face Recognition
const captureAndRecognize = async () => {
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const statusText = document.getElementById('status');
    const context = canvas.getContext('2d');

    // Set canvas size to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Draw video frame onto canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Detect faces
    const detections = await faceapi.detectAllFaces(canvas, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptors();
    
    if (detections.length > 0) {
        statusText.innerHTML = "✅ Attendance Marked Successfully!";
    } else {
        statusText.innerHTML = "❌ No Face Detected. Try Again!";
    }
};

// Load Models and Start Video
loadModels().then(startVideo);

// Add Event Listener to Capture Button
document.getElementById('capture-btn').addEventListener('click', captureAndRecognize);
