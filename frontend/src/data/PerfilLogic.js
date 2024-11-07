import { useState, useEffect, useRef } from 'react';

export function useHomeLogic() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);
  
  const menuRef = useRef(null); // Ref para el menú
  const searchRef = useRef(null); // Ref para la caja de búsqueda
  const resultRef = useRef(null); // Ref para el cuadro de resultados de búsqueda

  const data = [
    {
      _id_: 1,
      name: "Maceta de Cerámica Pintada a Mano",
      description: "Una hermosa maceta artesanal pintada a mano, perfecta para plantas pequeñas.",
      category: "Decoración",
      price: 15.99,
      stock: 25,
    },
    {
      _id_: 2,
      name: "Cuaderno de Papel Reciclado",
      description: "Cuaderno hecho a mano con papel reciclado, ideal para notas y dibujos.",
      category: "Papelería",
      price: 8.50,
      stock: 50,
    },
    // Agrega más objetos según sea necesario...
  ];

  // Efecto para cerrar el menú al hacer clic fuera
  useEffect(() => {
    const handleOutsideClick = (e) => {
      // Solo cerrar el menú si el clic ocurre fuera del menú, campo de búsqueda y resultados de búsqueda
      if (
        menuOpen &&
        !menuRef.current.contains(e.target) &&
        !searchRef.current.contains(e.target) &&
        !resultRef.current.contains(e.target) 
      ) {
        setMenuOpen(false);
        document.body.classList.remove('mobile-nav-open');
      }
    };

    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [menuOpen]);

  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    document.body.classList.toggle('mobile-nav-open', !menuOpen);
  };

  const handleSearch = (e) => {
    const key = e.target.value.toLowerCase();
    setSearchTerm(key);
  
    if (key.length > 0) {
      // Filtrar los resultados basados en el término de búsqueda
      const matches = data.filter((item) =>
        Object.values(item).some((value) =>
          String(value).toLowerCase().includes(key)
        )
      );
      setFilteredResults(matches);
    } else {
      setFilteredResults([]);
    }
  };
  

  return {
    menuOpen,
    searchTerm,
    filteredResults,
    handleSearch,
    menuRef,
    searchRef,
    resultRef,
    toggleMenu
  };
}
