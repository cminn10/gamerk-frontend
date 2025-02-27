import React,{ useState,useEffect } from 'react'
import styles from './mypage.module.css'
import NavBar from '../../Nav/NavBar'
import Avatar from '../../List/Avatar'
import Bio from '../../List/Bio'
import GameIntro from '../../List/GameIntro'
import GameInfo from '../../List/GameInfo'
import Comments from '../../List/Comments'
import Links from '../../List/Links'

function Game(props) {
  const COM_DATA={}
  const GAME_ID = props.match.params.id;
  const GAME_DATA={}
  const [commentData, setCommentData] = useState(COM_DATA);
  const [gameData, setGameData] = useState(GAME_DATA);
  useEffect(() => {
    var myHeaders = new Headers();
    const token = localStorage.getItem('token')
    myHeaders.append("Authorization", token);
    console.log(token)
    
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    const fetchGAME = async () => {
      await fetch('/api/game/'+ GAME_ID)
    .then((res) =>{
      console.log(res)
      return res.json();
    }).then(data => {
      console.log(data)
      setGameData(data);
    })
    .catch(()=>{})}
    const fetchCOM = async () => {
      await fetch('/mark/game/' + GAME_ID + '?pageNum=1&pageSize=3',requestOptions)
      .then((res =>{
        return res.json();
      })).then(data => {
        setCommentData(data.data.items);
        console.log(data)
        console.log(commentData)
      })
      .catch(() =>{})}
    fetchGAME();
    fetchCOM();
}, []);
  return (
    <div class="container-fluid" id="main">
        <NavBar/>
        <div class='row' className={styles.myrow}>
     
     </div>
     <div class="row">
     <div class="col">
       {gameData.data != null && <Avatar ava={gameData.data.imgsrc}/>}
     </div>
     <div class="col">
       {gameData.data != null && <Bio bio={gameData.data}/>}
     </div>
     </div>
     <div class='row' className={styles.myrow}>
    
     </div>
      
     <div class="row">
      <div class="col">
        {gameData.data != null && <GameIntro intro={gameData.data} gameid={GAME_ID}/>}
      </div>
      <div class="col">
        {gameData.data != null && <GameInfo info={gameData.data}/>}
      </div>
      </div>
      <div class='row' className={styles.myrow}>
    
     </div>
    
    <div class="row">
     <div class="col">
      { Array.isArray(commentData) && <Comments Gamecoms={commentData}/>}
      </div>
      <div class="col">
        <Links/>
      </div>
    </div> 

    </div>
  )
}

export default Game
