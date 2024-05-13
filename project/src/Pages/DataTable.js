import React, { useEffect, useState, useRef } from "react";
import "../Styles/Enseignants.css";
import FIcon from "../Assets/filter.svg";
import SearchIcon from "../Assets/search.svg";
import axios from "axios";
import { Link } from 'react-router-dom';



const FilterButton = ({ name, options, FilterCategory, onFilter, onCancel, className, onFilter2 }) => {
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
            onFilter2(option);
        }
    };

    return (
        <div className="filter-container">
            <div
                className={`GFilter ${className}`}
                onClick={() => { setIsOpen(!isOpen); FilterCategory() }}
            >
                {isOpen ? "⌃" : "⌄"} {name}{" "}
            </div>
            <div
                className="filter-options"
                style={{ display: isOpen ? "block" : "none" }}
            >
                {options.map((option, index) => (
                    <div key={index} value={option.value} onClick={() => handleOptionClick(option.value)}>
                        {option.content}
                    </div>
                ))}
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

    const [category, setCategory] = useState(null);

    const handleCategory = (category) => {
        setCategory(category);
    }

    const handleFilter = (filter) => {
        setSelectedFilter(filter);
        setSearchTerm("");
    };

    const handleCancel = () => {
        setSelectedFilter(null);
    };

    const [enseignants, setEnseignants] = useState([]);


    useEffect(() => {
        const fetchEnseignants = async () => {
            try {
                // Récupérer la liste des enseignants
                const response = await axios.get('http://127.0.0.1:8000/Administration/teachers');
                const enseignantsData = response.data;

                // Parcourir la liste des enseignants pour récupérer les informations supplémentaires
                const enseignantsAvecInfos = await Promise.all(
                    enseignantsData.map(async (enseignant) => {
                        const infosResponse = await axios.get(`http://127.0.0.1:8000/Administration/teachinfos/${enseignant.Matricule}/`);
                        const infos = infosResponse.data;
                        return { ...enseignant, ...infos };
                    })
                );

                // Mettre à jour le state avec les enseignants et leurs informations
                setEnseignants(enseignantsAvecInfos);
            } catch (error) {
                console.error('Erreur lors de la récupération des enseignants :', error);
            }
        };
        fetchEnseignants();
    }, []);

    const [groupes, setGroupes] = useState([]);

    useEffect(() => {

        axios.get('http://127.0.0.1:8000/Administration/groupes')
            .then((res) => {
                setGroupes(res.data)
            })
            .catch((err) => { console.log(err) })

    }, []);


    // Create options array using constructor function
    const groupesList = groupes.map(({ idGroupe: value, Numero: content }) => ({ value: value.toString(), content }));

    const [sections, setSections] = useState([]);

    useEffect(() => {

        axios.get('http://127.0.0.1:8000/Administration/sections')
            .then((res) => {
                setSections(res.data)
            })
            .catch((err) => { console.log(err) })

    }, []);

    const [selectedPromo, setSelectedPromo] = useState(null);

    const handleFilter2 = (promo) => {
        setSelectedPromo(promo)
    }

    const filteredSections = sections.filter((section) => section.nomP === selectedPromo);

    const sectionsList = filteredSections.map(({ idSection: value, NomSection: content }) => ({ value: value.toString(), content }));

    console.log(sectionsList)

    const filteredData = enseignants.filter((item) => {
        if (selectedFilter) {
            if (selectedFilter === "Préparatoire") {
                return (item.modules &&
                    item.modules.some((module) => module.nomP === '1CPI' || module.nomP === '2CPI')
                )
            } else if (selectedFilter === "Superieure") {
                return (item.modules &&
                    item.modules.some((module) => module.nomP === '1CS' || module.nomP === '2CS' || module.nomP === "3CS")
                )
            } else {
                return (
                    item.teacher.Grade.toLowerCase() === selectedFilter.toLowerCase() ||
                    (item.modules && item.modules.some((module) => module.nomP === selectedFilter)) ||
                    (category === 'Groupe' && item.seances.some((seance) => seance.idGroupe == selectedFilter)) ||
                    (category === 'Sections' && item.seances.some((seance) => seance.idSection == selectedFilter))
                );
            }

        } else {
            return (
                item.teacher.Matricule.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.teacher.Nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.teacher.Prénom.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
    });

    const filterRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (filterRef.current && !filterRef.current.contains(event.target)) {
                setFilterOpen(false);
                setSelectedFilter(null)
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [filterRef]);


    return (
        <div className="main-container dynamic-container Whole">
            <div className="Bandd">
                <p className="ens">All Profiles</p>
                <div className="filtrage-container" ref={filterRef}>
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
                                        name="Grade"
                                        options={
                                            [
                                                {
                                                    content: 'Professor',
                                                    value: 'Professor'
                                                },
                                                {
                                                    content: 'MCA',
                                                    value: 'MCA'
                                                },
                                                {
                                                    content: 'MCB',
                                                    value: 'MCB'
                                                },
                                                {
                                                    content: 'MCB',
                                                    value: 'MCB'
                                                },
                                                {
                                                    content: 'MAA',
                                                    value: 'MAA'
                                                },
                                                {
                                                    content: 'MAB',
                                                    value: 'MAB'
                                                },
                                            ]
                                        }
                                        FilterCategory={() => handleCategory('Grade')}
                                        onFilter={handleFilter}
                                        onFilter2={() => console.log("there is no filters")}
                                        onCancel={handleCancel}
                                        className="custom-filter-button"
                                    />

                                    <FilterButton
                                        name="Cycle"
                                        options={
                                            [
                                                {
                                                    content: 'Préparatoire',
                                                    value: 'Préparatoire'
                                                },
                                                {
                                                    content: 'Superieure',
                                                    value: 'Superieure'
                                                }
                                            ]
                                        }
                                        FilterCategory={() => handleCategory('Cycle')}
                                        onFilter={handleFilter}
                                        onFilter2={() => console.log("there is no filters")}
                                        onCancel={handleCancel}
                                        className="custom-filter-button"
                                    />

                                    <FilterButton
                                        name="Groupe"
                                        options={groupesList}
                                        FilterCategory={() => handleCategory('Groupe')}
                                        onFilter={handleFilter}
                                        onFilter2={() => console.log("there is no filters")}
                                        onCancel={handleCancel}
                                        className="custom-filter-button"
                                    />

                                </div>
                                <div className="inside-filter">

                                    <FilterButton
                                        name="Promo"
                                        options={
                                            [
                                                {
                                                    content: '1CPI',
                                                    value: '1CPI'
                                                },
                                                {
                                                    content: '2CPI',
                                                    value: '2CPI'
                                                },
                                                {
                                                    content: '1CS',
                                                    value: '1CS'
                                                },
                                                {
                                                    content: '2CS',
                                                    value: '2CS'
                                                },
                                                {
                                                    content: '3CS',
                                                    value: '3CS'
                                                },
                                            ]
                                        }
                                        FilterCategory={() => handleCategory('Promo')}
                                        onFilter={handleFilter}
                                        onFilter2={handleFilter2}
                                        onCancel={handleCancel}
                                        className="custom-filter-button"
                                    />
                                    <FilterButton
                                        name="Specialite"
                                        options={["SIW", "ISI", "IASD"]}
                                        FilterCategory={() => handleCategory('Specialite')}
                                        onFilter={handleFilter}
                                        onFilter2={() => console.log("there is no filters")}
                                        onCancel={handleCancel}
                                        className="custom-filter-button"
                                    />
                                    <FilterButton
                                        name="Section"
                                        options={sectionsList}
                                        FilterCategory={() => handleCategory('Sections')}
                                        onFilter={handleFilter}
                                        onCancel={handleCancel}
                                        onFilter2={() => console.log("there is no filters")}
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
                    <button className="ajouter-btn">Ajouter</button>
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
                        {filteredData.map((enseignant, index) => (
                            <tr>
                                <td>{index + 1}</td>
                                <td style={{ textTransform: 'uppercase' }}>{enseignant.teacher.Matricule}</td>
                                <td style={{ textTransform: 'capitalize' }}>{enseignant.teacher.Nom} {enseignant.Prénom}</td>
                                <td style={{ textTransform: 'capitalize' }}>{enseignant.teacher.Grade}</td>
                                <td>
                                    <Link
                                        to={`/admin/enseignants/${enseignant.Matricule}`}
                                        style={{
                                            color: "rgba(0, 0, 0, 0.25)",
                                            textDecoration: "none",
                                        }}
                                    >
                                        voir plus &gt;
                                    </Link>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Ajouter />

        </div>
    );
}

export default DataTable;

//---------Ajouter Interfaces-------------

const Ajouter = () => {

    const [step, setStep] = useState(1);

    const handleChange = () => {
        setStep(step + 1)
    };

    const btns = [
        {
            title: 'enseignant',
            component: <AjouterEnseignant />
        },
        {
            title: 'module',
            component: <AjouterModule />
        },
        {
            title: 'section',
            component: <AjouterSection />
        },
        {
            title: 'groupe',
            component: <AjouterGroupe />
        },
        {
            title: 'spécialité',
            component: <AjouterSpecialite />
        },
        {
            title: 'salle',
            component: <AjouterSalle />
        },
    ]

    const [btnClicked, setBtnClicked] = useState(0);

    const toggle = (index) => {
        setBtnClicked(index === btnClicked ? null : index);
    }

    return (
        <div className="ajouter-container">
            <div className="progress-bar">
                <div className="progress-part" style={{ borderRadius: '4px', width: '50%', backgroundColor: step >= 1 ? 'transparent' : '#00000020' }}>
                    <span style={{ width: step >= 1 ? '100%' : '0px' }}></span>
                </div>
                <div className="progress-part" style={{ borderRadius: '4px', width: '50%', backgroundColor: step >= 2 ? 'transparent' : '#00000020' }}>
                    <span style={{ width: step >= 2 ? '100%' : '0px' }}></span>
                </div>
            </div>
            {step === 1 &&
                <>
                    <h2 style={{ marginTop: '1.5rem' }}>Vous velez ajouter ..</h2>
                    <div className="buttons-container">
                        <div className="buttons-container-content">
                            {btns.map((btn, index) => (
                                <button className={index === btnClicked ? 'clicked' : null} onClick={() => toggle(index)}>
                                    <img src='../../image.png' style={{ width: '12px', height: '12px' }} className={btnClicked === index ? 'appear' : null} />
                                    {btn.title}
                                </button>
                            ))}
                        </div>
                        <div className="sauvegarder-container">
                            <button onClick={() => handleChange()}>suivant</button>
                        </div>
                    </div>
                </>
            }

            {step === 2 &&
                btns[btnClicked].component
            }
        </div>
    )
}

const AjouterEnseignant = () => {

    const formRef = useRef(null);

    useEffect(() => {
        function adjustFormHeight() {
            const container = document.querySelector('.ajouter-container');
            const barElement = container.querySelector('.progress-bar');
            const titleElement = container.querySelector('.ajouter-enseignant-title');

            const barAndtitleHeight = barElement.getBoundingClientRect().height +
                titleElement.getBoundingClientRect().height;
            const containerHeight = container.getBoundingClientRect().height;
            const remainingHeight = containerHeight - barAndtitleHeight;
            formRef.current.style.height = `${remainingHeight}px`;
        }

        window.addEventListener('resize', adjustFormHeight);
        adjustFormHeight(); // Adjust height initially

        return () => {
            window.removeEventListener('resize', adjustFormHeight);
        };
    }, []);

    return (
        <>
            <h2 className="ajouter-enseignant-title" style={{ textTransform: 'capitalize' }}>Ajouter enseignant</h2>
            <form ref={formRef} className="ajouter-enseignant-form">
                <div className="input-line">
                    <label htmlFor="mat">matricule</label>
                    <input
                        style={{ textTransform: 'uppercase' }}
                        type="text"
                    />
                </div>
                <div className="input-line">
                    <label htmlFor="nom">nom</label>
                    <input
                        style={{ textTransform: 'capitalize' }}
                        type="text"
                    />
                </div>
                <div className="input-line">
                    <label htmlFor="prenom">prénom</label>
                    <input
                        style={{ textTransform: 'capitalize' }}
                        type="text"
                    />
                </div>
                <div className="input-line">
                    <label htmlFor="dateNaissance">date naissance</label>
                    <input
                        style={{ textTransform: 'lowercase' }}
                    />
                </div>
                <div className="input-line">
                    <label htmlFor="adresse">adresse</label>
                    <input
                        style={{ textTransform: 'lowercase' }}
                        type="text"
                    />
                </div>
                <div className="input-line">
                    <label htmlFor="email">email</label>
                    <input
                        style={{ textTransform: 'lowercase' }}
                        type="email"
                    />
                </div>
                <div className="input-line">
                    <label htmlFor="numTel">numero telephone</label>
                    <input
                        style={{ textTransform: 'lowercase' }}
                        type="text"
                    />
                </div>
                <div className="input-line">
                    <label htmlFor="grade">grade</label>
                    <select

                    >
                        <option value={"professeur"}>professeur</option>
                        <option value={"Professor"}>professor</option>
                        <option value={"MCA"}>MCA</option>
                        <option value={"MCB"}>MCB</option>
                        <option value={"maa"}>MAA</option>
                        <option value={"mab"}>MAB</option>
                    </select>
                </div>
                <div className="input-line">
                    <label htmlFor="fonction">grade</label>
                    <select
                    >
                        <option value={"Fonction1"}>Fonction1</option>
                        <option value={"Fonction2"}>Fonction2</option>
                    </select>
                </div>
                <div className="input-line">
                    <label htmlFor="etablissement">etablissement</label>
                    <input
                        style={{ textTransform: 'lowercase' }}
                        type="text"
                    />
                </div>
                <div className="input-line">
                    <label htmlFor="motPasse">mot de passe</label>
                    <input
                        style={{ textTransform: 'lowercase' }}
                        type="text"
                    />
                </div>
                <div className="ajouter-btns">
                    <button >Annuler</button>
                    <button className='sauvegarder-ajouter-btn'
                        type="submit"  > Sauvegarder</button>
                </div>
            </form>
        </>
    )
}

//----------ajouter module--------//

const AjouterModule = () => {
    return (
        <>
            <h2 style={{ textTransform: 'capitalize', margin: '0.5rem 0' }}>Ajouter module</h2>
            <form className="ajouter-module-form">
                <div className="input-line">
                    <label htmlFor="code">Code</label>
                    <input
                        style={{ textTransform: 'uppercase' }}
                        type="text"
                    />
                </div>
                <div className="input-line">
                    <label htmlFor="nomModule">nom module</label>
                    <input
                        style={{ textTransform: 'capitalize' }}
                        type="text"
                    />
                </div>
                <div className="input-line">
                    <label htmlFor="coeff">coéfficient</label>
                    <input
                        type="number"
                        min={1}
                        max={5}
                    />
                </div>
                <div className="input-line">
                    <label htmlFor="nbHeures">nombre heures</label>
                    <input
                        type="number"
                    />
                </div>
                <div className="input-line">
                    <label htmlFor="semestre">semestre</label>
                    <select>
                        <option value={"S1"}>S1</option>
                        <option value={"S2"}>S2</option>
                    </select>
                </div>
                <div className="input-line">
                    <label htmlFor="promo">promotion</label>
                    <select>
                        <option value={"1CPI"}>1CPI</option>
                        <option value={"2CPI"}>2CPI</option>
                        <option value={"1CS"}>1CS</option>
                        <option value={"2CS"}>2CS</option>
                        <option value={"3CS"}>3CS</option>
                    </select>
                </div>
                <div className="ajouter-btns">
                    <button >Annuler</button>
                    <button className='sauvegarder-ajouter-btn'
                        type="submit"  > Sauvegarder</button>
                </div>
            </form>
        </>
    )
}

//----------Ajouter Section--------------//

const AjouterSection = () => {
    return (
        <>
            <h2 style={{ textTransform: 'capitalize', margin: '1rem 0' }}>Ajouter Section</h2>
            <form className="ajouter-module-form">
                <div className="input-line">
                    <label htmlFor="nomSection">nom section</label>
                    <input
                        style={{ textTransform: 'uppercase' }}
                        type="text"
                    />
                </div>
                <div className="input-line">
                    <label htmlFor="promo">promotion</label>
                    <select>
                        <option value={"1CPI"}>1CPI</option>
                        <option value={"2CPI"}>2CPI</option>
                        <option value={"1CS"}>1CS</option>
                        <option value={"2CS"}>2CS</option>
                        <option value={"3CS"}>3CS</option>
                    </select>
                </div>
                <div className="ajouter-btns" style={{ margin: '1rem 0 1rem 0' }}>
                    <button >Annuler</button>
                    <button className='sauvegarder-ajouter-btn'
                        type="submit"  > Sauvegarder</button>
                </div>
            </form>
        </>
    )
}

//-----------Ajouter Groupe ------------

const AjouterGroupe = () => {
    return (
        <>
            <h2 style={{ textTransform: 'capitalize', margin: '1rem 0' }}>Ajouter groupe</h2>
            <form className="ajouter-module-form">
                <div className="input-line">
                    <label htmlFor="Numero">numero groupe</label>
                    <input
                        style={{ textTransform: 'uppercase' }}
                        type="text"
                    />
                </div>
                <div className="input-line">
                    <label htmlFor="promo">promotion</label>
                    <select>
                        <option value={"1CPI"}>1CPI</option>
                        <option value={"2CPI"}>2CPI</option>
                        <option value={"1CS"}>1CS</option>
                        <option value={"2CS"}>2CS</option>
                        <option value={"3CS"}>3CS</option>
                    </select>
                </div>
                <div className="input-line">
                    <label htmlFor="promo">section</label>
                    <select>
                        <option value={"1CPI"}>1CPI</option>
                        <option value={"2CPI"}>2CPI</option>
                        <option value={"1CS"}>1CS</option>
                        <option value={"2CS"}>2CS</option>
                        <option value={"3CS"}>3CS</option>
                    </select>
                </div>
                <div className="ajouter-btns" style={{ margin: '1rem 0 1rem 0' }}>
                    <button >Annuler</button>
                    <button className='sauvegarder-ajouter-btn'
                        type="submit"  > Sauvegarder</button>
                </div>
            </form>
        </>
    )
}

//----------Ajouter Specialite------------

const AjouterSpecialite = () => {
    return (
        <>
            <h2 style={{ textTransform: 'capitalize', margin: '1rem 0' }}>Ajouter spécialité</h2>
            <form className="ajouter-module-form">
                <div className="input-line">
                    <label htmlFor="nomSpec">nom spécialité</label>
                    <input
                        style={{ textTransform: 'uppercase' }}
                        type="text"
                    />
                </div>
                <div className="ajouter-btns" style={{ margin: '1rem 0 1rem 0' }}>
                    <button >Annuler</button>
                    <button className='sauvegarder-ajouter-btn'
                        type="submit"  > Sauvegarder</button>
                </div>
            </form>
        </>
    )
}

//------------ Ajouter Salle ---------------

const AjouterSalle = () => {
    return (
        <>
            <h2 style={{ textTransform: 'capitalize', margin: '1rem 0' }}>Ajouter salle</h2>
            <form className="ajouter-module-form">
                <div className="input-line">
                    <label htmlFor="nomSalle">nom salle</label>
                    <input
                        style={{ textTransform: 'uppercase' }}
                        type="text"
                    />
                </div>
                <div className="input-line">
                    <label htmlFor="zone">zone</label>
                    <select>
                        <option value={"Classe préparatoire"}>Classe préparatoire</option>
                        <option value={"Seconde Cycle"}>Seconde Cycle</option>
                    </select>
                </div>
                <div className="input-line">
                    <label htmlFor="nbPlaces">nombre places</label>
                    <input
                        type="number"
                        min={15}
                        max={200}
                    />
                </div>
                <div className="input-line">
                    <label htmlFor="type">type</label>
                    <select>
                        <option value={"Amphi"}>Amphi</option>
                        <option value={"SalleTd"}>SalleTd</option>
                        <option value={"SalleTp"}>SalleTp</option>
                    </select>
                </div>
                <div className="ajouter-btns" style={{ margin: '1rem 0 1rem 0' }}>
                    <button >Annuler</button>
                    <button className='sauvegarder-ajouter-btn'
                        type="submit"  > Sauvegarder</button>
                </div>
            </form>
        </>
    )
}