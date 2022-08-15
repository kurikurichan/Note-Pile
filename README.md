# Note Pile 🍃

Check out a live version of Note Pile here: [Note Pile Live](https://note-pile.herokuapp.com/)

Note Pile is a full-stack clone of the popular website Evernote, which is used for keeping text notes and other data. In Note Pile you can maintain notebooks, and write whatever you want inside!

## Technologies used

### Frontend
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)

### Backend
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)
![Flask](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

# Landing page

![Screen Shot 2022-08-14 at 11 48 20 PM](https://user-images.githubusercontent.com/8907997/184591463-f11747d2-0abf-4ded-84b4-2dfcadd48375.png)

# Login page
 
![Screen Shot 2022-08-14 at 11 48 32 PM](https://user-images.githubusercontent.com/8907997/184591937-336b0238-4afc-4ca5-a146-df590d20e875.png)

# Home Page

![Screen Shot 2022-08-15 at 12 35 12 AM](https://user-images.githubusercontent.com/8907997/184594769-8814c602-bb7d-4e24-8160-332f7fd0642b.png)

# Viewing a notebook

![Screen Shot 2022-08-14 at 11 55 43 PM](https://user-images.githubusercontent.com/8907997/184591990-872ebb6e-6fee-428a-a6fe-777864f4305a.png)

# Code snippet

Something I did that I found cool was create a "save" button that changes depending on whether the user is in the page, saving the page, or the page has been saved.
```javascript
 <button
     className={`green-button save ${save === "Saving" ? 'loading' : save === "Saved" ? 'disabled' : ''}`}
     onClick={handleBlur}
 >
     {save}
     {save === "Saved" && <i className="fa-solid fa-check in-save-icon" style={{color: 'rgb(214, 255, 225)'}}></i>}
 </button>
```
I did this by using a ternary if/if else/else operator on the classname based on the local state. I also had a "Save" useState effect, and then change that state in my saving function at different points, that is called whenever the page's textarea becomes out of focus, or the save button is otherwise pressed.

How to run Note Pile locally:

* Clone this repository: https://github.com/kurikurichan/Note-Pile
* Create a database user
* Create a database with your user as its owner
* Run ```pipenv install``` in the project root directory
* Add a .env file to the root directory following the .env example file format
* cd into the react-app directory and run npm install
* create a .env file in this folder and add ```REACT_APP_BASE_URL=http://localhost:5000``` to it
* run ```pipenv shell``` in the root directory 
* run database with ```flask db migrate```,  ```flask db upgrade```,  ```flask seed all```
* cd into the react-app folder and run ```npm start```

## Future Features
* Rich text editor
* Scratch pad
* Notebook display page
* Drawing
