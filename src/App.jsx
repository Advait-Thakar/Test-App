import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function App() {
  const [showA, setShowA] = useState(false); 
  const [showB, setShowB] = useState(false); 
  const [showC, setShowC] = useState(false); 

  useEffect(() => {
    const fetchPromises = [];

    const fetchChuckNorrisJoke = fetch("https://api.chucknorris.io/jokes/random")
      .then(async (res) => {
        const data = await res.json();
        setShowA(true);
      })
      .catch(error => {
        console.error('Error fetching Chuck Norris joke:', error);
      });
    fetchPromises.push(fetchChuckNorrisJoke);

    const fetchRandomDogPicture = fetch("https://random.dog/woof.json")
      .then(async (res) => {
        const data = await res.json();
        setShowB(true);
      })
      .catch(error => {
        console.error('Error fetching Random Dog picture:', error);
      });
    fetchPromises.push(fetchRandomDogPicture);

    const fetchAdviceSlip = fetch("https://api.adviceslip.com/advice")
      .then(async (res) => {
        const data = await res.json();
        setShowC(true);
      })
      .catch(error => {
        console.error('Error fetching Advice slip:', error);
      });
    fetchPromises.push(fetchAdviceSlip);

    Promise.all(fetchPromises)
      .then(() => {
        console.log("All fetch requests completed successfully");
      })
      .catch(error => {
        console.error("One or more fetch requests failed:", error);
      });
  }, []); 

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <AnimatePresence>
        {showA && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ type: "spring", stiffness: 300, damping: 25, duration: 3000 }}
            style={{ marginBottom: "20px" }}
            key="wrapperA"
          >
            <WrapperComponent>
              <BodyContent title="Chuck Norris Joke" />
            </WrapperComponent>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showB && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ type: "spring", stiffness: 300, damping: 25, duration: 3000 }}
            style={{ marginBottom: "20px" }}
            key="wrapperB"
          >
            <WrapperComponent>
              <BodyContent title="Random Dog Picture" />
            </WrapperComponent>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showC && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 , duration: 3000}}
            style={{ marginBottom: "20px" }}
            key="wrapperC"
          >
            <WrapperComponent>
              <BodyContent title="Advice Slip" />
            </WrapperComponent>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function WrapperComponent({ children }) {
  return (
    <div
      style={{
        margin: "0 20px",
        padding: "20px",
        border: "1px solid black",
        width: "250px",
        minHeight: "150px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      {children}
    </div>
  );
}

function BodyContent({ title }) {
  const [count, setCount] = useState(0);

  function handleButtonClick() {
    setCount(count + 1);
  }

  return (
    <div>
      <h1>{title}</h1>
      <h2 style={{ marginBottom: "10px" }}>{count}</h2>
      <button
        onClick={handleButtonClick}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Add one
      </button>
    </div>
  );
}

export default App;
