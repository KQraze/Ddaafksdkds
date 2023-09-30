import React from 'react';
import styles from './Header.module.css'
import Nav from '../navigate-bar/NavigateBar';
import Icon from '/public/Icon.png'

 
const Header =() => {

  return (
      <header className={styles.header}>
        <div className={styles.iconame}>
        <img src={Icon} alt="иконка" width="65px" height="55px" className={styles.img}/>
        <span className={styles.namesite}>Просто_Купить.com</span>
        </div> 
        <Nav />
      </header>
  )
}

export default Header
