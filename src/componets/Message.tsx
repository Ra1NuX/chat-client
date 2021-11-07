import "./messages.css"
import "../lightmode.css"
import { useContext } from "react";
import { ContextTheme } from "../context";


export default function(props: {message: string, timestamp: number, name?:string}){

    const cTheme = useContext(ContextTheme);
    const {message, timestamp, name} = props; 
    
    const styles = {
        base:{
            borderRadius: 5,
            borderTopLeftRadius: 0,
            margin: 7,
            padding: 5,
            paddingLeft:7
        },
        base2:{
            borderRadius: 5,
            borderTopLeftRadius: 0,
            margin: 7,
            padding: 5,
            paddingLeft:7,
            backgroundColor: "#00aaaa"
        },
        name: {
            display:"block",
            fontSize: 12,
            fontWeight: 600,
        },
        message:{
            margin: 5,
        }
    }

    return name != undefined ?
        <div style={styles.base} className={"base " + cTheme+"dark"}>
            <span style={styles.name}>{name}:</span>
            {' '}<span className="message" style={styles.message}>{message}</span>
        </div> 
    :
    <div style={styles.base2} className={"base " + cTheme+"dark"}>
    {' '}<span className="message" style={styles.message}>{message}</span>
    </div> 
    
}