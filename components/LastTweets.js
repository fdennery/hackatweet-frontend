import styles from '../styles/LastTweets.module.css'
import { useEffect, useState } from 'react';
import Tweet from './Tweet';
import { useSelector } from 'react-redux'
import { Router, useRouter } from 'next/router';

function LastTweets(props) {

   
const user = useSelector((state) => state.user.value)
const [userData, setUserData] = useState([])
const router = useRouter()

useEffect(() => {
    if (!user.token) {
      router.push('/login');
    }
  }, [user ,router]);


useEffect(()=> {
    fetch(`http://localhost:3000/users/${user.username}`)
    .then (response => response.json())
    .then(apiData => {
        setUserData(apiData.user)
    },  )
},[])

const deleteTweet = (tweetId) => {
    props.deleteTweet(tweetId)
}

const likeTweet = (tweetId, creatorId) => {
    props.likeTweet(tweetId,creatorId)
}

const tweets = props.tweets.map((e,i) => {
    const isLiked =  e.liked_by.some(u => u.toString()  ===  userData._id.toString())
    let isDeletable = e.creator._id === userData._id;
    return  <Tweet key={i} _id={e._id} creatorName={e.creator.username}  label={e.label} likedBy={e.liked_by} creationDate={e.creation_date} isLiked={isLiked} isDeletable={isDeletable} deleteTweet={deleteTweet} likeTweet={likeTweet}/>
    
})

    return (
            <div className={styles.tweetsContainer}>          
            {tweets}
            </div>
    
    )
}

export default LastTweets;