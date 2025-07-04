import { forwardRef } from 'react';
import type { Ref } from 'react'
import './card.css'
import { Link } from 'react-router-dom';

type CardParams = {
    title: string;
    text: string;
    buttonText: string;
    link: string;
}

const Card = forwardRef<HTMLDivElement, CardParams>(({ title, text, buttonText, link}, ref : Ref<HTMLDivElement>) => {
  return (
    <div ref={ref} className='relative bg-lightLilac rounded-md shadow-[6px_6px_10px_0px_rgba(0,0,0,0.5)]'>
        <h4 className='font-semibold text-base'>{title}</h4>
        <p className='font-light text-base'>{text}</p>
        <span className='flex items-center justify-between'>
            <Link to={link} className='bg-lilac text-softWhite text-base rounded-sm p-2 transition-colors duration-300 hover:bg-tangerine'>{buttonText}</Link>
            <img src='/proyecto-mano/images/fullcolor1.png' alt='M.A.No'/>
        </span>
    </div>
  )
})

export default Card