import React from 'react'
import LoginForm from '../auth/LoginForm';

import evernote_logo from './evernote_logo.png';
import evernote_screen from './evernote_screen.png';
import quote from './homepage-quote.svg';

export default function Splash() {
  return (
    <div className="splash-wrapper">

        <header>

            <div className="splash-logo">
                <span>Note Pile</span>
                    <img src={evernote_logo} id="logo" alt="Evernote logo" />
            </div>

            <div>
                <button className="login-button">Login</button>
            </div>
            <div>
                <button className="demo">Demo User</button>
            </div>

        </header>

        <body>
            <h1>Tame your work, organize your life</h1>
            <h2>
                Remember everything and accomplish anything with the best notes app for tackling projects.
                <br />
                Keep your notes, tasks, and schedule all in one place.
            </h2>

            <button className="green-button">Sign up for free</button>
            <p>Already have an account? Log-in</p>

            <div>
                <img src={evernote_screen} alt="wow the functionality" />
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
        </body>



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










    </div>



  )
}