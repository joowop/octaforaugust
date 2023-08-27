import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';

function Organization() {

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [photoData, setPhotoData] = useState(null);
  const [stream, setStream] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [ currentBookShelfNumber, setCurrentBookShelfNumber] = useState(0)
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  });

  const sendData = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    const blob = await (await fetch(photoData)).blob();
    formData.append('image', blob);
    setCurrentBookShelfNumber(1)
    formData.append('bookshelf_number', currentBookShelfNumber);

    try {
        setUploading(true);
        await axios.post('/librarian/wrong_placed_book', formData
        ).then(response => {
          setImageUrl(response.data["image"]) 
          setUploading(false);
        })
        .catch(error => {
          console.error('Error downloading image:', error);
          setUploading(false);
        });
  
  
      }catch(e){
        console.error("image upload error", e)
      }
  }

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }

      setStream(mediaStream);
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const stopCamera = () => {
    if (stream) {
      const tracks = stream.getTracks();

      tracks.forEach(track => {
        track.stop();
      });
    }
  };

  const takeSnapshot = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      const photoData = canvas.toDataURL('image/png');

      setPhotoData(photoData);
    }
  };

  return (
    <div>
      <h1>Camera App</h1>
      <video ref={videoRef} autoPlay playsInline />
      <button onClick={takeSnapshot}>Take Photo</button>
      <button onClick={stopCamera}>Stop Camera</button>
      {photoData && (
        <div>
          <h2>Snapshot</h2>
          <img src={photoData} alt="Snapshot" />
        </div>
      )}
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      <button onClick={sendData}>sendData</button>
      {uploading && <p>Uploading...</p>}
          {imageUrl && <img src={`http://127.0.0.1:5000/${imageUrl}`} alt="Downloaded" />}
    </div>
    
  );
}

export default Organization;
