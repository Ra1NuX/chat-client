import Message from "./Message"
import "./card.css"
import { useContext } from "react"
import { ContextTheme } from "../context"

const texto = "Paso 1 => Lo primero que hay que hacer es entrar en esta URL : https://www.google.com "
export default function(){
    const theme = useContext(ContextTheme)
    return (
    <div className="body">
        <div className="header">
            <span>5</span>
        </div>
        <div className="allMessages">
            <Message message={texto} timestamp={123123213} />
            <Message message={texto} timestamp={123123213} name="hola"/>
            <Message message={texto} timestamp={123123213} name="Juan"/>
            <Message message={texto} timestamp={123123213} name="Pedro"/>
            <Message message={texto} timestamp={123123213} name="Antonio"/>
            <Message message={texto} timestamp={123123213} name="Enrique"/>
        </div>
        <div className="footer">
            <input className={theme+"dark"} type="text" name="text" id="text" placeholder="Mensaje"/><div><button className={theme}>Enviar</button></div>
        </div>
    </div>
    )
}