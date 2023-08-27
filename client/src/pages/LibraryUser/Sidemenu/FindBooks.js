/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { AiOutlineLoading } from 'react-icons/ai';
import { Button, TextInput, Label } from 'flowbite-react';

import axios from 'axios';



function FindBook(){

    const [imageUrl, setImageUrl] = useState('');
    const [uploading, setUploading] = useState(false);
    const [bookName, setBookName] = useState('')

    const handleBookname = (event) =>{
        setBookName(event.target.value)
    }
    const [currentBookState, setCurrentBookState] = useState('')

    const getBookshelf = async (event) => {
        event.preventDefault();
        try {
            setUploading(true);
            
            await axios.get(`/user/find_book?book=${bookName}`)
            .then(response => {
                console.log(response.data)
                if( response.data["booklist"] === -1)
                    setCurrentBookState('해당 책이 있는 책장이 없습니다')
            
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
return(
    <>
        <div>
          <form className="flex max-w-md flex-col gap-4" onSubmit={getBookshelf}>
    
          <Label />
          <TextInput value={bookName} onChange={handleBookname}></TextInput>
          <Button isProcessing={uploading} processingSpinner={<AiOutlineLoading className="h-6 w-6 animate-spin" />}  type="submit"> 추천 도서 가져오기</Button>
          </form>
        </div>
        <div>
        {  imageUrl && <img src={`http://127.0.0.1:5000/${imageUrl}`} alt="Downloaded" />}
        {currentBookState}
        </div>
    </>
)

}


export default FindBook;