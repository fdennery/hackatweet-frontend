import styles from '../styles/Tweet.module.css'
import Image from "next/image"
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'
import moment from 'moment'


function Tweet(props) {

    const user = useSelector((state) => state.user.value)
    const router = useRouter()

    if (!user.token ) {
        router.push('/login');
      }

    let heartIconStyle;
    let trashIconStyle;

    const formatHashtag = (text) => {
        const words = text.split(' ');
          const formattedText = words.map((w,i)=> {
            if (w.startsWith('#')){
            return <p style = {{ color: '#1A8CD8',cursor:'pointer' , hover: 'opacity: 0.7' }}>{`${w} `} </p> 
            } 
            else return w + ' '
        })

        return formattedText
    }

    let dateFromNow = moment(props.creationDate).fromNow()

    const handleDeleteClick = (tweetId) => {
        props.deleteTweet(tweetId)
    }

    const handleLikeClick = (tweetId, creatorId) => {
        props.likeTweet(tweetId,creatorId)
    }

  
    if (props.isLiked)
        {heartIconStyle = {'color' : 'red'}}

    if (!props.isDeletable){
        trashIconStyle = {'display': 'none'}
    }


    return (

<div className={styles.tweetContainer}>

<div className={styles.topSection}>
    <Image src="/egg.jpg" className={styles.profilePicture} alt="profile-picture" width={40} height={40}></Image>
    <p className={styles.userName}>{props.creatorName}</p>
    <p className={styles.creationDate}> {dateFromNow} </p>
    </div>
    <div className={styles.tweetLabel}>{formatHashtag(props.label)} </div>
    <div className={styles.iconSection}>
    <FontAwesomeIcon onClick={() => handleLikeClick(props._id, user)} icon={faHeart} style={heartIconStyle} className={styles.icon} />
    <span className={styles.likedCount}>{props.likedBy.length}</span>
    <FontAwesomeIcon onClick={() => handleDeleteClick(props._id)} icon={faTrash}  className={styles.icon} style={trashIconStyle} />
    </div>
</div>


    )
}

export default Tweet;




