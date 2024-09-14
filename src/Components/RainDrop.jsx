
const RainDrop = () => {
    return (
      <div className="rain-drop">
        {/* Add your rain animation CSS here */}
        <style>
          {`
            .rain-drop {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background-image: url('rain-drop.gif');
              background-size: 100% 100%;
              animation: rain 2s linear infinite;
            }
  
            @keyframes rain {
              0% {
                transform: translateY(0);
              }
              100% {
                transform: translateY(100%);
              }
            }
          `}
        </style>
      </div>
    );
  };
  
  export default RainDrop;