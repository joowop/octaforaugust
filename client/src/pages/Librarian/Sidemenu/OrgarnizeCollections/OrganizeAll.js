import React, { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { BookShelf } from '../../../../components';
import { Button } from 'flowbite-react';

function Organization() {

    const [buttonNames, setBottonNames] = useState([])

    useEffect(()=>{
        getShelvesNumbers()
    },[])

    const getShelvesNumbers = async () => {
        await axios.get('/librarian/bookshelve_numbers')
            .then(response =>{
                setBottonNames([...response.data].sort())
                return response.data
            }).catch(e =>{
                console.error(e, "error")
            })
    }
    const handleGetAllShelves = () => {
        buttonNames.forEach((el) => {
            const bookShelfComponent = document.getElementsByClassName(`bookshelf-${el}`);
            if (bookShelfComponent) {
                const button = bookShelfComponent[0]
               
                if (button) {
                    button.click();
                }
            }
        });
    };

  return (
    <>
        <div className='flex'>
            <div>
                {buttonNames.map(el=>(
                    <div key={el} >
                    <BookShelf number={el} ></BookShelf>
                    </div>
                ))}
            </div>
            <Button className="flex-end" color="success" onClick={handleGetAllShelves}>모든 책장 가져오기</Button>
        </div>
    </>
  );
}

export default Organization;
