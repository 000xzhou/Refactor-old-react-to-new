import "../Joke.css";

/** A single joke, along with vote up/down buttons. */

const Joke = ({ id, votes, updateVote, text }) => {
  return (
    <div>
      <div className="Joke" id={id}>
        <div className="Joke-votearea">
          <button onClick={() => updateVote(id, 1)}>
            <i className="fas fa-thumbs-up" />
          </button>

          <button onClick={() => updateVote(id, -1)}>
            <i className="fas fa-thumbs-down" />
          </button>

          {votes}
        </div>

        <div className="Joke-text">{text}</div>
      </div>
    </div>
  );
};

export default Joke;
