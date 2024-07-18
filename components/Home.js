import styles from '../styles/Home.module.css';
import Head from 'next/head'
import Image from 'next/Image'
import { useState } from 'react'


function Home() {

const [newTweet, setNewTweet] = useState('')

  return (

    <div className={styles.content}>
    
      <Head> 
        <title> Hackatweet - Home</title> 
        </Head>

    <div className={styles.leftContainer}>
      <Image src='/twitter.png' alt="logo" width={100} height={100}/>
      <div className={styles.logoutContainer}>
        <span>User PlaceHolder</span>
        <button className={styles.buttonHome}>Logout</button>
      </div>
    </div>

    <div className={styles.centerContainer}>
    <h2> Home</h2>
    <div className={styles.newTweet}>
      <input className={styles.inputHome} type="text" placeholder='Write Something...' value={newTweet} onChange={(e) => setNewTweet(e.target.value)}/>
      <span className={styles.carCount}>{newTweet.length}/280</span>
      <button className={styles.buttonHome}>Tweet</button>
    </div>
 
    </div>

    <div className={styles.rightContainer}>
      <h2> Trends</h2>
      <div className={styles.trendsContainer}>
        <span>Trends Placeholder</span>
      </div>

    </div>
       
    </div>
  );
}

export default Home;
