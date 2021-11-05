import "./messages.css"


export default function(props: {message: string, timestamp: number, name?:string}){
    const {message, timestamp, name} = props; 
    
    const styles = {
        base:{
            border: "1px solid rgba(100, 100, 100, .5)",
            borderRadius: 5,
            borderTopLeftRadius: 0,
            margin: 10,
            padding: 5,
            paddingLeft:7
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
        <div style={styles.base} className="base">
            <span style={styles.name}>{name}:</span>
            {' '}<span className="message" style={styles.message}>{message}</span>
        </div> 
    :
     <div>{"es tuyo"}</div>
    
}