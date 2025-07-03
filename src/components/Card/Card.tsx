import './card.css'
type CardParams = {
    title: string;
    text: string;
    buttonText: string;
    link: string;
}

const Card = ({title, text, buttonText, link} : CardParams) => {
  return (
    <div className='relative bg-lightLilac rounded-md shadow-[6px_6px_10px_0px_rgba(0,0,0,0.5)]'>
        <h4 className='font-semibold text-base'>{title}</h4>
        <p className='font-light text-base'>{text}</p>
        <span className='flex items-center justify-between'>
            <a href={link} className='bg-lilac text-softWhite text-base rounded-sm p-2 transition-all duration-300 hover:bg-tangerine'>{buttonText}</a>
            <img src='/images/fullcolor1.png' alt='M.A.No'/>
        </span>
    </div>
  )
}

export default Card