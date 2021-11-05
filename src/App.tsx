import { useState, useEffect} from 'react';
import pkg from '../package.json'
import {BsMoonStarsFill, BsSunFill} from 'react-icons/bs'
import {VscChromeMaximize} from 'react-icons/vsc'
import './default.css';
import "./lightmode.css"
import Message from './componets/Message';


declare global {
  interface Window{handler:{onClose: Function, onMinimize:Function, onMaximize:Function, isFullScreen: Function}}
}
let onClose: Function, onMinimize: Function, onMaximize: Function, isFullScreen: Function ;

console.log(typeof window.handler)
if(typeof window.handler != "undefined") {
  onClose = window.handler.onClose;
  onMinimize = window.handler.onMinimize; 
  onMaximize = window.handler.onMaximize;
  isFullScreen = window.handler.isFullScreen;
}
else{ 
  isFullScreen = () => {return true}
}
function App() {
  const [FullScreen, setFullScreen] = useState(false);
  const [title, setTitle] = useState<any>("left");
  const [isLight, setIsLight] = useState(false)


// Check if the window is fullScreen only one time when the application run. 
  useEffect(()=> {
    setFullScreen(isFullScreen())
  },[])

// Check the resize event and check if it on FullScreen and change te state only if its different as the past state; 
  window.addEventListener('resize', () => 
  {
    console.log(window.innerWidth, FullScreen, isFullScreen())
    if(FullScreen != isFullScreen()){
      
      setFullScreen(isFullScreen());
      console.log(window.innerWidth)
    }
    window.innerWidth < 400 ? setTitle("left") : setTitle("center")
  });

// Change the mode of light of the windows ( dark or light );  
  const handleLight = () => {
    setIsLight(!isLight);
  }

// if the window is on fullScreen mode put ContentFS in classname to desactivate the top margin. 
  const fs = () => {
    return FullScreen ? "contentFS" : "content"; 
  }
  
// if the window is on light mode put 'light' in classname to activate the ligth class in CSS.
  const light = () => {
    return isLight ? "light" : ""; 
  }

// Creating the TitleBar only if the window is not in FullScreen. 
  const titleBar = () => {
    console.log(title)
    if (!FullScreen){
      return <div id="title-bar" style={{textAlign: title}} className={light()+'bar'}>
        <div id="title" className={light()+'bar'} >{pkg.build.productName}</div>
        <div id="title-bar-btns">
          <button className="lightbtn" style={isLight ? {color: "black"} : {color: "white"}} onClick={() => {handleLight()}}>
            <span>{!isLight ? <BsSunFill/> : <BsMoonStarsFill/>}</span>
          </button>
          <button id="min-btn" style={isLight ? {color: "black"} : {color: "white"}} onClick={() => { onMinimize() }}><span>-</span></button>
          <button id="max-btn" style={isLight ? {color: "black"} : {color: "white"}} onClick={() => { onMaximize() }}><span id="maximize"><VscChromeMaximize/></span></button>
          <button id="close-btn" style={isLight ? {color: "black"} : {color: "white"}} onClick={() => { onClose() }}><span>&times;</span></button>
        </div>
      </div>
    } 
    else {
       return <></> 
      }
  }
  return (
    <div className={light()} id="main">
      {titleBar()}
      <div className={fs() +" "+ light()}>
        <Message message="2123123123" timestamp={123123213} name="hola"></Message>
      </div>
    </div>
  )
}

export default App
