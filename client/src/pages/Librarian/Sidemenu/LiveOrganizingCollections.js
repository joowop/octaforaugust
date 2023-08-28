/* eslint-disable no-undef */
import React, { useState } from 'react';
import { Button, Card } from 'flowbite-react';
function LiveOrganization() {


  const [click, setClick] = useState(false)

  const handelClick =  ()=> {
    setClick(!click)
  }


  return (
    <>

    <Card className='h-[600px]'>
      <div className='container shadow-sm'>
        {click && (<video className='h-[400px] justify-center' muted controls src='https://cdn.jsdelivr.net/gh/jeanDeluge/CDN/1.mp4'>
        </video>)}
      </div>
      <Button onClick={handelClick}>실시간 확인</Button>
    </Card>
   </>
  );
}

export default LiveOrganization;
