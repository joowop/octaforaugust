import React from 'react';
import { Tabs } from 'flowbite-react';
import { HiBookmark, HiBookOpen} from 'react-icons/hi';
import { Button, TextInput, FileInput, Label } from 'flowbite-react';
import { useState } from 'react';
import axios from 'axios';


function Organization() {

  const [ UploadedImage, setUploadedImage ] = useState(null)
  const [ currentBookShelfNumber, setCurrentBookShelfNumber] = useState(0)
  const [ resultImage, setResultImage ] = useState([])
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
      const response = await axios.post('/librarian/wrong_placed_book', formData,{ headers: {
        'Content-Type': 'multipart/form-data'
      }})


    }catch(e){
      console.error("image upload error", e)
    }
  }

  return (
    <>
      <Tabs.Group
      aria-label="Default tabs"
      style="default">
      <Tabs.Item active icon={HiBookOpen} title="모든 책장 정리" >
        <div> 모든 장서 정리</div>
        <Button>모든 장서 정리 실행</Button>
        
      </Tabs.Item>
      <Tabs.Item icon={HiBookmark} title="책장 정리" >
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
          </div>
        </div>
      </Tabs.Item>
      <Tabs.Item icon={HiBookmark} title="책장 정리 Beta" >
        <div> 장서 정리</div>
          <div>
            <form>

            <FileInput></FileInput>
            <TextInput></TextInput>
            <Button type="submit"/>
            </form>
          </div>
      </Tabs.Item>
    </Tabs.Group>
    </>
  );
}

export default Organization;
