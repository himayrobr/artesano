import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Textileria.css';
import producto1 from '../storage/img/Rectangle 41.png';
import producto2 from '../storage/img/Rectangle 87.png';
import producto3 from '../storage/img/Rectangle 90(1).png';
import producto4 from '../storage/img/Rectangle 91.png';
import producto5 from '../storage/img/Rectangle 94(1).png';
import producto6 from '../storage/img/Rectangle 95.png';


import Ceramica from '../storage/img/ceramicCategory.svg';
import TextileriaIcon from '../storage/img/workshopCategory.svg';
import Tallaenpiedra from '../storage/img/stoneWorkshopCategory.svg';
import Tallaenmadera from '../storage/img/woodWorkshopCategory.svg';
import Bordado from '../storage/img/embroideryCategory.svg';
import Joyeria from '../storage/img/jewelryCategory.svg';
import Hojalateria from '../storage/img/sheetMetalCategory.svg';
import Orfebreria from '../storage/img/goldsmithCategory.svg';
import Estampado from '../storage/img/stampedCategory.svg';
import Pintura from '../storage/img/paintingTraditionalCategory.svg';
import Filter from '../storage/img/Group8(1).svg';
import seekerImg from '../storage/img/seeker.svg';
import Return from '../storage/img/arrow_back.svg';
import Rombo from '../storage/img/Rectangle86.svg';
import orderBy from 'lodash/orderBy';
import { useHomeLogic } from '../data/TallerLogic.js';

const talleres = [
    { nombre: "Tapiz Chumpi Andino IIIS/.600", ubicacion: "Taller Awaq Ayllus", imagen: producto1, ruta: "/" },
    { nombre: "Pechera de Chompe KenéS/.350", ubicacion: "Shinan Imabo", imagen: producto2, ruta: "/" },
    { nombre: "Pañón azul con diseño mu..S/.500", ubicacion: "Asoc. artesanas Pañón Ta...", imagen: producto3, ruta: "/" },
];
const talleres2 = [
    { nombre: "Challpi WachakuS/.65", ubicacion: "Asoc. Away Wanka", imagen: producto4, ruta: "/" },
    { nombre: "Bolsa tradicional huamac...S/.90", ubicacion: "Asoc. artesanas Pañón Ta...", imagen: producto5, ruta: "/" },
    { nombre: "Mitón de alpaca beigeS/.35", ubicacion: "Asoc. Away Wanka", imagen: producto6, ruta: "/" },
];

function Textileria() {
    useHomeLogic();


    const [selectedCategory, setSelectedCategory] = useState(null);

    // Función para manejar el clic en una categoría
    const handleCategoryClick = (id) => {
        setSelectedCategory(id);
    };
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filterInput, setFilterInput] = useState('');
    const [orderByValue, setOrderByValue] = useState('nombre');
    const [sortedTalleres, setSortedTalleres] = useState([...talleres, ...talleres2]);

    useEffect(() => {
        let filteredTalleres = [...talleres, ...talleres2];
        if (filterInput) {
            filteredTalleres = filteredTalleres.filter((taller) =>
                taller.nombre.toLowerCase().includes(filterInput.toLowerCase()) ||
                taller.ubicacion.toLowerCase().includes(filterInput.toLowerCase())
            );
        }
        filteredTalleres = orderBy(filteredTalleres, [orderByValue], ['asc']);
        setSortedTalleres(filteredTalleres);
    }, [filterInput, orderByValue]);

    const toggleModal = () => setIsModalOpen(!isModalOpen);
    const handleSearchChange = (e) => setFilterInput(e.target.value);
    const handleOrderChange = (e) => setOrderByValue(e.target.value);

    return (
        <div className="main2">
            <div className='conten-todo'>
            <header className='header'>
            <Link to="/Home">
                    <img src={Return} alt="return" className='retur' />
                </Link>
                <img className='rombo' src={Rombo} alt="Rombo" />
                <h1 className='content-rombo'>Categorias</h1>
            </header>

            <div className="categorias1">
                <div className='contenedor-categoria1'>
                    <div 
                        className={`categoria1 ${selectedCategory === 'Textileria' ? 'selected' : ''}`} 
                        onClick={() => handleCategoryClick('Textileria')}
                    >
                        <img src={TextileriaIcon} alt="Textilería" />
                        <p>Textilería</p>
                    </div>
                    <div 
                        className={`categoria1 ${selectedCategory === 'Ceramica' ? 'selected' : ''}`} 
                        onClick={() => handleCategoryClick('Ceramica')}
                    >
                        <img src={Ceramica} alt="Cerámica" />
                        <p>Cerámica</p>
                    </div>
                    <div 
                        className={`categoria1 ${selectedCategory === 'Orfebreria' ? 'selected' : ''}`} 
                        onClick={() => handleCategoryClick('Orfebreria')}
                    >
                        <img src={Orfebreria} alt="Orfebrería" />
                        <p>Orfebrería</p>
                    </div>
                    <div 
                        className={`categoria1 ${selectedCategory === 'Tallaenpiedra' ? 'selected' : ''}`} 
                        onClick={() => handleCategoryClick('Tallaenpiedra')}
                    >
                        <img src={Tallaenpiedra} alt="Talla en piedra" />
                        <p>Talla en piedra</p>
                    </div>
                    <div 
                        className={`categoria1 ${selectedCategory === 'Tallaenmadera' ? 'selected' : ''}`} 
                        onClick={() => handleCategoryClick('Tallaenmadera')}
                    >
                        <img src={Tallaenmadera} alt="Talla en madera" />
                        <p>Talla en madera</p>
                    </div>
                    <div 
                        className={`categoria1 ${selectedCategory === 'Bordado' ? 'selected' : ''}`} 
                        onClick={() => handleCategoryClick('Bordado')}
                    >
                        <img src={Bordado} alt="Bordado" />
                        <p>Bordado</p>
                    </div>
                    <div 
                        className={`categoria1 ${selectedCategory === 'Joyeria' ? 'selected' : ''}`} 
                        onClick={() => handleCategoryClick('Joyeria')}
                    >
                        <img src={Joyeria} alt="Joyería" />
                        <p>Joyería</p>
                    </div>
                    <div 
                        className={`categoria1 ${selectedCategory === 'Hojalateria' ? 'selected' : ''}`} 
                        onClick={() => handleCategoryClick('Hojalateria')}
                    >
                        <img src={Hojalateria} alt="Hojalatería" />
                        <p>Hojalatería</p>
                    </div>
                    <div 
                        className={`categoria1 ${selectedCategory === 'Estampado' ? 'selected' : ''}`} 
                        onClick={() => handleCategoryClick('Estampado')}
                    >
                        <img src={Estampado} alt="Estampado" />
                        <p>Estampado</p>
                    </div>
                    <div 
                        className={`categoria1 ${selectedCategory === 'Pintura' ? 'selected' : ''}`} 
                        onClick={() => handleCategoryClick('Pintura')}
                    >
                        <img src={Pintura} alt="Pintura tradicional" />
                        <p>Pintura tradicional</p>
                    </div>
                </div>
            </div>

            <section className="productos">
                <h2>Artesanías</h2>
                <div className="search2">
                    <img src={seekerImg} alt="Buscar" className='Buscar' />
                    <input
                        type="text"
                        placeholder="Buscar taller..."
                        value={filterInput}
                        onChange={handleSearchChange}
                    />
                </div>

                <img src={Filter} alt="Filtro" id="filter" onClick={toggleModal} />

                {isModalOpen && (
                    <div className="modal">
                        <div className="modal-content">
                            <span className="close" onClick={toggleModal}>&times;</span>
                            <h2>Filtrar búsqueda</h2>
                            <label htmlFor="orderBy">Ordenar por:</label>
                            <select id="orderBy" value={orderByValue} onChange={handleOrderChange}>
                                <option value="nombre">Nombre</option>
                                <option value="ubicacion">Ubicación</option>
                            </select>
                            <button onClick={toggleModal}>Aplicar filtro</button>
                        </div>
                    </div>
                )}

                <div className="producto-grid">
                    {sortedTalleres.map((taller, index) => (
                        <div key={index} className="producto-card">
                            <Link to={taller.ruta}>
                                <img src={taller.imagen} alt={taller.nombre} />
                                <h3>{taller.nombre}</h3>
                            </Link>
                            <p>{taller.ubicacion}</p>
                        </div>
                    ))}
                </div>
            </section>
            </div>
        </div>
    );
}

export default Textileria;
