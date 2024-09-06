// const Loader = ({children}) => (
// <div className="container-loader" style={{width: '100vw', height: '100vh', display: "flex"}}>
//    <div style={{flex: "0 0 100%", textAlign: "center", marginTop: "25vh"}}>
//    <svg version="1.1" id="L6" xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px"
//      viewBox="0 0 100 100" enable-background="new 0 0 100 100" width="200" height="200">
//       <rect fill="none" stroke="#fff" stroke-width="4" x="25" y="25" width="50" height="50">
//      <animateTransform
//         attributeName="transform"
//         dur="0.5s"
//         from="0 50 50"
//         to="180 50 50"
//         type="rotate"
//         id="strokeBox"
//         attributeType="XML"
//         begin="rectBox.end"/>
//      </rect>
//       <rect x="27" y="27" fill="#fff" width="46" height="50">
//      <animate
//         attributeName="height"
//         dur="1.3s"
//         attributeType="XML"
//         from="50" 
//         to="0"
//         id="rectBox" 
//         fill="freeze"
//         begin="0s;strokeBox.end"/>
//      </rect>
//    </svg>
//       <br/>
//       {children}
//    </div>

// </div>);

// export default Loader;
const Loader = ({ children }) => (
   <div
     className="container-loader"
     style={{
       width: '100vw',
       height: '100vh',
       display: 'flex',
       backgroundColor: 'white', // Background color set to red
     }}
   >
     <div
       style={{
         flex: '0 0 100%',
         textAlign: 'center',
         marginTop: '25vh',
       }}
     >
       <svg
         version="1.1"
         id="L6"
         xmlns="http://www.w3.org/2000/svg"
         x="0px"
         y="0px"
         viewBox="0 0 100 100"
         enableBackground="new 0 0 100 100"
         width="200"
         height="200"
       >
         <rect
           fill="none"
           stroke="#ff0000" // Loader stroke color set to red
           strokeWidth="4"
           x="25"
           y="25"
           width="50"
           height="50"
         >
           <animateTransform
             attributeName="transform"
             dur="0.5s"
             from="0 50 50"
             to="180 50 50"
             type="rotate"
             id="strokeBox"
             attributeType="XML"
             begin="rectBox.end"
           />
         </rect>
         <rect
           x="27"
           y="27"
           fill="#ff0000" // Inner rectangle fill color set to red
           width="46"
           height="50"
         >
           <animate
             attributeName="height"
             dur="1.3s"
             attributeType="XML"
             from="50"
             to="0"
             id="rectBox"
             fill="freeze"
             begin="0s;strokeBox.end"
           />
         </rect>
       </svg>
       <br />
       {children}
     </div>
   </div>
 );
 
 export default Loader;
 