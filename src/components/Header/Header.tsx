import { HiAtSymbol } from 'react-icons/hi'
import './header.css'
import { FaPhone } from 'react-icons/fa'
import { HiMiniBars3 } from 'react-icons/hi2'
const Header = () => {
  return (
    <header className='fixed w-full'>
        <span id="header-info" className='relative bg-tangerine flex justify-between items-center'>
            <div id='header-info-content'>
              <span id="header-info-email" className='flex items-center'>
              <HiAtSymbol className='text-softWhite'/>
              <p className='text-softWhite'>correo@correo.com</p>
            </span>
            <span id='header-info-phone' className='flex items-center'>
              <FaPhone className='text-softWhite'/>
              <p className='text-softWhite'>+99 999 9999999</p>
            </span>
            </div>
            <img src="/images/blanco-grises1.png" alt="M.A.No" />
        </span>
        <nav id="header-nav" className='bg-lilac text-softWhite flex'>
            <HiMiniBars3 id='menu-btn' className='hidden'/>
            <a href='/'><h2 className='font-impact'>Dr. Fernando Juarez Cesca</h2></a>
            <p className='hidden'></p>
            <ul className='flex justify-between items-center'>
            <li><a href="/sobre-mi">Sobre Mi</a></li>
            <li><a href="/diagnostico">Diagnostico</a></li>
            <li><a href="/grupo-mano">Grupo M.A.No</a></li>
            </ul>
        </nav>
    </header>
  )
}

export default Header