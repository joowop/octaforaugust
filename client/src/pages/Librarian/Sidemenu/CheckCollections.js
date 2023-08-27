import React from 'react';
import { AiOutlineLoading } from 'react-icons/ai';
import { Button, TextInput, FileInput, Label } from 'flowbite-react';
import { useState } from 'react';
import axios from 'axios';


function CheckCollection() {

  const [ UploadedImage, setUploadedImage ] = useState(null)
  const [ currentBookShelfNumber, setCurrentBookShelfNumber] = useState(0)
  const [imageUrl, setImageUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [missingList, setMissingList] = useState([])
  const [bookList, setBookList] = useState([])
 
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
      await axios.post('/librarian/missing_book', formData
      ).then(response => {
        setMissingList([...response.data["missing_books"]])
        setBookList([...response.data["detected_book_list"]])
        setImageUrl(response.data["bookshelf"])
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

  return (
    <>
        <div> 장서 정리</div>
        <div>
          <form className="flex max-w-md flex-col gap-4" onSubmit={handleUploadImage}>
          <Label />
          <FileInput accept="image/*" onChange={handleImageChange}></FileInput>
          <Label />
          <TextInput value={currentBookShelfNumber} onChange={handleBookShelfNumberChange}></TextInput>
          <Button isProcessing={uploading} processingSpinner={<AiOutlineLoading className="h-6 w-6 animate-spin" />} type="submit"> 장서 탐색 </Button>

          </form>
        </div>
        <div>
          <div>장서 탐색 결과</div>
          <div>
          {imageUrl && <img src={`http://127.0.0.1:5000/${imageUrl}`} alt="Downloaded" />}
          </div>
          <div>분실한 책 목록</div>
          <div>{missingList}</div>
          <div>감지된 책 번호</div>
          <div>{bookList.map(el => (
            <div key={el}>{el} </div>          ))}</div>
        </div>
    </>
  );
}

export default CheckCollection;
