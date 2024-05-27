import React, { useState, useEffect } from "react";
import axios from "axios";
import Joke from "./Joke";
import "../JokeList.css";

/** List of jokes. */

const JokeList = () => {
  const [jokes, setJokes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  let numJokesToGet = 5;

  useEffect(() => {
    const getJokes = async () => {
      try {
        let seenJokes = new Set();
        let jokesArray = [];

        while (jokesArray.length < numJokesToGet) {
          let res = await axios.get("https://icanhazdadjoke.com", {
            headers: { Accept: "application/json" },
          });
          let { ...joke } = res.data;

          if (!seenJokes.has(joke.id)) {
            seenJokes.add(joke.id);
            jokesArray.push({ ...joke, votes: 0 });
          } else {
            console.log("duplicate found!");
          }
        }
        setJokes(jokesArray);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    getJokes();
  }, [numJokesToGet]);

  /* Get new jokes */
  const generateNewJokes = async () => {
    try {
      let seenJokes = new Set();
      let jokesArray = [];

      while (jokesArray.length < numJokesToGet) {
        let res = await axios.get("https://icanhazdadjoke.com", {
          headers: { Accept: "application/json" },
        });
        let { ...joke } = res.data;

        if (!seenJokes.has(joke.id)) {
          seenJokes.add(joke.id);
          jokesArray.push({ ...joke, votes: 0 });
        } else {
          console.log("duplicate found!");
        }
      }
      setJokes(jokesArray);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  //   /* change vote for this id by delta (+1 or -1) */
  const updateVote = (id, newVote) => {
    let update = jokes.map((j) =>
      j.id === id ? { ...j, votes: j.votes + newVote } : j
    );
    setJokes(update);
  };

  //   /* render: either loading spinner or list of sorted jokes. */
  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="JokeList">
          <button className="JokeList-getmore" onClick={generateNewJokes}>
            Get New Jokes
          </button>
          {jokes.map((j) => (
            <Joke
              key={j.id}
              id={j.id}
              text={j.joke}
              votes={j.votes}
              updateVote={updateVote}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default JokeList;
