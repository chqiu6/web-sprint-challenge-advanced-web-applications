import React, { useState } from "react";
import axios from "axios";
import {axiosWithAuth} from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log("ColorList passed down ? ",colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  // put colors /api/colors/:id
  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?

    //thinking of using if else statement here 
    axiosWithAuth()
    .put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)
    .then(res => {
      console.log("Color list component put request to save updated color :", res.data);
      colorToEdit.map(coloritem =>{
        if(coloritem.id === res.data.id){
          return res;
        }else {
         console.log("we've failed our put mapping :(");
        }
      })
      console.log("lets see our colorToEdit :", colorToEdit);

    })
    .catch(err => {
      console.log("put request to save updated color failed ! We're almost there : ", err);
    });
  };

  // delete colors /api/colors/:id
  //thinking of using a filter as a way to delete our colors 
  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth()
    .delete(`http://localhost:5000/api/colors/${colorToEdit.id}`)
    .then(res => {
      console.log("delete request to delete specified color success ! or did it ?:", colorToEdit);
      // colorToEdit.filter(coloritem => {
      //   coloritem.id !== colors.id
      // })
    })
    .catch(err =>{ 
      console.log("our delete request has failed : ", err);
    });
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
