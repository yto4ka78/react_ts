import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import MainMarket from "./views/mainMarket/MainMarket.jsx";
import Confidentiality from "./UI/footerMarket/ConfidentialityMarket.jsx";
import LayOutNavBar from "./views/layOutMarket/LayOutMarket";
import ProfileScript from "./views/profile/ProfileScript";
import Dashboard from "./views/dashboard/Dashboard";
import Contacts from "./views/contacts/Contacts";
import Delivery from "./views/delivery/Delivery";
import { useState } from "react";
import AllCategory from "./views/categoryPages/AllCategory";
import CategorySpecial from "./views/categoryPages/CategorySpecial";
import ProductPage from "./UI/productPage/ProductPage";

const MarketFlowersApp = () => {
  const [bouquets, setBouquets] = useState([
    {
      id: "b-001",
      name: "Bouquet de roses rouges classiques",
      description: "Roses rouges fraîches, élégant et intemporel.",
      price: "40",
      saleprice: "35",
      imageUrl: [
        "https://emova-monceaufleurs-fr-storage.omn.proximis.com/Imagestorage/images/740/740/5ed44c0128f7f_FPopera2_1_.jpg",
        "https://emova-monceaufleurs-fr-storage.omn.proximis.com/Imagestorage/images/740/740/5ed44bed98aa4_FPopera4_1_.jpg",
      ],
    },
    {
      id: "b-002",
      name: "Bouquet de pivoines blanches",
      description: "Pivoines blanches parfumées pour les grandes occasions.",
      price: "50",
      saleprice: null,
      imageUrl: [
        "https://cote-naturel.fr/wp-content/uploads/2020/05/Cote-Naturel-Fete-des-meres-2020-Bouquet-F-1.jpg",
        "https://cote-naturel.fr/wp-content/uploads/2020/05/Cote-Naturel-Fete-des-meres-2020-Bouquet-F-3.jpg",
      ],
    },
    {
      id: "b-003",
      name: "Tulipes multicolores",
      description: "Tulipes colorées pour une note de joie.",
      price: "30",
      saleprice: "25",
      imageUrl: [
        "https://i.123fleurs.com/18/images/produits/bouquet-festival-de-tulipes-%E2%80%93-123fleurs-%E2%80%93-livraison-aujourd%E2%80%99hui-430x430-57017.jpg",
        "https://i.123fleurs.com/18/images/produits/bouquet-festival-de-tulipes-%E2%80%93-123fleurs-%E2%80%93-livraison-aujourd%E2%80%99hui-430x430-57017-2.jpg?_gl=1*1jwblex*_gcl_au*MTg3NTYyNzQ0NS4xNzU3NDM2MzI2",
      ],
    },
    {
      id: "b-004",
      name: "Roses en boîte noire",
      description: "Roses rouges dans une boîte noire premium.",
      price: "70",
      saleprice: "60",
      imageUrl: [
        "https://themillionroses.com/cdn/shop/files/2023042490070w.jpg?v=1753971208&width=1000",
        "https://themillionroses.com/cdn/shop/files/1rcopy_a384e168-3174-4397-87b0-da4cb1102f48.jpg?v=1753971208&width=1000",
      ],
    },
    {
      id: "b-005",
      name: "Arrangement comestible de fruits",
      description: "Fruits frais disposés comme un bouquet.",
      price: "45",
      saleprice: "40",
      imageUrl: [
        "https://media.cdnws.com/_i/145793/1251/214/53/capture-d-ecran-2024-10-27-a-20-35-03.png.webp",
        "https://media.cdnws.com/_i/145793/1252/3266/54/capture-d-ecran-2024-10-27-a-20-35-23.png.webp",
      ],
    },

    {
      id: "b-006",
      name: "Mini bouquet de roses roses",
      description: "Roses roses tendres en format compact.",
      price: "20",
      saleprice: null,
      imageUrl: [
        "https://images.pexels.com/photos/30508715/pexels-photo-30508715.jpeg?_gl=1*8aevap*_ga*MjA0NjI5NDU4OC4xNzU3NDk1ODY3*_ga_8JE65Q40S6*czE3NTc0OTU4NjYkbzEkZzEkdDE3NTc0OTY4NzEkajMkbDAkaDA.",
        "https://images.pexels.com/photos/32785896/pexels-photo-32785896.jpeg?_gl=1*i78gm3*_ga*MjA0NjI5NDU4OC4xNzU3NDk1ODY3*_ga_8JE65Q40S6*czE3NTc0OTU4NjYkbzEkZzEkdDE3NTc0OTY4ODQkajYwJGwwJGgw",
        "https://images.pexels.com/photos/14875288/pexels-photo-14875288.jpeg?_gl=1*i1w6bt*_ga*MjA0NjI5NDU4OC4xNzU3NDk1ODY3*_ga_8JE65Q40S6*czE3NTc0OTU4NjYkbzEkZzEkdDE3NTc0OTY5MTAkajM0JGwwJGgw",
      ],
    },
    {
      id: "b-007",
      name: "Tulipes blanches",
      description: "Tulipes blanches pures et élégantes.",
      price: "28",
      saleprice: null,
      imageUrl: [
        "https://images.pexels.com/photos/20594486/pexels-photo-20594486.jpeg?_gl=1*1dtout9*_ga*MjA0NjI5NDU4OC4xNzU3NDk1ODY3*_ga_8JE65Q40S6*czE3NTc0OTU4NjYkbzEkZzEkdDE3NTc0OTYzNDkkajQ2JGwwJGgw",
        "https://images.pexels.com/photos/13058524/pexels-photo-13058524.jpeg?_gl=1*1iwr15e*_ga*MjA0NjI5NDU4OC4xNzU3NDk1ODY3*_ga_8JE65Q40S6*czE3NTc0OTU4NjYkbzEkZzEkdDE3NTc0OTYzNTQkajQxJGwwJGgw",
        "https://images.pexels.com/photos/11582074/pexels-photo-11582074.jpeg?_gl=1*eiyccm*_ga*MjA0NjI5NDU4OC4xNzU3NDk1ODY3*_ga_8JE65Q40S6*czE3NTc0OTU4NjYkbzEkZzEkdDE3NTc0OTYzOTkkajU5JGwwJGgw",
      ],
    },
    {
      id: "b-008",
      name: "Pivoines roses en boîte ronde",
      description: "Pivoines roses dans une boîte ronde chic.",
      price: "65",
      saleprice: "55",
      imageUrl: [
        "https://m.media-amazon.com/images/I/71Xvac-A8qL._AC_SL1500_.jpg",
        "https://m.media-amazon.com/images/I/71Fl-VCbrNL._AC_SL1500_.jpg",
        "https://m.media-amazon.com/images/I/810vVtUNDFL._AC_SL1500_.jpg",
      ],
    },
    {
      id: "b-009",
      name: "Chocolat & fraises (comestible)",
      description: "Fraises enrobées de chocolat en bouquet.",
      price: "50",
      saleprice: "45",
      imageUrl: [
        "https://shokamia.com/wp-content/uploads/elementor/thumbs/Capture-de%CC%81cran-2021-07-27-a%CC%80-16.00.39-paqipnhu6swzec8bfnl949ory3h0x1qw22d1b8cr60.png",
        "https://shokamia.com/wp-content/uploads/elementor/thumbs/Capture-de%CC%81cran-2021-07-27-a%CC%80-16.00.03-paqipe3gagk468lyyjizfc2608rcs2pkoru6igqow8.png",
      ],
    },
    {
      id: "b-010",
      name: "Orchidée en pot",
      description: "Orchidée élégante en pot pour la maison.",
      price: "55",
      saleprice: null,
      imageUrl: [
        "https://emova-monceaufleurs-fr-storage.omn.proximis.com/Imagestorage/images/740/740/6246d78b419c3_FPorchidee4.jpg",
        "https://emova-monceaufleurs-fr-storage.omn.proximis.com/Imagestorage/images/740/740/6246d7aaa9059_FPorchidee2.jpg",
        "https://emova-monceaufleurs-fr-storage.omn.proximis.com/Imagestorage/images/740/740/5ec2b4fbad31b_orchideerose2.jpg",
      ],
    },

    {
      id: "b-011",
      name: "Bouquet de roses jaunes",
      description: "Roses jaunes lumineuses (amitié).",
      price: "32",
      saleprice: "28",
      imageUrl: [
        "https://images.pexels.com/photos/14875302/pexels-photo-14875302.jpeg?_gl=1*cpf63d*_ga*MjA0NjI5NDU4OC4xNzU3NDk1ODY3*_ga_8JE65Q40S6*czE3NTc0OTU4NjYkbzEkZzEkdDE3NTc0OTY5NDMkajEkbDAkaDA.",
        "https://images.pexels.com/photos/14917605/pexels-photo-14917605.jpeg?_gl=1*197euhu*_ga*MjA0NjI5NDU4OC4xNzU3NDk1ODY3*_ga_8JE65Q40S6*czE3NTc0OTU4NjYkbzEkZzEkdDE3NTc0OTY5NjUkajYwJGwwJGgw",
        "https://images.pexels.com/photos/32223895/pexels-photo-32223895.jpeg?_gl=1*1yo8shv*_ga*MjA0NjI5NDU4OC4xNzU3NDk1ODY3*_ga_8JE65Q40S6*czE3NTc0OTU4NjYkbzEkZzEkdDE3NTc0OTY5OTkkajI2JGwwJGgw",
      ],
    },
    {
      id: "b-012",
      name: "Tulipes rouges",
      description: "Tulipes rouges éclatantes.",
      price: "30",
      saleprice: null,
      imageUrl: [
        "https://images.unsplash.com/photo-1707238117034-eb5e1e0e8bba?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1570118281125-84ec73b8008a?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1709593491177-a448ccb1a299?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      ],
    },
    {
      id: "b-013",
      name: "Pivoines corail",
      description: "Pivoines corail luxuriantes.",
      price: "60",
      saleprice: "50",
      imageUrl: [
        "https://images.pexels.com/photos/32006565/pexels-photo-32006565.jpeg?_gl=1*1c7alwp*_ga*MjA0NjI5NDU4OC4xNzU3NDk1ODY3*_ga_8JE65Q40S6*czE3NTc0OTU4NjYkbzEkZzEkdDE3NTc0OTU4OTQkajMyJGwwJGgw",
        "https://images.pexels.com/photos/32006561/pexels-photo-32006561.jpeg?_gl=1*i2t438*_ga*MjA0NjI5NDU4OC4xNzU3NDk1ODY3*_ga_8JE65Q40S6*czE3NTc0OTU4NjYkbzEkZzEkdDE3NTc0OTU4OTQkajMyJGwwJGgw",
        "https://images.pexels.com/photos/32006560/pexels-photo-32006560.jpeg?_gl=1*1z0ao0o*_ga*MjA0NjI5NDU4OC4xNzU3NDk1ODY3*_ga_8JE65Q40S6*czE3NTc0OTU4NjYkbzEkZzEkdDE3NTc0OTYyMTAkajU5JGwwJGgw",
      ],
    },
    {
      id: "b-014",
      name: "Arrangement comestible tropical",
      description: "Ananas, kiwi et fruits exotiques.",
      price: "48",
      saleprice: "43",
      imageUrl: [
        "https://i.aquarelle.com/01/images/produits/bouquet-de-fleurs-exotiques-aquarelle-livraison-fleurs-430x430-54745.jpg",
        "https://i.aquarelle.com/01/images/produits/bouquet-de-fleurs-exotiques-aquarelle-livraison-fleurs-430x430-54745-1.jpg?_gl=1*f64fx4*_gcl_au*NTE3Mzg4NjMzLjE3NTc0MzgwMDQ.&_ga=2.114800903.1418347608.1757438004-954049996.1757438004",
      ],
    },
    {
      id: "b-015",
      name: "Roses blanches en boîte",
      description: "Roses blanches en boîte carrée.",
      price: "75",
      saleprice: "65",
      imageUrl: [
        "https://www.troiscouleursvert.com/public/img/big/b9e008b0e2cd3584d31cd813aeef7ac3.jpg",
        "https://www.troiscouleursvert.com/public/img/big/67cae05d1a9ded778e372f0cfd6766de.jpg",
        "https://www.troiscouleursvert.com/public/img/big/d47c3ee8f9e91f7edd82554ab13fc412.jpg",
      ],
    },

    {
      id: "b-016",
      name: "Bouquet champêtre mixte",
      description: "Mélange naturel de fleurs de saison.",
      price: "38",
      saleprice: null,
      imageUrl: [
        "https://i.etsystatic.com/22508395/r/il/d50aa2/6080804313/il_1140xN.6080804313_fuk0.jpg",
        "https://i.etsystatic.com/22508395/r/il/fc0d6a/3097654884/il_794xN.3097654884_kmdz.jpg",
        "https://i.etsystatic.com/22508395/r/il/f4f9ff/3097654938/il_1140xN.3097654938_95t2.jpg",
        "https://www.etsy.com/fr/listing/1023393019/bouquet-fleurs-sechees-bouquet-champetre",
      ],
    },
    {
      id: "b-017",
      name: "Roses & pivoines",
      description: "Composition raffinée roses+pivoines.",
      price: "68",
      saleprice: "60",
      imageUrl: [
        "https://images.pexels.com/photos/23784974/pexels-photo-23784974.jpeg?_gl=1*118b4qj*_ga*MjA0NjI5NDU4OC4xNzU3NDk1ODY3*_ga_8JE65Q40S6*czE3NTc0OTU4NjYkbzEkZzEkdDE3NTc0OTY3MTUkajEwJGwwJGgw",
        "https://images.pexels.com/photos/32213580/pexels-photo-32213580.jpeg?_gl=1*12q31ya*_ga*MjA0NjI5NDU4OC4xNzU3NDk1ODY3*_ga_8JE65Q40S6*czE3NTc0OTU4NjYkbzEkZzEkdDE3NTc0OTY3NTQkajYwJGwwJGgw",
        "https://images.pexels.com/photos/23784974/pexels-photo-23784974.jpeg?_gl=1*o2f7ty*_ga*MjA0NjI5NDU4OC4xNzU3NDk1ODY3*_ga_8JE65Q40S6*czE3NTc0OTU4NjYkbzEkZzEkdDE3NTc0OTY3NTgkajU2JGwwJGgw",
        "https://images.pexels.com/photos/32223897/pexels-photo-32223897.jpeg?_gl=1*o2f7ty*_ga*MjA0NjI5NDU4OC4xNzU3NDk1ODY3*_ga_8JE65Q40S6*czE3NTc0OTU4NjYkbzEkZzEkdDE3NTc0OTY3NTgkajU2JGwwJGgw",
      ],
    },
    {
      id: "b-018",
      name: "Tulipes violettes",
      description: "Tulipes violettes romantiques.",
      price: "35",
      saleprice: null,
      imageUrl: [
        "https://images.pexels.com/photos/31895248/pexels-photo-31895248.jpeg?_gl=1*1u7ucy8*_ga*MjA0NjI5NDU4OC4xNzU3NDk1ODY3*_ga_8JE65Q40S6*czE3NTc0OTU4NjYkbzEkZzEkdDE3NTc0OTY1OTckajU5JGwwJGgw",
        "https://images.pexels.com/photos/20556344/pexels-photo-20556344.jpeg?_gl=1*judbpa*_ga*MjA0NjI5NDU4OC4xNzU3NDk1ODY3*_ga_8JE65Q40S6*czE3NTc0OTU4NjYkbzEkZzEkdDE3NTc0OTY2MTkkajM3JGwwJGgw",
        "https://images.pexels.com/photos/8116307/pexels-photo-8116307.jpeg?_gl=1*judbpa*_ga*MjA0NjI5NDU4OC4xNzU3NDk1ODY3*_ga_8JE65Q40S6*czE3NTc0OTU4NjYkbzEkZzEkdDE3NTc0OTY2MTkkajM3JGwwJGgw",
        "https://images.pexels.com/photos/31968729/pexels-photo-31968729.jpeg?_gl=1*ptqnzt*_ga*MjA0NjI5NDU4OC4xNzU3NDk1ODY3*_ga_8JE65Q40S6*czE3NTc0OTU4NjYkbzEkZzEkdDE3NTc0OTY2NTEkajUkbDAkaDA.",
        "https://images.pexels.com/photos/31428882/pexels-photo-31428882.jpeg?_gl=1*efnefc*_ga*MjA0NjI5NDU4OC4xNzU3NDk1ODY3*_ga_8JE65Q40S6*czE3NTc0OTU4NjYkbzEkZzEkdDE3NTc0OTY2NjUkajYwJGwwJGgw",
      ],
    },
    {
      id: "b-019",
      name: "Plante verte en pot",
      description: "Plante décorative facile d’entretien.",
      price: "25",
      saleprice: null,
      imageUrl: [
        "https://images.pexels.com/photos/7133427/pexels-photo-7133427.jpeg?_gl=1*17p9cq5*_ga*MjA0NjI5NDU4OC4xNzU3NDk1ODY3*_ga_8JE65Q40S6*czE3NTc0OTU4NjYkbzEkZzEkdDE3NTc0OTY0ODkkajMzJGwwJGgw",
        "https://images.pexels.com/photos/17573846/pexels-photo-17573846.jpeg?_gl=1*17p9cq5*_ga*MjA0NjI5NDU4OC4xNzU3NDk1ODY3*_ga_8JE65Q40S6*czE3NTc0OTU4NjYkbzEkZzEkdDE3NTc0OTY0ODkkajMzJGwwJGgw",
        "https://images.pexels.com/photos/8988963/pexels-photo-8988963.jpeg?_gl=1*5nobyt*_ga*MjA0NjI5NDU4OC4xNzU3NDk1ODY3*_ga_8JE65Q40S6*czE3NTc0OTU4NjYkbzEkZzEkdDE3NTc0OTY1MjckajYwJGwwJGgw",
      ],
    },
    {
      id: "b-020",
      name: "Arrangement comestible de bonbons",
      description: "Bouquet amusant de bonbons colorés.",
      price: "30",
      saleprice: "25",
      imageUrl: [
        "https://i.etsystatic.com/15937314/r/il/fe2f4c/5464244432/il_794xN.5464244432_nbrg.jpg",
        "https://i.etsystatic.com/15937314/r/il/d4c612/6321109690/il_794xN.6321109690_50lv.jpg",
      ],
    },
  ]);

  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Roses",
      showInMenu: true,
      showInPopular: true,
      showAfterPopular: false,
      showInNavBar: true,
      imageUrl: [
        "https://emova-monceaufleurs-fr-storage.omn.proximis.com/Imagestorage/images/740/740/5ed44c0128f7f_FPopera2_1_.jpg",
      ],
    },
    {
      id: 2,
      name: "Pivoines",
      showInMenu: true,
      showInPopular: true,
      showAfterPopular: false,
      showInNavBar: true,
      imageUrl: [
        "https://cdn.pixabay.com/photo/2015/06/27/17/23/flowers-823655_1280.jpg",
      ],
    },
    {
      id: 3,
      name: "Tulipes",
      showInMenu: true,
      showInPopular: false,
      showAfterPopular: true,
      showInNavBar: true,
      imageUrl: [
        "https://cdn.pixabay.com/photo/2023/01/23/16/45/flowers-7739155_1280.jpg",
      ],
    },
    {
      id: 4,
      name: "Dans un pot",
      showInMenu: true,
      showInPopular: false,
      showAfterPopular: false,
      showInNavBar: true,
      imageUrl: [
        "https://cdn.pixabay.com/photo/2017/05/27/03/20/succulents-2347550_1280.jpg",
      ],
    },
    {
      id: 5,
      name: "En boîte",
      showInMenu: true,
      showInPopular: true,
      showAfterPopular: false,
      showInNavBar: true,
      imageUrl: [
        "https://cdn.pixabay.com/photo/2015/07/19/09/47/flowers-851296_1280.jpg",
      ],
    },
  ]);

  const [bouquetCategory, setBouquetCategory] = useState([
    { bouquet_id: "b-001", category_id: 1 },
    { bouquet_id: "b-002", category_id: 2 },
    { bouquet_id: "b-003", category_id: 3 },
    { bouquet_id: "b-004", category_id: 1 },
    { bouquet_id: "b-004", category_id: 5 },
    { bouquet_id: "b-006", category_id: 1 },
    { bouquet_id: "b-007", category_id: 3 },
    { bouquet_id: "b-008", category_id: 2 },
    { bouquet_id: "b-008", category_id: 5 },
    { bouquet_id: "b-010", category_id: 4 },
    { bouquet_id: "b-011", category_id: 1 },
    { bouquet_id: "b-012", category_id: 3 },
    { bouquet_id: "b-013", category_id: 2 },
    { bouquet_id: "b-015", category_id: 1 },
    { bouquet_id: "b-015", category_id: 5 },
    { bouquet_id: "b-017", category_id: 1 },
    { bouquet_id: "b-017", category_id: 2 },
    { bouquet_id: "b-018", category_id: 3 },
    { bouquet_id: "b-019", category_id: 4 },
    // b-020 (comestible) — без связи
  ]);

  useEffect(() => {
    if (!localStorage.getItem("dataStorage")) {
      const initial = { bouquets, categories, bouquetCategory };
      localStorage.setItem("dataStorage", JSON.stringify(initial));
    }
  }, []);
  return (
    <Provider store={store}>
      <Routes>
        <Route element={<LayOutNavBar />}>
          <Route index element={<MainMarket />} />
          <Route path="/confidentiality" element={<Confidentiality />} />
          <Route path="/profile" element={<ProfileScript />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/delivery" element={<Delivery />} />
          <Route path="/allCategories" element={<AllCategory />} />
          <Route path="/category/:id" element={<CategorySpecial />} />
          <Route path="/product_page/:id" element={<ProductPage />} />
        </Route>
      </Routes>
    </Provider>
  );
};

export default MarketFlowersApp;
