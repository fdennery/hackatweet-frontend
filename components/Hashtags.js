import styles from '../styles/Home.module.css';
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useSelector , useDispatch } from 'react-redux'
import LastTweets from './LastTweets'
import Trends from './Trends'
import { useRouter } from 'next/router'
import { logout } from '../reducers/user';
import Link from 'next/link'

function Hashtags (props) {

    const [newTweet, setNewTweet] = useState('')
    const [tweetsData, setTweetsData] = useState([]);
    const [trendsData, setTrendsData] = useState([]);
    const user = useSelector((state) => state.user.value)
  
  
    const dispatch = useDispatch()
    const router = useRouter();
  
  
  // Redirection vers login si non loggué
  
  if (!user.token) {
    router.push('/login');
  }

 // Récupération des tweets par hashtag

 useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tweets/byHashtag/${props.hashtag}`)
      .then(response => response.json())
      .then(apiData => {
        setTweetsData(apiData.tweets)
      })
  }, [props.hastag])

  // Aimer tweet 

  const likeTweet = (tweedId, creatorId) => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tweets/updateLikes`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tweetId: tweedId, username: creatorId })
    }).then(response => response.json())
      .then(apiResponse => {
        if (apiResponse.result) {
          fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tweets`)
            .then(response => response.json())
            .then(apiData => {
              setTweetsData(apiData.tweets)
            })

        }
      })

  }

//  Suppresion tweet 

  const deleteTweet = (tweetId) => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tweets/${tweetId}`, {
      method: 'DELETE'
    }).then(response => response.json())
      .then(apiResponse => {
        if (apiResponse.result) {
          fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tweets`)
            .then(response => response.json())
            .then(apiData => {
              setTweetsData(apiData.tweets)
            })
         fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tweets/trends`)
          .then(response => response.json())
           .then(apiData => {
            setTrendsData(apiData.trends)
            })
        }
      })

  }


// Récupération des Trends 

 useEffect(() => {
  fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tweets/trends`)
    .then(response => response.json())
    .then(apiData => {
      setTrendsData(apiData.trends)
    })
}, [])

//  Deconexion

  const handleLogout = () => {
    dispatch(logout())
  }

  const handleLogoClick =  () => {
    router.push ('/')
  }


return (

    <div className={styles.content}>

      <Head>
        <title> Hackatweet - Hashtags</title>
      </Head>

      <div className={styles.leftContainer}>
        <div className={styles.logo}> 
        <Image src='/twitter.png' alt="logo"  height={256} width={256} onClick={() => handleLogoClick  ()}  />
        </div>
     
        <div className={styles.logoutContainer}>
          <span>{user.firstname}</span>
          <button className={styles.buttonHome} onClick={() => handleLogout()}>Logout</button>
        </div>
      </div>

      <div className={styles.centerContainer}>
        <h2> Hashtags </h2>
        <div className={styles.newTweet}>
          <input className={styles.inputHome} type="text" placeholder='Search hashtag...' value={newTweet} onChange={(e) => setNewTweet(e.target.value)} />
          <button className={styles.buttonHome} onClick={() => handleSearch()}>Searh</button>
        </div>

        <LastTweets tweets={tweetsData} deleteTweet={deleteTweet} likeTweet={likeTweet} />

      </div>

      <div className={styles.rightContainer}>
        <h3> Trends</h3>
        <Trends trends={trendsData}/>

      </div>

    </div>
  );
}

export default Hashtags;