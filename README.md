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

<img width="1248" alt="Screen Shot 2022-09-12 at 12 28 42 AM" src="https://user-images.githubusercontent.com/8907997/189597557-f3ae8f40-17ce-46b5-a918-db83e65115e2.png">

# Login page

 <img width="1365" alt="Screen Shot 2022-09-12 at 12 28 52 AM" src="https://user-images.githubusercontent.com/8907997/189597611-6adaccf1-a7f8-41ca-8e71-50b7a1f8f127.png">

# Home Page

<img width="1433" alt="Screen Shot 2022-09-12 at 12 30 55 AM" src="https://user-images.githubusercontent.com/8907997/189597679-de0cbc71-5d7a-4d74-928d-b48db96084fc.png">

# Viewing a notebook

<img width="1440" alt="Screen Shot 2022-09-12 at 12 32 16 AM" src="https://user-images.githubusercontent.com/8907997/189597731-fef859b0-28d4-4cb4-b245-86349aca144d.png">

# Code snippet

Something I did that I found cool was create a "save" button that changes depending on whether the user is in the page, saving the page, or the page has been saved.

```javascript
<button
  className={`green-button save ${
    save === "Saving" ? "loading" : save === "Saved" ? "disabled" : ""
  }`}
  onClick={handleBlur}
>
  {save}
  {save === "Saved" && (
    <i
      className="fa-solid fa-check in-save-icon"
      style={{ color: "rgb(214, 255, 225)" }}
    ></i>
  )}
</button>
```

I did this by using a ternary if/if else/else operator on the classname based on the local state. I also had a "Save" useState effect, and then change that state in my saving function at different points, that is called whenever the page's textarea becomes out of focus, or the save button is otherwise pressed.

How to run Note Pile locally:

- Clone this repository: https://github.com/kurikurichan/Note-Pile
- Create a database user
- Create a database with your user as its owner
- Run `pipenv install` in the project root directory
- Add a .env file to the root directory following the .env example file format
- cd into the react-app directory and run npm install
- create a .env file in this folder and add `REACT_APP_BASE_URL=http://localhost:5000` to it
- run `npm start`
- run `pipenv shell` in the root directory
- run database with `flask db migrate`, `flask db upgrade`, `flask seed all`

## Future Features

- AWS
- Notebook display page
- Drawing
