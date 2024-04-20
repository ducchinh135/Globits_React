import React, { useState, useEffect } from "react";
import countryData from "../CountryData";
import { MdAdd, MdDelete, MdEdit } from "react-icons/md";
import { useFormik } from "formik";
import * as Yup from "yup";

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [editingCountry, setEditingCountry] = useState(null);
  const [deletingCountry, setDeletingCountry] = useState(null);
  const [addingCountry, setAddingCountry] = useState(false);
  const newCountry = useFormik({
    initialValues: {
      id: "",
      name: "",
      code: "",
      description: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      code: Yup.string().required("Required"),
      description: Yup.string().required("Required"),
    }),
    onSubmit: (values, { resetForm }) => {
      const updatedCountries = [
        ...countries,
        {
          id: countries.length + 1,
          name: values.name,
          code: values.code,
          description: values.description,
        },
      ];
      setCountries(updatedCountries);
      setAddingCountry(false);
      resetForm();
    },
  });

  useEffect(() => {
    setCountries(countryData);
  }, []);

  const handleEditClick = (country) => {
    setEditingCountry(country);
  };

  const handleDeleteClick = (country) => {
    setDeletingCountry(country);
  };

  const handleConfirmDelete = () => {
    const updatedCountries = countries.filter(
      (country) => country !== deletingCountry
    );
    setCountries(updatedCountries);
    setDeletingCountry(null);
  };

  const handleAddNewClick = () => {
    setAddingCountry(true);
  };

  const handleSaveEditedCountry = () => {
    const updatedCountries = countries.map((country) => {
      if (country.id === editingCountry.id) {
        return { ...editingCountry };
      }
      return country;
    });
    setCountries(updatedCountries);
    setEditingCountry(null);
  };

  return (
    <div className="country">
      <h2 className="country_title">Countries</h2>
      <button className="country_btn_add" onClick={handleAddNewClick}>
        <MdAdd />
        <span>Add new Country</span>
      </button>
      <table className="country_table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Code</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {countries.map((country, index) => (
            <tr key={index}>
              <td>{country.name}</td>
              <td>{country.code}</td>
              <td>{country.description}</td>
              <td>
                <button
                  className="country_btn_edit"
                  onClick={() => handleEditClick(country)}>
                  <MdEdit />
                  <span>Edit</span>
                </button>
                <button
                  className="country_btn_delete"
                  onClick={() => handleDeleteClick(country)}>
                  <MdDelete />
                  <span>Delete</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {addingCountry && (
        <div>
          <div className="overlay"></div>
          <form className="popup" onSubmit={newCountry.handleSubmit}>
            <h3>Add New Country</h3>
            <div className="popup_content">
              <label>Name:</label>
              <input
                type="text"
                id="name"
                value={newCountry.values.name}
                onChange={newCountry.handleChange}
              />
              {newCountry.errors.name && (
                <p className="errorsMsg">{newCountry.errors.name}</p>
              )}
              <label>Code:</label>
              <input
                type="text"
                id="code"
                value={newCountry.values.code}
                onChange={newCountry.handleChange}
              />
              {newCountry.errors.code && (
                <p className="errorsMsg">{newCountry.errors.code}</p>
              )}
              <label>Description:</label>
              <input
                type="text"
                id="description"
                value={newCountry.values.description}
                onChange={newCountry.handleChange}
              />
              {newCountry.errors.description && (
                <p className="errorsMsg">{newCountry.errors.description}</p>
              )}
            </div>
            <button className="country_btn_save" type="submit">
              Save
            </button>
            <button
              className="country_btn_cancel"
              onClick={() => {
                setAddingCountry(null);
                newCountry.resetForm();
              }}>
              Cancel
            </button>
          </form>
        </div>
      )}

      {editingCountry && (
        <div>
          <div className="overlay"></div>
          <form className="popup">
            <h3>Edit Country</h3>
            <div className="popup_content">
              <label>Name:</label>
              <input
                type="text"
                value={editingCountry.name}
                onChange={(e) =>
                  setEditingCountry({ ...editingCountry, name: e.target.value })
                }
              />
              <label>Code:</label>
              <input
                type="text"
                value={editingCountry.code}
                onChange={(e) =>
                  setEditingCountry({ ...editingCountry, code: e.target.value })
                }
              />
              <label>Description:</label>
              <input
                type="text"
                value={editingCountry.description}
                onChange={(e) =>
                  setEditingCountry({
                    ...editingCountry,
                    description: e.target.value,
                  })
                }></input>
            </div>
            <button
              className="country_btn_save"
              onClick={handleSaveEditedCountry}>
              Save
            </button>
            <button
              className="country_btn_cancel"
              onClick={() => setEditingCountry(null)}>
              Cancel
            </button>
          </form>
        </div>
      )}

      {deletingCountry && (
        <div>
          <div className="overlay"></div>
          <div className="popup">
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete {deletingCountry.name}?</p>
            <button className="country_btn_save" onClick={handleConfirmDelete}>
              Confirm
            </button>
            <button
              className="country_btn_cancel"
              onClick={() => setDeletingCountry(null)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Countries;
