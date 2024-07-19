import styles from '../styles/Home.module.css';
import Head from 'next/head'
import Image from 'next/Image'
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

  console.log('newuser',user)

  let error;

   // Redirection vers login si non loggué

useEffect(() => {
  if (!user.token) {
    router.push('/login');
  }
}, [user ,router]);



 // Récupération des tweets


  useEffect(() => {
    fetch('http://localhost:3000/tweets')
      .then(response => response.json())
      .then(apiData => {
        setTweetsData(apiData.tweets)
      })
  }, [])

 // Récupération du user complet

  useEffect(()=> {
    fetch(`http://localhost:3000/users/${user.username}`)
    .then (response => response.json())
    .then(apiData => {
        setUserData(apiData.user)
    },  )
},[])






  // Nouveau tweet 


  const handleNewTweet = () => {
    fetch('http://localhost:3000/tweets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ creator: userData._id, tweet: newTweet })
    }).then(response => response.json())
      .then(apiResponse => {
        if (apiResponse.result) {
          setNewTweet('')
          fetch('http://localhost:3000/tweets')
            .then(response => response.json())
            .then(apiData => {
              setTweetsData(apiData.tweets)
            })
            fetch('http://localhost:3000/tweets/trends')
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
    fetch('http://localhost:3000/tweets/updateLikes', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tweetId: tweedId, likedBy: userData._id })
    }).then(response => response.json())
      .then(apiResponse => {
        if (apiResponse.result) {
          fetch('http://localhost:3000/tweets')
            .then(response => response.json())
            .then(apiData => {
              setTweetsData(apiData.tweets)
            })

        }
      })

  }

//  Suppresion tweet 

  const deleteTweet = (tweetId) => {
    fetch(`http://localhost:3000/tweets/${tweetId}`, {
      method: 'DELETE'
    }).then(response => response.json())
      .then(apiResponse => {
        if (apiResponse.result) {
          fetch('http://localhost:3000/tweets')
            .then(response => response.json())
            .then(apiData => {
              setTweetsData(apiData.tweets)
            })
         fetch('http://localhost:3000/tweets/trends')
          .then(response => response.json())
           .then(apiData => {
            setTrendsData(apiData.trends)
            })
        }
      })

  }


// Récupération des Trends 

 useEffect(() => {
  fetch('http://localhost:3000/tweets/trends')
    .then(response => response.json())
    .then(apiData => {
      setTrendsData(apiData.trends)
    })
}, [])

//  Decconexion

  const handleLogout = () => {
    dispatch(logout())
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
          <span className={styles.carCount}>{newTweet.length}/280</span>
          <button className={styles.buttonHome} onClick={() => handleNewTweet()}>Tweet</button>
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
