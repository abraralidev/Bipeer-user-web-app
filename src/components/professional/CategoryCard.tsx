import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react'

type CategoryCardProps = {
  title: String;
  image: String;
}

const CategoryCard = ({ title, image }: CategoryCardProps) => {
 let styles = {
    backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))',
    height:'70px'
  }
  
  
  const router = useRouter()
  return (
    <div
      onClick={() => router.push('/professional/category')}
      className="h-44 w-[90%] mx-auto cursor-pointer bg-center relative bg-cover xl:h-52"
    >
      <Image
        src={image}
        alt={title}
        layout="fill"
        objectFit="cover"
        // style={{opacity:0.5}}
        className='rounded-2xl opacity-100'
      />
      <div style={styles} className="absolute rounded-2xl bottom-0 right-0 transition-opacity left-0 text-center  text-white py-2 font-semibold"
      >
        {title}
      </div>
    </div>
  )
}

export default CategoryCard