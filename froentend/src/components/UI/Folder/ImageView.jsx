import { Image } from '@fluentui/react'
import React from 'react'

const ImageView = (props) => {

    const imageProps = {
        src: props.image?.url.replace("objectstore", "localhost"),
      };

  return (
    <Image
      {...imageProps}
      alt="Example with no image fit value and height or width is specified."
      width={50}
      height={50}
    />
  )
}

export default ImageView