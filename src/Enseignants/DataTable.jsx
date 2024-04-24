import React, { useState } from "react";
import "./DataTable.css";
import FIcon from "/filter.svg";
import SearchIcon from "/search.svg";

const fakeData = [
  { id: 1, numCompte: "ABC123", nomPrenom: "John Doe", grade: "MCA" },
  { id: 2, numCompte: "DEF456", nomPrenom: "Jane Doe", grade: "MCB" },
  { id: 3, numCompte: "GHI789", nomPrenom: "Alice Smith", grade: "MCA" },
  { id: 4, numCompte: "ABC123", nomPrenom: "John Doe", grade: "Professeur" },
  { id: 5, numCompte: "DEF456", nomPrenom: "Jane Doe", grade: "MCA" },
  { id: 6, numCompte: "GHI789", nomPrenom: "Alice Smith", grade: "MCB" },
  { id: 7, numCompte: "ABC123", nomPrenom: "John Doe", grade: "MCA" },
  { id: 8, numCompte: "DEF456", nomPrenom: "Jane Doe", grade: "MCB" },
  { id: 9, numCompte: "GHI789", nomPrenom: "Alice Smith", grade: "MCB" },
  { id: 10, numCompte: "ABC123", nomPrenom: "John Doe", grade: "MCA" },
  { id: 11, numCompte: "DEF456", nomPrenom: "Jane Doe", grade: "MCB" },
  { id: 12, numCompte: "GHI789", nomPrenom: "Alice Smith", grade: "MCB" },
  { id: 13, numCompte: "ABC123", nomPrenom: "John Doe", grade: "Professeur" },
  { id: 14, numCompte: "DEF456", nomPrenom: "Jane Doe", grade: "MCA" },
  { id: 15, numCompte: "GHI789", nomPrenom: "Alice Smith", grade: "MCB" },
  { id: 16, numCompte: "ABC123", nomPrenom: "John Doe", grade: "MCA" },
  { id: 17, numCompte: "DEF456", nomPrenom: "Jane Doe", grade: "MCB" },
  {
    id: 18,
    numCompte: "GHI789",
    nomPrenom: "Alice Smith",
    grade: "Professeur",
  },
  { id: 19, numCompte: "ABC123", nomPrenom: "John Doe", grade: "MCB" },
  { id: 20, numCompte: "DEF456", nomPrenom: "Jane Doe", grade: "MCA" },
  {
    id: 21,
    numCompte: "GHI789",
    nomPrenom: "Alice Smith",
    grade: "Professeur",
  },
  // Add more fake data as needed
];

const FilterButton = ({ name, options, onFilter, onCancel, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionClick = (option) => {
    if (option === "Cancel") {
      setSelectedOption("");
      setIsOpen(false);
      onCancel();
    } else {
      setSelectedOption(option);
      onFilter(option);
    }
  };

  return (
    <div className="filter-container">
      <div
        className={`GFilter ${className}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "⌃" : "⌄"} {name}{" "}
      </div>
      <div
        className="filter-options"
        style={{ display: isOpen ? "block" : "none" }}
      >
        {options.map((option, index) => (
          <div key={index} onClick={() => handleOptionClick(option)}>
            {option}
          </div>
        ))}
        <div
          onClick={() => handleOptionClick("Cancel")}
          className="cancel-option"
        >
          ☒
        </div>
      </div>
    </div>
  );
};

function DataTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [filterOpen, setFilterOpen] = useState(false);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setSelectedFilter(null); // Reset selected filter when searching
  };

  const handleFilter = (filter) => {
    setSelectedFilter(filter);
    setSearchTerm("");
  };

  const handleCancel = () => {
    setSelectedFilter(null);
  };

  const filteredData = fakeData.filter((item) => {
    if (selectedFilter) {
      return item.grade.toLowerCase() === selectedFilter.toLowerCase();
    } else {
      return (
        item.id.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.numCompte.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.nomPrenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.grade.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  });

  return (
    <div className="Whole">
      <div className="Bandd">
        <p className="ens">All Profiles</p>
        <div className="line"></div>
        <div className="filtB">
          <div className="filtH" onClick={() => setFilterOpen(!filterOpen)}>
            <img src={FIcon} alt="filter icon" style={{ margin: "2px" }} />
            Filter
          </div>
          {filterOpen && (
            <div
              className="filter"
              style={{ display: filterOpen ? "block" : "none" }}
            >
              <div className="inside-filter">
                <FilterButton
                  name="Specialite"
                  options={["MCA", "MCB", "Professeur"]}
                  onFilter={handleFilter}
                  onCancel={handleCancel}
                  className="custom-filter-button"
                />
                <FilterButton
                  name="Cycle"
                  options={["MCA", "MCB", "Professeur"]}
                  onFilter={handleFilter}
                  onCancel={handleCancel}
                  className="custom-filter-button"
                />
                <FilterButton
                  name="Promo"
                  options={["MCA", "MCB", "Professeur"]}
                  onFilter={handleFilter}
                  onCancel={handleCancel}
                  className="custom-filter-button"
                />
              </div>
              <div className="inside-filter">
                <FilterButton
                  name="Groupe"
                  options={["MCA", "MCB", "Professeur"]}
                  onFilter={handleFilter}
                  onCancel={handleCancel}
                  className="custom-filter-button"
                />
                <FilterButton
                  name="Section"
                  options={["MCA", "MCB", "Professeur"]}
                  onFilter={handleFilter}
                  onCancel={handleCancel}
                  className="custom-filter-button"
                />
                <FilterButton
                  name="Grade"
                  options={["MCA", "MCB", "Professeur"]}
                  onFilter={handleFilter}
                  onCancel={handleCancel}
                  className="custom-filter-button"
                />
              </div>
            </div>
          )}
        </div>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by anything ..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
          <span className="search-icon">
            <img src={SearchIcon} alt="search icon" />
          </span>
        </div>
      </div>
      <div className="data-table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Num</th>
              <th>Num Compte</th>
              <th>Nom & Prenom</th>
              <th>Grade</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="data-table-body">
            {filteredData.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.numCompte}</td>
                <td>{item.nomPrenom}</td>
                <td>{item.grade}</td>
                <td>
                  <a
                    href="#"
                    style={{
                      color: "rgba(0, 0, 0, 0.25)",
                      textDecoration: "none",
                    }}
                  >
                    voir plus &gt;
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataTable;
