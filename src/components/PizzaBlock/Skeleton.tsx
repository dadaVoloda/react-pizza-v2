import React from 'react'
import ContentLoader from 'react-content-loader'

export const Skeleton = () => (
  <ContentLoader
    className='pizza-block'
    speed={2}
    width={280}
    height={460}
    viewBox='0 0 280 470'
    backgroundColor='#f3f3f3'
    foregroundColor='#ecebeb'
  >
    <circle cx='140' cy='130' r='130' />
    <rect x='0' y='278' rx='5' ry='5' width='280' height='24' />
    <rect x='0' y='318' rx='5' ry='5' width='280' height='88' />
    <rect x='1' y='428' rx='5' ry='5' width='90' height='24' />
    <rect x='128' y='420' rx='20' ry='20' width='150' height='40' />
  </ContentLoader>
)
