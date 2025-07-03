import React, { useState, useEffect } from "react";
import {
  Home,
  Camera,
  Calendar,
  ShoppingBag,
  Menu,
  X,
  Globe,
  User,
  Heart,
  Star,
  Filter,
  Plus,
  Minus,
  Trash2,
} from "lucide-react";
import ClipLoader from "react-spinners/ClipLoader";

const FreezePix = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState("en");
  const [showMenu, setShowMenu] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("featured");
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [shoppingBag, setShoppingBag] = useState([]);
  const [showBagModal, setShowBagModal] = useState(false);
  const [favorites, setFavorites] = useState([]);

  // Load shopping bag from localStorage on component mount
  useEffect(() => {
    const savedBag = localStorage.getItem("freezepix-shopping-bag");
    const savedFavorites = localStorage.getItem("freezepix-favorites");
    if (savedBag) {
      setShoppingBag(JSON.parse(savedBag));
    }
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Save shopping bag to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("freezepix-shopping-bag", JSON.stringify(shoppingBag));
  }, [shoppingBag]);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("freezepix-favorites", JSON.stringify(favorites));
  }, [favorites]);

  const texts = {
    en: {
      home: "Home",
      printing: "Printing",
      booking: "Booking",
      market: "Art Market",
      menu: "Menu",
      welcome: "Welcome to FreezePix",
      subtitle: "The Photography Company",
      printingDesc: "Professional photo printing services",
      bookingDesc: "Book your photography session",
      marketDesc: "Discover and buy high-end photography art",
      exploreMarket: "Explore Art Market",
      bookSession: "Book a Session",
      startPrinting: "Start Printing",
      featured: "Featured Artwork",
      landscapes: "Landscapes",
      portraits: "Portraits",
      abstract: "Abstract",
      buyNow: "Buy Now",
      addToCart: "Add to Cart",
      highEndPhotography: "HIGH END PHOTOGRAPHY",
      professionalCanvas: "Professional Canvas Prints",
      premiumQuality: "Premium Quality Guaranteed",
      all: "All",
      priceRange: "Price Range",
      sortBy: "Sort By",
      newest: "Newest",
      priceHighToLow: "Price: High to Low",
      priceLowToHigh: "Price: Low to High",
      rating: "Rating",
      selectSize: "Select Size",
      // selectFrame: "Select Frame", // Removed
      addToBag: "Add to Bag",
      quantity: "Quantity",
      total: "Total",
      continueShopping: "Continue Shopping",
      checkout: "Checkout",
      orderSummary: "Order Summary",
      shipping: "Shipping",
      tax: "Tax",
      orderTotal: "Order Total",
      close: "Close",
      shoppingBag: "Shopping Bag",
      emptyBag: "Your bag is empty",
      startShopping: "Start Shopping",
      removeItem: "Remove Item",
      updateQuantity: "Update Quantity",
      bagTotal: "Bag Total",
      proceedToCheckout: "Proceed to Checkout",
      itemsInBag: "items in bag",
      addedToBag: "Added to bag successfully!",
      removedFromBag: "Item removed from bag",
      favorites: "Favorites",
      addToFavorites: "Add to Favorites",
      removeFromFavorites: "Remove from Favorites",
    },
    fr: {
      home: "Accueil",
      printing: "Impression",
      booking: "Réservation",
      market: "Marché Art",
      menu: "Menu",
      welcome: "Bienvenue chez FreezePix",
      subtitle: "La Compagnie de Photographie",
      printingDesc: "Services d'impression photo professionnels",
      bookingDesc: "Réservez votre séance photo",
      marketDesc: "Découvrez et achetez de l'art photographique haut de gamme",
      exploreMarket: "Explorer le Marché",
      bookSession: "Réserver une Séance",
      startPrinting: "Commencer l'Impression",
      featured: "Œuvres en Vedette",
      landscapes: "Paysages",
      portraits: "Portraits",
      abstract: "Abstrait",
      buyNow: "Acheter",
      addToCart: "Ajouter au Panier",
      highEndPhotography: "PHOTOGRAPHIE HAUT DE GAMME",
      professionalCanvas: "Impressions sur Toile Professionnelles",
      premiumQuality: "Qualité Premium Garantie",
      all: "Tout",
      priceRange: "Gamme de Prix",
      sortBy: "Trier Par",
      newest: "Plus Récent",
      priceHighToLow: "Prix: Élevé à Bas",
      priceLowToHigh: "Prix: Bas à Élevé",
      rating: "Note",
      selectSize: "Choisir la Taille",
      // selectFrame: "Choisir le Cadre", // Removed
      addToBag: "Ajouter au Panier",
      quantity: "Quantité",
      total: "Total",
      continueShopping: "Continuer les Achats",
      checkout: "Commander",
      orderSummary: "Résumé de Commande",
      shipping: "Livraison",
      tax: "Taxe",
      orderTotal: "Total Commande",
      close: "Fermer",
      shoppingBag: "Panier",
      emptyBag: "Votre panier est vide",
      startShopping: "Commencer les Achats",
      removeItem: "Supprimer l'Article",
      updateQuantity: "Mettre à Jour la Quantité",
      bagTotal: "Total du Panier",
      proceedToCheckout: "Procéder au Checkout",
      itemsInBag: "articles dans le panier",
      addedToBag: "Ajouté au panier avec succès!",
      removedFromBag: "Article supprimé du panier",
      favorites: "Favoris",
      addToFavorites: "Ajouter aux Favoris",
      removeFromFavorites: "Retirer des Favoris",
    },
  };

  const t = texts[language];

  // Define size multipliers
  const sizeMultipliers = {
    "20x30": 1,
    "24x36": 1.2,
    "30x40": 1.5,
    "40x60": 1.8,
    "50x70": 2,
  };

  // Real artwork data with actual image URLs
  const artworks = [
    {
      id: 1,
      title: "Mountain Sunset",
      artist: "Studio Alpine",
      price: 299,
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      category: "landscapes",
      rating: 4.9,
      sizes: ["20x30", "24x36", "30x40", "40x60", "50x70"],
      // frames: ["No Frame", "Black Frame", "White Frame", "Gold Frame"], // Removed
      description:
        "A breathtaking sunset over mountain peaks, captured during golden hour.",
    },
    {
      id: 2,
      title: "Urban Reflections",
      artist: "Metro Photography",
      price: 249,
      image:
        "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop",
      category: "abstract",
      rating: 4.8,
      sizes: ["20x30", "24x36", "30x40", "40x60", "50x70"],
      // frames: ["No Frame", "Black Frame", "White Frame", "Gold Frame"], // Removed
      description:
        "Modern city architecture reflected in glass surfaces, creating abstract patterns.",
    },
    {
      id: 3,
      title: "Golden Hour Portrait",
      artist: "Light Studios",
      price: 399,
      image:
        "https://images.stockcake.com/public/1/a/2/1a2c3354-6b4e-4665-a33c-6c87b14ecbf3_large/sunset-golden-hour-stockcake.jpg",
      category: "portraits",
      rating: 5.0,
      sizes: ["20x30", "24x36", "30x40", "40x60", "50x70"],
      // frames: ["No Frame", "Black Frame", "White Frame", "Gold Frame"], // Removed
      description:
        "Professional portrait captured during the magical golden hour lighting.",
    },
    {
      id: 4,
      title: "Ocean Dreams",
      artist: "Coastal Captures",
      price: 349,
      image:
        "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=400&h=300&fit=crop",
      category: "landscapes",
      rating: 4.7,
      sizes: ["20x30", "24x36", "30x40", "40x60", "50x70"],
      // frames: ["No Frame", "Black Frame", "White Frame", "Gold Frame"], // Removed
      description: "Serene ocean waves meeting the shore in perfect harmony.",
    },
    {
      id: 5,
      title: "City Lights",
      artist: "Urban Vision",
      price: 199,
      image:
        "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1f?w=400&h=300&fit=crop",
      category: "abstract",
      rating: 4.6,
      sizes: ["20x30", "24x36", "30x40", "40x60", "50x70"],
      // frames: ["No Frame", "Black Frame", "White Frame", "Gold Frame"], // Removed
      description:
        "Vibrant city lights creating beautiful bokeh effects at night.",
    },
    {
      id: 6,
      title: "Desert Dunes",
      artist: "Sahara Studios",
      price: 279,
      image:
        "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=400&h=300&fit=crop",
      category: "landscapes",
      rating: 4.8,
      sizes: ["20x30", "24x36", "30x40", "40x60", "50x70"],
      // frames: ["No Frame", "Black Frame", "White Frame", "Gold Frame"], // Removed
      description:
        "Majestic sand dunes shaped by wind, creating natural art forms.",
    },
    {
      id: 7,
      title: "Forest Serenity",
      artist: "Nature Focus",
      price: 329,
      image:
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop",
      category: "landscapes",
      rating: 4.9,
      sizes: ["20x30", "24x36", "30x40", "40x60", "50x70"],
      // frames: ["No Frame", "Black Frame", "White Frame", "Gold Frame"], // Removed
      description:
        "Peaceful forest path with sunlight filtering through ancient trees.",
    },
    {
      id: 8,
      title: "Street Art",
      artist: "Urban Canvas",
      price: 189,
      image:
        "https://images.unsplash.com/photo-1549490349-8643362247b5?w=400&h=300&fit=crop",
      category: "abstract",
      rating: 4.5,
      sizes: ["20x30", "24x36", "30x40", "40x60", "50x70"],
      // frames: ["No Frame", "Black Frame", "White Frame", "Gold Frame"], // Removed
      description:
        "Colorful street art capturing the essence of urban creativity.",
    },
  ];

  const filteredArtworks = artworks.filter(
    (artwork) =>
      selectedCategory === "featured" || artwork.category === selectedCategory
  );

  // Shopping bag functions
  const addToBag = (artwork, size, quantity) => { // Removed 'frame' parameter
    const currentSizeMultiplier = sizeMultipliers[size] || 1; // Use the new multiplier map
    const itemPrice = artwork.price * currentSizeMultiplier; // Removed framePrice

    const newItem = {
      id: Date.now(), // Unique ID for each bag item
      artworkId: artwork.id,
      title: artwork.title,
      artist: artwork.artist,
      image: artwork.image,
      size,
      // frame, // Removed
      quantity,
      unitPrice: itemPrice,
      totalPrice: itemPrice * quantity,
    };

    setShoppingBag((prevBag) => [...prevBag, newItem]);

    // Show success message
    setTimeout(() => {
      alert(t.addedToBag);
    }, 100);
  };

  const removeFromBag = (itemId) => {
    setShoppingBag((prevBag) => prevBag.filter((item) => item.id !== itemId));
  };

  const updateBagItemQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromBag(itemId);
      return;
    }

    setShoppingBag((prevBag) =>
      prevBag.map((item) =>
        item.id === itemId
          ? {
              ...item,
              quantity: newQuantity,
              totalPrice: item.unitPrice * newQuantity,
            }
          : item
      )
    );
  };

  const getBagTotal = () => {
    return shoppingBag.reduce((total, item) => total + item.totalPrice, 0);
  };

  const getBagItemCount = () => {
    return shoppingBag.reduce((count, item) => count + item.quantity, 0);
  };

  // Favorites functions
  const toggleFavorite = (artworkId) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(artworkId)) {
        return prevFavorites.filter((id) => id !== artworkId);
      } else {
        return [...prevFavorites, artworkId];
      }
    });
  };

  const isFavorite = (artworkId) => {
    return favorites.includes(artworkId);
  };

  // Shopping Bag Modal Component
  const ShoppingBagModal = ({ onClose }) => {
    const bagTotal = getBagTotal();
    const shipping = 15; // Fixed shipping cost to $15
    const tax = bagTotal * 0.08;
    const orderTotal = bagTotal + shipping + tax;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">{t.shoppingBag}</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {shoppingBag.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  {t.emptyBag}
                </h3>
                <button
                  onClick={() => {
                    onClose();
                    setCurrentPage("market");
                  }}
                  className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors"
                >
                  {t.startShopping}
                </button>
              </div>
            ) : (
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <div className="space-y-4">
                    {shoppingBag.map((item) => (
                      <div key={item.id} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex gap-4">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-800">
                              {item.title}
                            </h4>
                            <p className="text-sm text-gray-600">
                              by {item.artist}
                            </p>
                            <p className="text-sm text-gray-600">
                              Size: {item.size}
                            </p>
                            {/* <p className="text-sm text-gray-600">
                              Frame: {item.frame}
                            </p> */} {/* Removed */}
                            <p className="text-sm font-semibold text-gray-800">
                              ${item.unitPrice}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                updateBagItemQuantity(
                                  item.id,
                                  item.quantity - 1
                                )
                              }
                              className="p-1 hover:bg-gray-200 rounded"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-8 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateBagItemQuantity(
                                  item.id,
                                  item.quantity + 1
                                )
                              }
                              className="p-1 hover:bg-gray-200 rounded"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => removeFromBag(item.id)}
                              className="p-1 hover:bg-red-100 rounded text-red-600 ml-2"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <div className="text-right mt-2">
                          <span className="font-semibold">
                            ${item.totalPrice}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">
                    {t.orderSummary}
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>{t.total}:</span>
                      <span>${bagTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t.shipping}:</span>
                      <span>${shipping.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t.tax}:</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between font-semibold text-lg">
                        <span>{t.orderTotal}:</span>
                        <span>${orderTotal.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 space-y-3">
                    <button
                      onClick={onClose}
                      className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                    >
                      {t.continueShopping}
                    </button>
                    <button
                      onClick={() => {
                        alert(`Order placed! Total: $${orderTotal.toFixed(2)}`);
                        setShoppingBag([]);
                        onClose();
                      }}
                      className="w-full bg-yellow-400 text-black py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors"
                    >
                      {t.proceedToCheckout}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Enhanced Buy Modal Component
  const BuyModal = ({ artwork, onClose }) => {
    const [selectedSize, setSelectedSize] = useState(artwork.sizes[0]);
    // const [selectedFrame, setSelectedFrame] = useState(artwork.frames[0]); // Removed
    const [quantity, setQuantity] = useState(1);

    // const framePrice = // Removed
    //   selectedFrame === "No Frame"
    //     ? 0
    //     : selectedFrame === "Gold Frame"
    //     ? 50
    //     : 25;
    const currentSizeMultiplier = sizeMultipliers[selectedSize] || 1; // Use the new multiplier map
    const totalPrice = (artwork.price * currentSizeMultiplier) * quantity; // Removed framePrice

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">{artwork.title}</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <img
                  src={artwork.image}
                  alt={artwork.title}
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
                <p className="text-gray-600 mb-2">by {artwork.artist}</p>
                <div className="flex items-center mb-4">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600 ml-1">
                    {artwork.rating}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{artwork.description}</p>
              </div>

              <div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.selectSize}
                  </label>
                  <select
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  >
                    {artwork.sizes.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Removed Frame Selection */}
                {/* <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.selectFrame}
                  </label>
                  <select
                    value={selectedFrame}
                    onChange={(e) => setSelectedFrame(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  >
                    {artwork.frames.map((frame) => (
                      <option key={frame} value={frame}>
                        {frame}
                      </option>
                    ))}
                  </select>
                </div> */}

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.quantity}
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Base Price:</span>
                    <span>${artwork.price}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Size Multiplier:</span>
                    <span>x{currentSizeMultiplier}</span>
                  </div>
                  {/* Removed Frame Price Display */}
                  {/* {framePrice > 0 && (
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Frame:</span>
                      <span>+${framePrice}</span>
                    </div>
                  )} */}
                  <div className="flex justify-between items-center mb-4 text-lg font-bold">
                    <span>{t.total}:</span>
                    <span>${totalPrice}</span>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={onClose}
                      className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                    >
                      {t.continueShopping}
                    </button>
                    <button
                      onClick={() => {
                        addToBag(
                          artwork,
                          selectedSize,
                          quantity // Removed selectedFrame
                        );
                        onClose();
                      }}
                      className="flex-1 bg-yellow-400 text-black py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors"
                    >
                      {t.addToBag}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const HomePage = () => (
    <div className="min-h-screen bg-white">
      {/* Simple Header */}
      <div className="bg-white py-12 px-4 border-b">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">
            Freeze<span className="text-yellow-400">PIX</span>
          </h1>
          <p className="text-xl text-gray-600 italic">{t.subtitle}</p>
        </div>
      </div>

      {/* Quick Access Grid */}
      <div className="max-w-6xl mx-auto py-12 px-4">
        <div className="grid md:grid-cols-3 gap-6">
          <div
            onClick={() => setCurrentPage("printing")}
            className="bg-white border-2 border-gray-200 rounded-lg p-6 text-center hover:border-yellow-400 cursor-pointer transition-colors"
          >
            <Camera className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2 text-gray-800">
              {t.printing}
            </h3>
            <p className="text-gray-600 text-sm">{t.printingDesc}</p>
          </div>

          <div
            onClick={() => setCurrentPage("booking")}
            className="bg-white border-2 border-gray-200 rounded-lg p-6 text-center hover:border-yellow-400 cursor-pointer transition-colors"
          >
            <Calendar className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2 text-gray-800">
              {t.booking}
            </h3>
            <p className="text-gray-600 text-sm">{t.bookingDesc}</p>
          </div>

          <div
            onClick={() => setCurrentPage("market")}
            className="bg-white border-2 border-gray-200 rounded-lg p-6 text-center hover:border-yellow-400 cursor-pointer transition-colors"
          >
            <ShoppingBag className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2 text-gray-800">{t.market}</h3>
            <p className="text-gray-600 text-sm">{t.marketDesc}</p>
          </div>
        </div>
      </div>

      {/* Featured Artworks Preview */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
            {t.featured}
          </h2>
          <div className="grid md:grid-cols-4 gap-4">
            {artworks.slice(0, 4).map((artwork) => (
              <div
                key={artwork.id}
                className="bg-white rounded-lg overflow-hidden shadow-sm"
              >
                <img
                  src={artwork.image}
                  alt={artwork.title}
                  className="w-full h-32 object-cover"
                />
                <div className="p-3">
                  <h4 className="font-semibold text-sm text-gray-800">
                    {artwork.title}
                  </h4>
                  <p className="text-xs text-gray-600">{artwork.artist}</p>
                  <p className="text-sm font-bold text-yellow-600 mt-1">
                    ${artwork.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <button
              onClick={() => setCurrentPage("market")}
              className="bg-yellow-400 text-black px-6 py-2 rounded-full font-semibold hover:bg-yellow-500 transition-colors"
            >
              {t.exploreMarket}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const MarketPage = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">{t.market}</h1>
          <div className="flex items-center gap-4">
            <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
              <option>{t.sortBy}</option>
              <option>{t.newest}</option>
              <option>{t.priceHighToLow}</option>
              <option>{t.priceLowToHigh}</option>
              <option>{t.rating}</option>
            </select>
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-4 mb-8 overflow-x-auto">
          <button
            onClick={() => setSelectedCategory("featured")}
            className={`px-6 py-2 rounded-full font-semibold whitespace-nowrap ${
              selectedCategory === "featured"
                ? "bg-yellow-400 text-black"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            {t.featured}
          </button>
          <button
            onClick={() => setSelectedCategory("landscapes")}
            className={`px-6 py-2 rounded-full font-semibold whitespace-nowrap ${
              selectedCategory === "landscapes"
                ? "bg-yellow-400 text-black"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            {t.landscapes}
          </button>
          <button
            onClick={() => setSelectedCategory("portraits")}
            className={`px-6 py-2 rounded-full font-semibold whitespace-nowrap ${
              selectedCategory === "portraits"
                ? "bg-yellow-400 text-black"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            {t.portraits}
          </button>
          <button
            onClick={() => setSelectedCategory("abstract")}
            className={`px-6 py-2 rounded-full font-semibold whitespace-nowrap ${
              selectedCategory === "abstract"
                ? "bg-yellow-400 text-black"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            {t.abstract}
          </button>
        </div>

        {/* Artwork Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArtworks.map((artwork) => (
            <div
              key={artwork.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <img
                src={artwork.image}
                alt={artwork.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-800">
                    {artwork.title}
                  </h3>
                  <button
                    onClick={() => toggleFavorite(artwork.id)}
                    className="p-1"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        isFavorite(artwork.id)
                          ? "text-red-500 fill-current"
                          : "text-gray-400 hover:text-red-500"
                      }`}
                    />
                  </button>
                </div>
                <p className="text-gray-600 mb-2">{artwork.artist}</p>
                <div className="flex items-center mb-4">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600 ml-1">
                    {artwork.rating}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-gray-800">
                    ${artwork.price}
                  </span>
                  <button
                    onClick={() => {
                      setSelectedArtwork(artwork);
                      setShowBuyModal(true);
                    }}
                    className="bg-yellow-400 text-black px-4 py-2 rounded-full font-semibold hover:bg-yellow-500 transition-colors"
                  >
                    {t.buyNow}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Buy Modal */}
        {showBuyModal && selectedArtwork && (
          <BuyModal
            artwork={selectedArtwork}
            onClose={() => {
              setShowBuyModal(false);
              setSelectedArtwork(null);
            }}
          />
        )}

        {/* Shopping Bag Modal */}
        {showBagModal && (
          <ShoppingBagModal onClose={() => setShowBagModal(false)} />
        )}
      </div>
    </div>
  );

  const PrintingPage = () => (
    <div className="min-h-screen bg-white">
      <iframe
        src="https://print.freezepix.com"
        className="w-full h-screen border-0"
        title="Printing Services"
      />
    </div>
  );

  const BookingPage = () => (
    <div className="min-h-screen bg-white">
      <iframe
        src="https://booking.freezepix.com"
        className="w-full h-screen border-0"
        title="Booking Services"
      />
    </div>
  );


  // Handle page navigation with loading
  const navigateToPage = (page) => {
    setIsLoading(true);
    setCurrentPage(page);
    
    // Simulate loading time (adjust as needed)
    setTimeout(() => {
      setIsLoading(false);
    }, 500); // 500ms loading time
  };

  // Simple render function without state changes
  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage />;
      case "market":
        return <MarketPage />;
      case "printing":
        return <PrintingPage />;
      case "booking":
        return <BookingPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div
              onClick={() => setCurrentPage("home")}
              className="flex items-center cursor-pointer"
            >
              <h1 className="text-2xl font-bold">
                Freeze<span className="text-yellow-400">PIX</span>
              </h1>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setLanguage(language === "en" ? "fr" : "en")}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100"
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {language.toUpperCase()}
                </span>
              </button>

              <button
                onClick={() => setShowBagModal(true)}
                className="relative p-2 hover:bg-gray-100 rounded-lg"
              >
                <ShoppingBag className="w-6 h-6" />
                {getBagItemCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-yellow-400 text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {getBagItemCount()}
                  </span>
                )}
              </button>

              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                {showMenu ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {showMenu && (
        <div className="bg-white shadow-lg">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex flex-col gap-4">
              <button
                onClick={() => {
                  setCurrentPage("home");
                  setShowMenu(false);
                }}
                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 text-left"
              >
                <Home className="w-5 h-5" />
                {t.home}
              </button>
              <button
                onClick={() => {
                  setCurrentPage("printing");
                  setShowMenu(false);
                }}
                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 text-left"
              >
                <Camera className="w-5 h-5" />
                {t.printing}
              </button>
              <button
                onClick={() => {
                  setCurrentPage("booking");
                  setShowMenu(false);
                }}
                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 text-left"
              >
                <Calendar className="w-5 h-5" />
                {t.booking}
              </button>
              <button
                onClick={() => {
                  setCurrentPage("market");
                  setShowMenu(false);
                }}
                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 text-left"
              >
                <ShoppingBag className="w-5 h-5" />
                {t.market}
              </button>
            </div>
          </div>
        </div>
      )}

   {/* Main Content */}
   <main className="flex-1">
        {isLoading ? (
          <div className="flex justify-center items-center h-96">
            <ClipLoader 
              color="#3498db" 
              loading={isLoading} 
              size={60}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        ) : (
          renderPage()
        )}
      </main>
      {/* Shopping Bag Modal */}
      {showBagModal && (
        <ShoppingBagModal onClose={() => setShowBagModal(false)} />
      )}

      {/* Bottom Navigation */}
      <nav className="bg-white border-t sticky bottom-0 z-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-around py-2">
            <button
              onClick={() => setCurrentPage("home")}
              className={`flex flex-col items-center gap-1 p-2 rounded-lg ${
                currentPage === "home" ? "text-yellow-400" : "text-gray-600"
              }`}
            >
              <Home className="w-6 h-6" />
              <span className="text-xs">{t.home}</span>
            </button>
            <button
              onClick={() => setCurrentPage("printing")}
              className={`flex flex-col items-center gap-1 p-2 rounded-lg ${
                currentPage === "printing" ? "text-yellow-400" : "text-gray-600"
              }`}
            >
              <Camera className="w-6 h-6" />
              <span className="text-xs">{t.printing}</span>
            </button>
            <button
              onClick={() => setCurrentPage("booking")}
              className={`flex flex-col items-center gap-1 p-2 rounded-lg ${
                currentPage === "booking" ? "text-yellow-400" : "text-gray-600"
              }`}
            >
              <Calendar className="w-6 h-6" />
              <span className="text-xs">{t.booking}</span>
            </button>
            <button
              onClick={() => setCurrentPage("market")}
              className={`flex flex-col items-center gap-1 p-2 rounded-lg relative ${
                currentPage === "market" ? "text-yellow-400" : "text-gray-600"
              }`}
            >
              <div className="relative">
                <ShoppingBag className="w-6 h-6" />
                {getBagItemCount() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
                    {getBagItemCount()}
                  </span>
                )}
              </div>
              <span className="text-xs">{t.market}</span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default FreezePix;
