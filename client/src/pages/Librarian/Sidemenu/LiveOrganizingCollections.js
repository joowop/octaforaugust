/* eslint-disable no-undef */
import React, { useState } from 'react';
import { Button } from 'flowbite-react';
function LiveOrganization() {


  const [click, setClick] = useState(false)

  const handelClick =  ()=> {
    setClick(!click)
  }


  return (
    <>

    <div className='flex'>
    <Button onClick={handelClick}>실시간 확인</Button>
    {click && (<video muted controls src='https://cdn.jsdelivr.net/gh/jeanDeluge/CDN/1.mp4'>
    </video>)}
    </div>
   </>
  );
}

export default LiveOrganization;
