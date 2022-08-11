import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import { login } from "../../store/session";
import evernote_logo from './evernote_logo.png';
import evernote_screen from './evernote_screen.png';
import quote from './homepage-quote.svg';

import './Splash.css';

export default function Splash() {

    const user = useSelector(state => state.session.user);

    const history = useHistory();
    const dispatch = useDispatch();

    const handleDemo = async () => {
        await dispatch(login("demo@aa.io", "password"));
        history.push('/home');
    }

  return (
    <div className="splash-wrapper">

        <header className="splash-header">
            {user ?
            <Link to="home" style={{color: "black"}}>
                <div className="splash-logo">
                    <img src={evernote_logo} id="logo" alt="Evernote logo" />
                    <span id="logo-text">Note Pile</span>
                </div>
            </Link> :
            <div className="splash-logo">
                <img src={evernote_logo} id="logo" alt="Evernote logo" />
                <span id="logo-text">Note Pile</span>
            </div>}

            <div id="contain-buttons">
                <div>
                <Link to="/login"><button className="login-button">Login</button></Link>
                </div>
                <div>
                    <button className="demo" onClick={handleDemo}>Demo User</button>
                </div>
            </div>

        </header>

        <div className="body">
            <h1>Tame your work, organize your life</h1>
            <h2>
                Remember everything and accomplish anything with the best notes app for tackling projects.
                <br />
                Keep your notes, tasks, and schedule all in one place.
            </h2>

            <button className="green-button sign-up">Sign up for free</button>
            <Link to="/login"><p>Already have an account? Log in</p></Link>

            <div className="cool-work-section">
                <img src={evernote_screen} id="evernote_screen" alt="wow the functionality" />
                <div id="right-of-display">
                    <h3>WORK ANYWHERE</h3>
                    <p>
                        Keep important info handy—your notes sync automatically to all your devices.
                    </p>
                    <h3>REMEMBER EVERYTHING</h3>
                    <p>
                        Make notes more useful by adding text, images, audio, scans, PDFs, and documents.
                    </p>
                    <h3>TURN TO-DO INTO DONE</h3>
                    <p>
                        Bring your notes, tasks, and schedules together to get things done more easily.
                    </p>
                    <h3>FIND THINGS FAST</h3>
                    <p>
                        Get what you need, when you need it with powerful, flexible search capabilities.
                    </p>
                </div>
            </div>

        </div>


{/*
        <div className="logo-carousel ">

          <div className="top-image">
            <img src={quote} alt="quote" />
          </div>

          <div className="logo-carousel-group">
            <blockquote className="logo-carousel-quote"></blockquote>
            <blockquote className="logo-carousel-company"></blockquote>
          </div>

          <div className="logo-carousel-wrapper">
            <div className="logo-slides">

                  <div className="logo">
                  Note Pile is a powerful tool that can help executives, entrepreneurs and creative people capture and arrange their ideas. All you have to do is use it."
                  </div>

                  <div className="logo">
                  "Note Pile is a powerful tool for managing your tasks right alongside all of the information you work with every day."
                  </div>

                  <div className="logo">
                  "It feels like there are endless ways to use Note Pile… Use it for school, work, life, and beyond."
                  </div>

                  <div className="logo">
                  "A few years ago, after my computer broke down and I lost all of the notes I had saved to my desktop, I finally decided to embrace the cloud and download Note Pile. Since then, I haven’t looked back."
                  </div>

                  <div className="logo">
                  "You can even send emails to Note Pile and gather all of the things you need in a single place."
                  </div>

                  <div className="logo">
                  "Consider Note Pile to be your go-to hub for not just to-do lists but all of your notes. The organizational possibilities are expansive, and everything syncs across all of your devices that have the app enabled, so you’ll never miss a beat."
                  </div>

            </div>
          </div>
          <ul className="logo-carousel-dots">

                <li className="active"></li>

                <li></li>

                <li></li>

                <li></li>

                <li></li>

                <li></li>

          </ul>

  </div>
 */}
        <footer className="splash-footer">
            <p>Clone of Evernote by Krista Strucke</p>
            <div className="links">
                <a href="https://github.com/kurikurichan" target="_blank">
                    <i className="fa-brands fa-github"></i>
                </a>
                <a
                    href="https://www.linkedin.com/in/krista-strucke-044b3369/"
                    target="_blank"
                >
                    <i className="fa-brands fa-linkedin-in"></i>
                </a>
                <a href="mailto:developerkrista@gmail.com">
                    <i className="fa-solid fa-envelope"></i>
                </a>
            </div>
        </footer>

    </div>

  )
}
