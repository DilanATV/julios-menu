import { useState, useMemo } from 'react';
import { menuData, restaurantInfo } from './data';

function App() {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);

  // Estados para la sección de Reseñas
  const [reviews, setReviews] = useState(restaurantInfo.initialReviews || []);
  const [reviewerName, setReviewerName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const categories = useMemo(
    () => ['Todos', ...new Set(menuData.map((item) => item.category))],
    []
  );

  const filteredMenu = useMemo(() => {
    return menuData.filter((item) => {
      const matchesCategory = activeCategory === 'Todos' || item.category === activeCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchTerm]);

  const openModal = (item) => {
    setSelectedItem(item);
    setSelectedOption(item.options ? item.options[0] : '');
    setQuantity(1);
  };

  const addToCart = () => {
    if (!selectedItem) return;
    const cartKey = `${selectedItem.id}-${selectedOption}`;
    setCart((prev) => {
      const existing = prev.find((i) => i.cartKey === cartKey);
      if (existing) {
        return prev.map((i) =>
          i.cartKey === cartKey ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [
        ...prev,
        {
          cartKey,
          id: selectedItem.id,
          name: selectedItem.name,
          option: selectedOption,
          price: selectedItem.price,
          quantity,
        },
      ];
    });
    setSelectedItem(null);
  };

  const removeFromCart = (cartKey) => {
    setCart((prev) => prev.filter((i) => i.cartKey !== cartKey));
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const sendWhatsAppOrder = () => {
    const lines = cart.map(
      (i) => `• ${i.quantity}x ${i.name}${i.option ? ` (${i.option})` : ''} - $${i.price * i.quantity}`
    );
    const message = `¡Hola *${restaurantInfo.name}*! Quiero hacer el siguiente pedido desde el Menú Digital:\n\n${lines.join(
      '\n'
    )}\n\n*Total estimado: $${totalPrice} MXN*`;
    const url = `https://wa.me/${restaurantInfo.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!reviewerName.trim() || !reviewComment.trim()) return;

    const newReview = {
      id: Date.now(),
      author: reviewerName.trim(),
      rating: reviewRating,
      date: 'Justo ahora',
      comment: reviewComment.trim(),
    };

    setReviews([newReview, ...reviews]);
    setReviewerName('');
    setReviewComment('');
    setReviewRating(5);
    setReviewSubmitted(true);
    setTimeout(() => setReviewSubmitted(false), 5000);
  };

  const averageRating = useMemo(() => {
    if (reviews.length === 0) return '5.0';
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    return (sum / reviews.length).toFixed(1);
  }, [reviews]);

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-800 flex flex-col">
      {/* HEADER STICKY CON LOGO REAL */}
      <header className="bg-white shadow-md sticky top-0 z-40">
        <div className="bg-brandRed text-white">
          <div className="max-w-6xl mx-auto px-4 py-2.5 flex flex-wrap gap-3 justify-between items-center">
            <div
              onClick={() => setActiveCategory('Todos')}
              className="flex items-center gap-3 cursor-pointer"
            >
              {!logoError ? (
                <img
                  src={restaurantInfo.logo}
                  alt={restaurantInfo.name}
                  onError={() => setLogoError(true)}
                  className="h-12 w-12 md:h-14 md:w-14 object-contain rounded-full bg-white/10 p-0.5 drop-shadow-md shrink-0"
                />
              ) : (
                <div className="h-12 w-12 rounded-full bg-white text-brandRed font-black flex items-center justify-center text-xs shadow">
                  JULIO'S
                </div>
              )}
              <div>
                <h1 className="text-xl md:text-2xl font-black italic tracking-wider leading-none">
                  JULIO'S <span className="text-brandYellow">ASADERO</span>
                </h1>
                <p className="text-[11px] text-red-100 tracking-wide mt-0.5">
                  MENÚ DIGITAL INTERACTIVO
                </p>
              </div>
            </div>

            {/* Buscador */}
            <div className="relative flex-1 max-w-xs ml-auto">
              <input
                type="text"
                placeholder="Buscar arrachera, pollo, pozole..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-full text-sm text-stone-800 bg-white/95 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brandYellow"
              />
              <span className="absolute left-3 top-1.5 text-stone-400 text-sm">🔍</span>
            </div>
          </div>
        </div>

        {/* Barra de Categorías deslizable */}
        <nav className="border-b border-stone-200 bg-white">
          <div className="max-w-6xl mx-auto px-4 flex space-x-2 overflow-x-auto py-2.5">
            {categories.map((category) => {
              const active = activeCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs md:text-sm font-bold transition-all ${
                    active
                      ? 'bg-brandRed text-white shadow-sm scale-105'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </nav>
      </header>

      {/* BANNER PROMOCIONAL */}
      {activeCategory === 'Todos' && !searchTerm && (
        <section className="max-w-6xl w-full mx-auto px-4 pt-6">
          <div className="bg-gradient-to-r from-stone-900 via-red-950 to-brandRed rounded-2xl p-6 md:p-8 text-white shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <span className="inline-block bg-brandYellow text-stone-900 text-xs font-black uppercase px-3 py-1 rounded-full mb-2">
                {restaurantInfo.promoBanner.tag}
              </span>
              <h2 className="text-2xl md:text-4xl font-black mb-1">
                {restaurantInfo.promoBanner.title}
              </h2>
              <p className="text-stone-200 text-sm md:text-base">
                {restaurantInfo.promoBanner.subtitle}
              </p>
            </div>
            <button
              onClick={() => setActiveCategory(restaurantInfo.promoBanner.categoryTarget)}
              className="bg-brandYellow hover:bg-yellow-400 text-stone-900 font-black px-5 py-2.5 rounded-xl text-sm shadow transition-transform active:scale-95 whitespace-nowrap"
            >
              Ver Pozole →
            </button>
          </div>
        </section>
      )}

      {/* LISTADO DE PLATILLOS */}
      <main className="max-w-6xl w-full mx-auto px-4 py-8 flex-grow">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-black text-stone-800 border-l-4 border-brandRed pl-3">
            {activeCategory === 'Todos' ? 'Todo Nuestro Menú' : activeCategory}
          </h2>
          <span className="text-xs font-semibold text-stone-500 bg-stone-200 px-3 py-1 rounded-full">
            {filteredMenu.length} opciones
          </span>
        </div>

        {filteredMenu.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-stone-200">
            <p className="text-lg font-bold text-stone-600">No encontramos platillos con "{searchTerm}"</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setActiveCategory('Todos');
              }}
              className="mt-3 text-brandRed font-bold underline text-sm"
            >
              Ver todo el menú
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMenu.map((item) => (
              <article
                key={item.id}
                onClick={() => openModal(item)}
                className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-200 border border-stone-200/80 flex flex-col"
              >
                <div className="relative h-52 overflow-hidden bg-stone-200">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  {item.badge && (
                    <span className="absolute top-3 left-3 bg-brandYellow text-stone-900 text-xs font-black uppercase px-3 py-1 rounded-full shadow">
                      {item.badge}
                    </span>
                  )}
                  <span className="absolute bottom-3 right-3 bg-stone-900/90 text-white text-sm font-black px-3 py-1 rounded-lg">
                    ${item.price}
                  </span>
                </div>

                <div className="p-5 flex-grow flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-brandRed">
                      {item.category}
                    </span>
                    <h3 className="text-lg font-extrabold text-stone-900 mt-0.5 mb-2 group-hover:text-brandRed transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-stone-600 text-sm leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                    <span className="text-xs text-stone-500 font-medium">
                      {item.options ? `${item.options.length} opciones a elegir` : 'Listo para ordenar'}
                    </span>
                    <span className="text-sm font-extrabold text-brandRed group-hover:translate-x-1 transition-transform">
                      Elegir +
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      {/* SECCIÓN DE RESEÑAS Y OPINIONES (CON GOOGLE MAPS) */}
      <section className="max-w-6xl w-full mx-auto px-4 py-10 border-t border-stone-200">
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-stone-200/80">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-100">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-brandRed">
                La opinión de nuestros clientes
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-stone-900 mt-1">
                ¿Qué te pareció Julio's Asadero?
              </h2>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-2xl font-black text-stone-900">{averageRating}</span>
                <span className="text-amber-400 text-lg tracking-tight">★★★★★</span>
                <span className="text-xs text-stone-500 font-medium">
                  ({reviews.length} reseñas recientes)
                </span>
              </div>
            </div>

            {/* Botón directo a Google Maps */}
            <a
              href={restaurantInfo.socials.googleMapsReview}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 bg-stone-900 hover:bg-black text-white font-bold text-sm px-5 py-3 rounded-xl shadow transition-transform active:scale-95"
            >
              <svg className="w-5 h-5 text-brandYellow" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" />
              </svg>
              Calificar en Google Maps
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
            {/* Formulario interactivo para dejar reseña en vivo */}
            <form onSubmit={handleReviewSubmit} className="lg:col-span-5 bg-stone-50 p-5 rounded-2xl border border-stone-200/70 space-y-4">
              <h3 className="font-extrabold text-stone-900 text-base">
                Déjanos tu comentario aquí
              </h3>

              {/* Selector de estrellas */}
              <div>
                <label className="block text-xs font-bold text-stone-600 mb-1">
                  Tu calificación:
                </label>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewRating(star)}
                      className={`text-2xl transition-transform hover:scale-110 ${
                        star <= reviewRating ? 'text-amber-400' : 'text-stone-300'
                      }`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <input
                  type="text"
                  required
                  placeholder="Tu nombre (ej. Juan P.)"
                  value={reviewerName}
                  onChange={(e) => setReviewerName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brandRed"
                />
              </div>

              <div>
                <textarea
                  rows="3"
                  required
                  placeholder="Cuéntanos qué platillo pediste y qué te pareció..."
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brandRed resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-brandRed hover:bg-red-700 text-white font-black py-2.5 rounded-xl text-sm shadow transition-colors"
              >
                Publicar reseña
              </button>

              {reviewSubmitted && (
                <div className="bg-green-50 border border-green-200 text-green-800 text-xs font-semibold p-3 rounded-xl">
                  ¡Gracias por tu opinión! También puedes compartirla en{' '}
                  <a
                    href={restaurantInfo.socials.googleMapsReview}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline font-black"
                  >
                    Google Maps aquí
                  </a>.
                </div>
              )}
            </form>

            {/* Lista de reseñas publicadas */}
            <div className="lg:col-span-7 space-y-3 max-h-80 overflow-y-auto pr-1">
              {reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="p-4 rounded-2xl border border-stone-200/80 bg-white shadow-2xs"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-extrabold text-sm text-stone-900">{rev.author}</span>
                    <span className="text-[11px] text-stone-400">{rev.date}</span>
                  </div>
                  <div className="text-amber-400 text-sm mb-1.5">
                    {'★'.repeat(rev.rating)}
                    <span className="text-stone-200">{'★'.repeat(5 - rev.rating)}</span>
                  </div>
                  <p className="text-stone-600 text-sm leading-relaxed">{rev.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER CON REDES SOCIALES Y CONTACTO DIRECTO */}
      <footer className={`bg-stone-900 text-stone-300 border-t-4 border-brandRed ${totalItems > 0 ? 'pb-24' : ''}`}>
        <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Identidad */}
          <div className="flex items-center gap-3 text-center md:text-left">
            {!logoError && (
              <img
                src={restaurantInfo.logo}
                alt={restaurantInfo.name}
                className="h-14 w-14 object-contain rounded-full bg-white/5 p-1"
              />
            )}
            <div>
              <h3 className="text-lg font-black italic text-white tracking-wider">
                JULIO'S <span className="text-brandYellow">ASADERO</span>
              </h3>
              <p className="text-xs text-stone-400">{restaurantInfo.slogan}</p>
            </div>
          </div>

          {/* Botones de Redes Sociales y Llamada */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {/* WhatsApp */}
            <a
              href={`https://wa.me/${restaurantInfo.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="flex items-center gap-2 bg-stone-800 hover:bg-green-600 text-white px-4 py-2.5 rounded-full text-xs font-bold transition-colors"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zM12 2C6.486 2 2 6.486 2 12c0 1.829.496 3.541 1.356 5.019L2 22l5.122-1.341A9.956 9.956 0 0 0 12 22c5.514 0 10-4.486 10-10S17.514 2 12 2z" />
              </svg>
              WhatsApp
            </a>

            {/* Facebook */}
            <a
              href={restaurantInfo.socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex items-center gap-2 bg-stone-800 hover:bg-blue-600 text-white px-4 py-2.5 rounded-full text-xs font-bold transition-colors"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
              </svg>
              Facebook
            </a>

            {/* Instagram */}
            <a
              href={restaurantInfo.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex items-center gap-2 bg-stone-800 hover:bg-pink-600 text-white px-4 py-2.5 rounded-full text-xs font-bold transition-colors"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              Instagram
            </a>

            {/* Llamada Directa */}
            <a
              href={`tel:${restaurantInfo.phone}`}
              aria-label="Llamar por teléfono"
              className="flex items-center gap-2 bg-brandRed hover:bg-red-700 text-white px-4 py-2.5 rounded-full text-xs font-bold transition-colors shadow"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M6.62 10.79a15.053 15.053 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.58a1 1 0 0 1-.25 1.01l-2.2 2.2z" />
              </svg>
              Llamar
            </a>
          </div>
        </div>

        <div className="border-t border-stone-800 py-4 text-center text-[11px] text-stone-500 px-4">
          © {new Date().getFullYear()} {restaurantInfo.name}. Todos los derechos reservados • Menú Digital Interactivo.
        </div>
      </footer>

      {/* MODAL DE DETALLE / PERSONALIZACIÓN */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-56 shrink-0">
              <img
                src={selectedItem.image}
                alt={selectedItem.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 bg-black/70 text-white w-9 h-9 rounded-full font-bold hover:bg-black"
              >
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4">
              <div className="flex justify-between items-start gap-3">
                <h3 className="text-2xl font-black text-stone-900">{selectedItem.name}</h3>
                <span className="text-xl font-black text-brandRed shrink-0">
                  ${selectedItem.price}
                </span>
              </div>

              <p className="text-stone-600 text-sm leading-relaxed">{selectedItem.description}</p>

              {selectedItem.includes && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-950">
                  <strong className="block font-bold mb-0.5">🍽️ ¿Qué incluye?</strong>
                  {selectedItem.includes}
                </div>
              )}

              {selectedItem.options && (
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-stone-700 mb-2">
                    {selectedItem.optionsTitle || 'Selecciona una opción:'}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedItem.options.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setSelectedOption(opt)}
                        className={`text-left px-3 py-2 rounded-xl text-xs font-bold border transition-all ${
                          selectedOption === opt
                            ? 'border-brandRed bg-red-50 text-brandRed ring-1 ring-brandRed'
                            : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-stone-200 flex items-center gap-3">
                <div className="flex items-center border border-stone-300 rounded-xl">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-2 font-black text-lg"
                  >
                    −
                  </button>
                  <span className="px-3 font-bold text-sm">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-3 py-2 font-black text-lg"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={addToCart}
                  className="flex-1 bg-brandRed hover:bg-red-700 text-white font-black py-3 rounded-xl shadow transition-colors"
                >
                  Agregar a mi orden • ${selectedItem.price * quantity}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* BARRA FLOTANTE DE PEDIDO */}
      {totalItems > 0 && (
        <div className="fixed bottom-4 inset-x-4 max-w-xl mx-auto z-40">
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-full bg-stone-900 hover:bg-black text-white px-5 py-4 rounded-2xl shadow-2xl flex items-center justify-between border border-stone-700"
          >
            <div className="flex items-center gap-3">
              <span className="bg-brandYellow text-stone-900 font-black text-xs px-2.5 py-1 rounded-lg">
                {totalItems}
              </span>
              <span className="font-bold text-sm">Ver mi pedido</span>
            </div>
            <span className="font-black text-brandYellow">${totalPrice} MXN →</span>
          </button>
        </div>
      )}

      {/* DRAWER DEL CARRITO */}
      {isCartOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 flex justify-end"
          onClick={() => setIsCartOpen(false)}
        >
          <div
            className="bg-white w-full max-w-md h-full p-6 flex flex-col justify-between shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-stone-200">
                <h3 className="text-xl font-black">Tu Orden</h3>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="text-stone-500 font-bold text-lg"
                >
                  ✕
                </button>
              </div>

              <div className="divide-y divide-stone-100 max-h-[65vh] overflow-y-auto my-4">
                {cart.map((item) => (
                  <div key={item.cartKey} className="py-3 flex justify-between items-start gap-3">
                    <div>
                      <p className="font-bold text-sm text-stone-900">
                        {item.quantity}x {item.name}
                      </p>
                      {item.option && (
                        <p className="text-xs text-stone-500">Opción: {item.option}</p>
                      )}
                      <p className="text-xs font-bold text-brandRed mt-1">
                        ${item.price * item.quantity}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.cartKey)}
                      className="text-xs text-stone-400 hover:text-red-600 font-bold"
                    >
                      Quitar
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-stone-200 pt-4 space-y-3">
              <div className="flex justify-between text-lg font-black">
                <span>Total estimado</span>
                <span>${totalPrice} MXN</span>
              </div>
              <p className="text-[11px] text-stone-400">
                * Precios de demostración sujetos a ajuste oficial de Julio's Asadero.
              </p>
              <button
                onClick={sendWhatsAppOrder}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-black py-3.5 rounded-xl shadow flex items-center justify-center gap-2"
              >
                <span></span> Enviar pedido por WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;