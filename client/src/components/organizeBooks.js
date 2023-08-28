/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Button, Card } from 'flowbite-react';
import { AiOutlineLoading } from 'react-icons/ai';

import axios from 'axios';

function BookShelf(props){
    const [imageUrl, setImageUrl] = useState('');
    const [uploading, setUploading] = useState();


    const sendBookShelveNumber = async (value) => {
    
        try {
            setUploading(true);
            const formData = new FormData();
            formData.append('bookshelf_number', value)
            
            await axios.post('/librarian/wrong_placed_book', formData)
            .then(response => {
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
        return(
        <>
        <Card className="max-w-sm">
              <div className={`result-${props.number}`}>
              {imageUrl && <img className="h-[300px] w-[300px]" src={`http://127.0.0.1:5000/${imageUrl}`} alt="Downloaded" />}
              </div>
            <Button className={`bookshelf-${props.number}`} isProcessing={uploading} processingSpinner={<AiOutlineLoading className="h-6 w-6 animate-spin" />} onClick={() => sendBookShelveNumber(props.number)}>
                {props.number} 책장 가져오기
            </Button>
            
        </Card>
        </>
        )
      

}


export default BookShelf;