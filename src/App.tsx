import { useState, useEffect, useContext} from 'react';
import pkg from '../package.json'
import {BsMoonStarsFill, BsSunFill} from 'react-icons/bs'
import {VscChromeMaximize} from 'react-icons/vsc'
import './default.css';
import "./lightmode.css"
import {ContextTheme, themes} from "./context"
import Main from './componets/Main'

declare global {
  interface Window{handler:{onClose: Function, onMinimize:Function, onMaximize:Function, isFullScreen: Function}}
}

let onClose: Function, onMinimize: Function, onMaximize: Function, isFullScreen: Function ;

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
  const [theme, setTheme] = useState(themes.dark)


// Check if the window is fullScreen only one time when the application run. 
  useEffect(()=> {
    setFullScreen(isFullScreen())
  },[])

// Check the resize event and check if it on FullScreen and change te state only if its different as the past state; 
  window.addEventListener('resize', () => 
  {
    if(FullScreen != isFullScreen()){
      setFullScreen(isFullScreen());
    }
    window.innerWidth < 400 ? setTitle("left") : setTitle("center")
  });

// Change the mode of light of the windows ( dark or light );  
  const handleLight = () => {
    theme === themes.light ? setTheme(themes.dark): setTheme(themes.light);
  }

// if the window is on fullScreen mode put ContentFS in classname to desactivate the top margin. 
  const fs = () => {
    return FullScreen ? "contentFS" : "content"; 
  }

// Creating the TitleBar only if the window is not in FullScreen. 
  const titleBar = () => {
    if (!FullScreen){
      return <div id="title-bar" style={{textAlign: title}} className={theme+'bar'}>
        <div id="title" className={theme+'bar'} >{pkg.build.productName}</div>
        <div id="title-bar-btns">
          <button className="lightbtn" style={theme == "light" ? {color: "black"} : {color: "white"}} onClick={() => {handleLight()}}>
            <span>{!theme ? <BsSunFill/> : <BsMoonStarsFill/>}</span>
          </button>
          <button id="min-btn" style={theme == "light" ? {color: "black"} : {color: "white"}} onClick={() => { onMinimize() }}><span>-</span></button>
          <button id="max-btn" style={theme == "light" ? {color: "black"} : {color: "white"}} onClick={() => { onMaximize() }}><span id="maximize"><VscChromeMaximize/></span></button>
          <button id="close-btn" style={theme == "light" ? {color: "black"} : {color: "white"}} onClick={() => { onClose() }}><span>&times;</span></button>
        </div>
      </div>
    } 
    else {
       return <></> 
      }
  }
  return (
    <ContextTheme.Provider value={theme}>
    <div className={theme} id="main">
      {titleBar()}
      <div className={fs() +" "+ theme}>
        <Main/>
      </div>
    </div>
    </ContextTheme.Provider>
  )
}

export default App
