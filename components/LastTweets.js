import styles from '../styles/LastTweets.module.css'
import { useEffect, useState } from 'react';
import Tweet from './Tweet';
import { useSelector } from 'react-redux'

function LastTweets(props) {

   
const user = useSelector((state) => state.user.value)
const [userData, setUserData] = useState([])
console.log(user)

/*useEffect(()=> {
    fetch(`http://localhost:3000/${user.username}`)
    .then (response => response.json())
    .then(apiData => {
        setUserData(apiData.data)
    } )
})*/

const deleteTweet = (tweetId) => {
    props.deleteTweet(tweetId)
}

const likeTweet = (tweetId, creatorId) => {
    props.likeTweet(tweetId,creatorId)
}

const tweets = props.tweets.map((e,i) => {

    const isLiked =  e.liked_by.some(u => u  ===  user)
    return  <Tweet key={i} _id={e._id} creatorName={e.creator.username}  label={e.label} isLiked={isLiked} deleteTweet={deleteTweet} likeTweet={likeTweet}/>
    
})

    return (
            <div className={styles.tweetsContainer}>          
            {tweets}
            </div>
    
    )
}

export default LastTweets;