import styles from '../styles/Home.module.css';
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useSelector , useDispatch } from 'react-redux'
import LastTweets from './LastTweets'
import Trends from './Trends'
import { useRouter } from 'next/router'
import { logout } from '../reducers/user';


function Home() {

  const [newTweet, setNewTweet] = useState('')
  const [tweetsData, setTweetsData] = useState([]);
  const [trendsData, setTrendsData] = useState([]);
  const user = useSelector((state) => state.user.value)
  const [userData, setUserData] = useState([])


  const dispatch = useDispatch()

  const router = useRouter();


  let error;
  let disableTweet = true
  let carCountStyle

   // Redirection vers login si non loggué

useEffect(() => {
  if (!user.token || userData === undefined) {
    router.push('/login');
  }
}, [user ,router]);



 // Récupération des tweets


  useEffect(() => {
    fetch('https://hackatweet-backend-nu-dun.vercel.app/tweets')
      .then(response => response.json())
      .then(apiData => {
        setTweetsData(apiData.tweets)
      })
  }, [])

 // Récupération du user complet

  useEffect(()=> {
    fetch(`https://hackatweet-backend-nu-dun.vercel.app/users/${user.username}`)
    .then (response => response.json())
    .then(apiData => {
        setUserData(apiData.user)
    },  )
},[])






  // Nouveau tweet 


  const handleNewTweet = () => {
    fetch('https://hackatweet-backend-nu-dun.vercel.app/tweets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ creator: userData._id, tweet: newTweet })
    }).then(response => response.json())
      .then(apiResponse => {
        if (apiResponse.result) {
          setNewTweet('')
          fetch('https://hackatweet-backend-nu-dun.vercel.app/tweets')
            .then(response => response.json())
            .then(apiData => {
              setTweetsData(apiData.tweets)
            })
            fetch('https://hackatweet-backend-nu-dun.vercel.app/tweets/trends')
            .then(response => response.json())
             .then(apiData => {
              setTrendsData(apiData.trends)
              })

        } else {
          error = apiResponse.error
        }
      })
  }


  // Aimer tweet 

  const likeTweet = (tweedId, creatorId) => {
    fetch('https://hackatweet-backend-nu-dun.vercel.app/tweets/updateLikes', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tweetId: tweedId, likedBy: userData._id })
    }).then(response => response.json())
      .then(apiResponse => {
        if (apiResponse.result) {
          fetch('https://hackatweet-backend-nu-dun.vercel.app/tweets')
            .then(response => response.json())
            .then(apiData => {
              setTweetsData(apiData.tweets)
            })

        }
      })

  }

//  Suppresion tweet 

  const deleteTweet = (tweetId) => {
    fetch(`https://hackatweet-backend-nu-dun.vercel.app/tweets/${tweetId}`, {
      method: 'DELETE'
    }).then(response => response.json())
      .then(apiResponse => {
        if (apiResponse.result) {
          fetch('https://hackatweet-backend-nu-dun.vercel.app/tweets')
            .then(response => response.json())
            .then(apiData => {
              setTweetsData(apiData.tweets)
            })
         fetch('https://hackatweet-backend-nu-dun.vercel.app/tweets/trends')
          .then(response => response.json())
           .then(apiData => {
            setTrendsData(apiData.trends)
            })
        }
      })

  }


// Récupération des Trends 

 useEffect(() => {
  fetch('https://hackatweet-backend-nu-dun.vercel.app/tweets/trends')
    .then(response => response.json())
    .then(apiData => {
      setTrendsData(apiData.trends)
    })
}, [])

//  Decconexion

  const handleLogout = () => {
    dispatch(logout())
  }

if (newTweet.length > 0 && newTweet.length <281)
    {disableTweet = false}

if (newTweet.length === 0) {
  carCountStyle = {'color': 'grey'}
} else if (newTweet.length > 280) {
  carCountStyle = {'color': 'red'}
}



  return (

    <div className={styles.content}>

      <Head>
        <title> Hackatweet - Home</title>
      </Head>

      <div className={styles.leftContainer}>
        <div className={styles.logo}>
        <Image src='/twitter.png' alt="logo"  height={256} width={256} />
        </div>
     
        <div className={styles.logoutContainer}>
          <span>{userData.firstname}</span>
          <button className={styles.buttonHome} onClick={() => handleLogout()}>Logout</button>
        </div>
      </div>

      <div className={styles.centerContainer}>
        <h2> Home</h2>
        <div className={styles.newTweet}>
          <input className={styles.inputHome} type="text" placeholder='Write Something...' value={newTweet} onChange={(e) => setNewTweet(e.target.value)} />
          <span className={styles.carCount} style={carCountStyle}>{newTweet.length}/280</span>
          <button className={styles.buttonHome} disabled={disableTweet} onClick={() => handleNewTweet()}>Tweet</button>
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

export default Home;
