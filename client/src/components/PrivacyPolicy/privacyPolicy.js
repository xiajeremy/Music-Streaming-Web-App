// import React, { useState, useEffect } from 'react';


// const privacyPolicy = () => {
//     const [policy, setPolicy] = useState({});
//     const [display, setDisplay] = useState(false);

//     useEffect(async () => {
//     const getPolicy = await fetch("/privacy-policy");
//     if (getPolicy.ok) {
//       const data = await getPolicy.json();
//       setPolicy(data[0]);
//     }
//     }, []);
    
//     const inputstyle = {
//         width:"800px",
//         height:"600px",
//         resize: "vertical",
//         color: "black",
//         backgroundColor: "white",
//         border: "black",
//         borderRadius: "10px"
//     }    

//     function boxEnable(){
//         document.getElementById("textArea").disabled = false;
//         setDisplay(true);
//     }

    
//     async function submit(){
//         const text = document.getElementById("textArea").value;
//         await fetch("/privacy-policy", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//                 text: text,
//                 id: 1
//             }),
//           });
//         setPolicy();
//     } 
    
//     return(
//         <div>
//             <div style={{ width:"20px", align:"center",background:"black", color:"white"}}>{policy.policyText}</div>
//             <form style={{background:"black", color:"white", paddingLeft:"50px", paddingTop:"50px", paddingBottom:"50px"}}>
//                 <textarea id="textArea" defaultValue={"Rewrite policy here...."} style={inputstyle} disabled></textarea>
//                 <input type="button" value="Edit" onClick={boxEnable} ></input>
//                 <div id="saveDiv">
//                     {display && <input type="button" value="Save" onClick={submit()}></input>}
//                 </div>
//             </form>
//         </div>
//     );
// }

// export default privacyPolicy;