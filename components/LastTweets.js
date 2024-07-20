import styles from '../styles/LastTweets.module.css'
import { useEffect, useState } from 'react';
import Tweet from './Tweet';
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router';

function LastTweets(props) {

   
const user = useSelector((state) => state.user.value)
const router = useRouter()
const [tweetsData, setTweetsData] = useState([])


if (!user.token) {
    router.push('/login');
  }



  // Aimer tweet 

  const likeTweet = (tweetId, creatorName) => {
    props.likeTweet(tweetId, creatorName)
  }

//  Suppresion tweet 

  const deleteTweet = (tweetId) => {
    props.deleteTweet(tweetId)
  }



const tweets = props.tweets.map((e,i) => {
    const isLiked =  e.liked_by.some(u => u.username ===  user.username)
    let isDeletable = e.creator.username === user.username
    return  <Tweet key={i} _id={e._id} creatorName={e.creator.username}  label={e.label} likedBy={e.liked_by} creationDate={e.creation_date} isLiked={isLiked} isDeletable={isDeletable} deleteTweet={deleteTweet} likeTweet={likeTweet}/>
    
})

    return (
            <div className={styles.tweetsContainer}>          
            {tweets}
            </div>
    
    )
}

export default LastTweets;