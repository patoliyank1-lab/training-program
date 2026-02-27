import Image from 'next/image'
import imageUrl from '@/assets/jobs-portal-logo.png'

export function HeaderLogo() {
  return (
    <>
    <Image src={imageUrl} alt='' height={30} className='bg-cover hidden md:block'/>
    <Image src={imageUrl} alt='' height={30} className='bg-cover md:hidden'/>
    </>
  )
}
