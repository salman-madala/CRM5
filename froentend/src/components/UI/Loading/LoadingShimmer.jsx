import { mergeStyles, Shimmer, ShimmerElementType, ThemeProvider } from '@fluentui/react'
import React from 'react'

const shimmerWithElementThirdRow = [
    { type: ShimmerElementType.line, height: 16, width: '150px' },
    { type: ShimmerElementType.gap, width: '20px' },
    { type: ShimmerElementType.line, height: 16, width: '150px' },
    { type: ShimmerElementType.gap, width: '20px' },
    { type: ShimmerElementType.line, height: 16, width: '15%' },
  ];

  const wrapperClass = mergeStyles({
    padding: 2,
    selectors: {
      '& > .ms-Shimmer-container': {
        margin: '10px 0',
      },
    },
  });

const LoadingShimmer = () => {
  console.log("locading shimmer")
  return (
    <ThemeProvider className={wrapperClass}>

    <Shimmer width="100%" shimmerElements={shimmerWithElementThirdRow} />
    </ThemeProvider>
  )
}

export default LoadingShimmer