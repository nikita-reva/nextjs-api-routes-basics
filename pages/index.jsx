import Link from 'next/link';
import React, { useRef, useState } from 'react';

function Home() {
  const [loadedFeedback, setLoadedFeedback] = useState([]);
  const emailInputRef = useRef();
  const feedbackInputRef = useRef();

  function submitFormHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredFeedback = feedbackInputRef.current.value;

    const reqBody = { email: enteredEmail, text: enteredFeedback };

    fetch('/api/feedback', {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  function loadFeedbackHandler() {
    fetch('/api/feedback')
      .then((response) => response.json())
      .then((data) => {
        setLoadedFeedback(data.feedback);
      });
  }

  return (
    <div>
      <h1>The Home Page</h1>
      <form onSubmit={(event) => submitFormHandler(event)}>
        <div>
          <label htmlFor="email">Your Email Address</label>
          <input type="email" id="email" ref={emailInputRef} />
        </div>
        <div>
          <label htmlFor="feedback">Your Feedback</label>
          <textarea id="feedback" rows="5" ref={feedbackInputRef} />
        </div>
        <button type="submit">Send Feedback</button>
      </form>
      <hr />
      <button onClick={loadFeedbackHandler}>LoadFeedback</button>
      <ul>
        {loadedFeedback?.map((item, index) => (
          <li key={index}>
            <p>{item.id}</p>
            <p>{item.email}</p>
            <p>{item.text}</p>
          </li>
        ))}
      </ul>
      <Link href="/feedback" passHref>
        <a>Go to Feedback Page</a>
      </Link>
    </div>
  );
}

export default Home;
