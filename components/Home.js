import styles from '../styles/Home.module.css';
import Head from 'next/head'
import Image from 'next/Image'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import LastTweets from './LastTweets'
import { useRouter } from 'next/router'


function Home() {

  const [newTweet, setNewTweet] = useState('')
  const [tweetsData, setTweetsData] = useState([]);

  // test creator id '669904bff108908cfb0fd34f'

  let error;
  const user = useSelector((state) => state.user.value)
  const [userData, setUserData] = useState([])
  const router = useRouter();

  console.log(userData)



  useEffect(() => {
    fetch('http://localhost:3000/tweets')
      .then(response => response.json())
      .then(apiData => {
        setTweetsData(apiData.tweets)
      })
  }, [])

  useEffect(()=> {
    fetch(`http://localhost:3000/users/${user.username}`)
    .then (response => response.json())
    .then(apiData => {
        setUserData(apiData)
    },  )
},[])

useEffect(() => {
  if (!user?.token) {
    router.push('/login');
  }
}, [user, router]);


  const handleNewTweet = () => {
    fetch('http://localhost:3000/tweets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ creator: userData.data._id, tweet: newTweet })
    }).then(response => response.json())
      .then(apiResponse => {
        if (apiResponse.result) {
          setNewTweet('')
          fetch('http://localhost:3000/tweets')
            .then(response => response.json())
            .then(apiData => {
              setTweetsData(apiData.tweets)
            })
        } else {
          error = apiResponse.error
        }
      })
  }

  const likeTweet = (tweedId, creatorId) => {
    fetch('http://localhost:3000/tweets/updateLikes', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tweetId: tweedId, likedBy: userData.data._id })
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
        }
      })

  }



  return (

    <div className={styles.content}>

      <Head>
        <title> Hackatweet - Home</title>
      </Head>

      <div className={styles.leftContainer}>
        <Image src='/twitter.png' alt="logo" width={100} height={100} />
        <div className={styles.logoutContainer}>
          <span>User PlaceHolder</span>
          <button className={styles.buttonHome}>Logout</button>
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
        <h2> Trends</h2>
        <div className={styles.trendsContainer}>
          <span>Trends Placeholder</span>
        </div>

      </div>

    </div>
  );
}

export default Home;
