import React from 'react';
import { Button, TextInput, FileInput, Label } from 'flowbite-react';
import { useState } from 'react';
import axios from 'axios';


function Organization() {

  const [ UploadedImage, setUploadedImage ] = useState(null)
  const [ currentBookShelfNumber, setCurrentBookShelfNumber] = useState(0)
  const [imageUrl, setImageUrl] = useState('');
  const [uploading, setUploading] = useState(false);


  const handleImageChange = (event) => {
    setUploadedImage(event.target.files[0]);
  };

  const handleBookShelfNumberChange = (event) => {
    setCurrentBookShelfNumber(event.target.value);
  };

  const handleUploadImage = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('image', UploadedImage);
    formData.append('bookshelf_number', currentBookShelfNumber);

    try {
      setUploading(true);
      await axios.post('/librarian/wrong_placed_book', formData
      ).then(response => {
        setImageUrl(response.data["image"]) 
      })
      .catch(error => {
        console.error('Error downloading image:', error);
        setUploading(false);
      });


    }catch(e){
      console.error("image upload error", e)
    }
  }

  return (
    <>
        <div> 장서 정리</div>
        <div>
          <form className="flex max-w-md flex-col gap-4" onSubmit={handleUploadImage}>
          <Label />
          <FileInput accept="image/*" onChange={handleImageChange}></FileInput>
          <Label />
          <TextInput value={currentBookShelfNumber} onChange={handleBookShelfNumberChange}></TextInput>
          <Button type="submit"> 장서 탐색 </Button>

          </form>
        </div>
        <div>
          <div>장서 탐색 결과</div>
          <div>
          {uploading && <p>Uploading...</p>}
          {imageUrl && <img src={`http://127.0.0.1:5000/${imageUrl}`} alt="Downloaded" />}
          </div>
        </div>
    </>
  );
}

export default Organization;
