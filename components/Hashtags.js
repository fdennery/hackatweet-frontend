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

  console.log(props)

    const [newTweet, setNewTweet] = useState('')
    const [tweetsData, setTweetsData] = useState([]);
    const [trendsData, setTrendsData] = useState([]);
    const user = useSelector((state) => state.user.value)
    const [userData, setUserData] = useState([])
    const [searchHashtag, setSearchHashtag] = useState(props.hashtag)
  
  
    const dispatch = useDispatch()
  
    const router = useRouter();
  
  
  
    // Redirection vers login si non loggué
  
            useEffect(() => {
                if (!user.token) {
                router.push('/login');
                }
            }, [user ,router]);

 // Récupération des tweets par hashtag

 useEffect(() => {
    fetch(`https://hackatweet-backend-nu-dun.vercel.app/tweets/byHashtag/${props.hashtag}`)
      .then(response => response.json())
      .then(apiData => {
        setTweetsData(apiData.tweets)
      })
  }, [props.hastag])

 // Récupération du user complet

  useEffect(()=> {
    fetch(`https://hackatweet-backend-nu-dun.vercel.app/users/${user.username}`)
    .then (response => response.json())
    .then(apiData => {
        setUserData(apiData.user)
    },  )
},[])






  // Search tweet by hashtags




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
          <span>{userData.firstname}</span>
          <button className={styles.buttonHome} onClick={() => handleLogout()}>Logout</button>
        </div>
      </div>

      <div className={styles.centerContainer}>
        <h2> Home</h2>
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