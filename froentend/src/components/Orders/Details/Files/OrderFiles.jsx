import { info, uploadFile } from '@altair/drive-sdk';
import { Image } from '@fluentui/react';
import React, { useState } from 'react'

const OrderFiles = (props) => {

    const [src,setSrc] = useState("http://localhost:8888/downloads/bfaef525-678a-441d-afb5-d0e3df1e0352?filename=Capture(1).PNG")

    const imageProps = {
      
      src: src,
      // Show a border around the image (just for demonstration purposes)
      styles: props => ({ root: { border: '1px solid ' + props.theme.palette.neutralSecondary } }),
    };
  
  
    const handleChange = async (event) => {
      const file = event.target.files[0];
      console.log("file:", URL.createObjectURL(file))
      setSrc(URL.createObjectURL(file))
      try {
        const { content: targetDirectory } = await info({
          path: "/Users/smadala",
        });
       const res= await uploadFile({ file: file, target: targetDirectory });
       console.log(res);
      } catch (e) {
        console.log(e);
      }
    };


  return (
    <>
      <form >
        <h1>React File Upload</h1>
        <input type="file" onChange={handleChange} />
      </form>
      <Image
        {...imageProps}
        width={250}
        height={150}
      />
    </>
  )
}

export default OrderFiles