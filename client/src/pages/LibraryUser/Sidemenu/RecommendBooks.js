import React, { useState } from "react";
import axios from "axios";
import { Button, TextInput, Label } from 'flowbite-react';
import { AiOutlineLoading } from 'react-icons/ai';


function RecommendBook(){

    const [bookName, setBookName] = useState('')
    const [uploading, setUploading] = useState(false);
    const [bookList, setBookList] = useState([])
    const handleBookname = (event) =>{
        setBookName(event.target.value)
    }
    const handleUploadImage = async (event) => {
        event.preventDefault();
    
        try {
          setUploading(true);
          await axios.get(`/user/recommend_book?book=${bookName}`
          ).then(response => {
            setBookList([...response.data["book_list"]])
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
return(
    <>
        <div> 도서 추천</div>
        <div>
          <form className="flex max-w-md flex-col gap-4" onSubmit={handleUploadImage}>
    
          <Label />
          <TextInput value={bookName} onChange={handleBookname}></TextInput>
          <Button  isProcessing={uploading} processingSpinner={<AiOutlineLoading className="h-6 w-6 animate-spin" />}  type="submit"> 추천 도서 가져오기</Button>
          </form>
        </div>
        <div>
            <div> 추천 결과</div>
            {bookList.map(el => (
                <div key={el}>{el}</div>
            ))}
        </div>
    </>
)

}


export default RecommendBook;