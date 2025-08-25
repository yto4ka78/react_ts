import CarouselMarket from "../../UI/carouselMarket/CarouselMarket";
import React, { useEffect, useState } from "react";
import styles from "./mainMarket.module.scss";
import { Link } from "react-router-dom";
import CheckBoxListPriceMain from "../../UI/checkbox/CheckBoxListPriceMain";
import FlowerShow from "../../UI/flowerShow/FlowerShow";
import ContactWhatsApp from "../../UI/contactWhatsApp/ContactWhatsApp";
import SomeInfo from "../../UI/someInfo/SomeInfo";
import MainServiceBenefits from "../../UI/mainServiceBenefits/MainServiceBenefits";
import api from "../../../../utils/api";
import logo from "../../assets/images/logo.png";

const MainMarket = () => {
  const [flowers, setFlowers] = useState([]);
  const [isOpen, setIsOpen] = useState(true);
  const [bouquetInPage, setBouquetInPage] = useState(8);
  function mixArray(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  const addBouquetInPage = () => {
    setBouquetInPage(bouquetInPage + 8);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/main");
        let result = response.data;
        if (Array.isArray(result)) {
          setFlowers(result.slice(0, bouquetInPage));
        }
      } catch (e) {
        console.error("Ошибка загрузки", e);
      }
    };
    fetchData();
  }, [bouquetInPage]);

  const handlePriceFilterChange = async (ranges) => {
    try {
      const response = await api.get("/main");
      let result = response.data;

      if (!Array.isArray(result)) return;

      if (ranges.length === 0) {
        const all = mixArray(result).slice(0, bouquetInPage);
        setFlowers(all);
        return;
      }

      const filtered = result.filter((flower) => {
        const price = flower.saleprice || flower.price;
        return ranges.some(([min, max]) => price >= min && price <= max);
      });

      const shuffled = mixArray(filtered).slice(0, bouquetInPage);
      setFlowers(shuffled);
    } catch (e) {
      console.error("Ошибка загрузки", e);
    }
  };

  return (
    <div>
      <CarouselMarket> </CarouselMarket>
      <div className={styles.main}>
        <div className={styles.main_priceSection}>
          <div>
            <button onClick={() => setIsOpen((prev) => !prev)}>
              ₸ Выбрать бюджет {isOpen ? "↑" : "↓"}
            </button>
          </div>
          {isOpen && (
            <div className={styles.main_priceSection_checkList}>
              <CheckBoxListPriceMain
                onFilterChange={handlePriceFilterChange}
              ></CheckBoxListPriceMain>
            </div>
          )}
          <div className={styles.main_priceSection_categories}>
            <Link to={`/category/${"0fce425c-6935-425b-9984-2fe91119632e"}`}>
              {" "}
              Розы 🌹
            </Link>
            <Link to={`/category/${"797e1197-28d9-4977-abd2-badce4e2663b"}`}>
              {" "}
              Пионы
            </Link>

            <Link to={`/category/${"35552479-2873-423d-9de1-1b30699a69bc"}`}>
              {" "}
              Тюльпаны 🌷
            </Link>
            <Link to={`/category/${"82357ee4-932f-4d88-af51-41f9c6a33681"}`}>
              {" "}
              Подарочные наборы
            </Link>
            <Link to={`/category/${"bb503324-45c2-4948-9deb-7d5783fc1887"}`}>
              {" "}
              Клубника в шоколаде 🍓
            </Link>
            <Link to={`/category/${"32294316-1fc9-4485-b55e-625c0e6b814e"}`}>
              {" "}
              Гортензии
            </Link>
            <Link to={`/category/${"b31b0690-06d8-4801-b383-805fedffa7fb"}`}>
              {" "}
              Спрей розы{" "}
            </Link>
          </div>
        </div>
      </div>

      <div className={styles.main_flowersSection}>
        <div className={styles.main_flowersSection_products}>
          {flowers &&
            flowers.map((flower, index) => (
              <FlowerShow flower={flower} index={index} key={index} />
            ))}
        </div>
        <div className={styles.showMoreflowers}>
          <button onClick={addBouquetInPage}>Посмотреть еще</button>
        </div>
      </div>

      <ContactWhatsApp> </ContactWhatsApp>

      <div className={styles.main_description}>
        <div className={styles.description_firstSection}>
          <div className={styles.description_firstSection_text}>
            <div>Цветы Алматы</div>
            <div>
              «Anoli Flowers» – это сеть доставки прекрасных цветов и подарков.
              Более 5 лет мы помогаем делать ваши праздники особенными. Дарите
              своим близким любовь вместе с нами.
            </div>
            <hr />
          </div>
          <div className={styles.description_firstSection_img}>
            <img src={logo} alt="" />
          </div>
        </div>
        <div className={styles.description_secondSection}>
          Добро пожаловать в мир ярких эмоций и незабываемых впечатлений с Anoli
          Flowers – надежным партнером в доставке цветов и подарков по Алматы!
          Наши флористы, вдохновленные многолетним опытом и страстью к своему
          делу, творят настоящие цветочные шедевры — от нежных романтических
          композиций до роскошных праздничных букетов, которые станут
          незабываемым сюрпризом для вас и близких. Каждая композиция создается
          с особой заботой и вниманием к деталям, используя только свежайшие
          цветы, отобранные у проверенных поставщиков. Доставка цветов в Алматы
          по выгодной цене с Anoli Flowers – это гарантия свежести и красоты.
        </div>
        <h3>Доставка цветов в Алматы в любую точку города!</h3>
        <div className={styles.description_secondSection}>
          С Anoli Flowers создание идеального букета – это увлекательное
          путешествие! Мы предлагаем широкий выбор вариантов: от классических
          роз и тюльпанов до экзотических орхидей и лилий – у нас вы найдете
          варианты на любой вкус и бюджет. Вы можете выбрать готовую позицию из
          каталога, недорогой вариант со скидкой или заказать индивидуальный
          дизайн, воплотив все фантазии в жизнь. Хотите удивить любимую девушку
          романтическим сюрпризом? Или поздравить коллег с праздником? Мы
          поможем подобрать идеальные варианты. Купить цветы в Алматы онлайн —
          просто и приятно в интернет-магазине Anoli Flowers!
        </div>
        <h3>
          Наши курьеры доставят цветы в Алматы по указанному адресу и времени
        </h3>
        <div className={styles.description_secondSection}>
          Оформить заказ очень просто: выберите вариант на нашем сайте, укажите
          адрес в Алматы, способ оплаты и время. После оформления заказа с вами
          свяжется наш менеджер для подтверждения. Доставка цветов в Алматы
          осуществляется в удобное для вас время круглосуточно, без выходных.
          Срочная доставка в любой район города, на дом, в офис, в ресторан — в
          течение часа после оплаты заказа. Оплата заказа осуществляется любым
          удобным способом: банковскими картами, электронными платежными
          системами и наличными при доставке. Если же вдруг выбранный вами сорт
          растения окажется временно недоступен, менеджер свяжется с вами,
          предложив равноценную замену, максимально сохраняя задуманный стиль,
          цветовую гамму и учитывая ваш бюджет. Перед отправкой мы отправим вам
          фотографию. Конфиденциальность гарантирована: анонимная доставка
          цветов Алматы доступна по вашему запросу. Мы обеспечиваем бережную
          транспортировку растений, используя специальную упаковку и транспорт,
          защищающий композиции от повреждений. Чтобы сделать подарок еще более
          приятным, вы можете дополнить подарок съедобными композициями,
          открытками, мягкими игрушками, конфетами и другими милыми мелочами,
          представленными в нашем каталоге.
        </div>
        <h3>Цветы в Алматы по доступным ценам в любой сезон</h3>
        <div className={styles.description_secondSection}>
          Заказать великолепные цветы в нашем интернет-магазине проще простого!
          Выбирайте из огромного ассортимента свежих букетов по выгодным ценам,
          от нежных роз до ярких экзотических композиций. Мы предлагаем
          различные способы оплаты и низкие цены. Оформите быструю доставку
          прямо сейчас и подарите близким радость! Anoli Flowers – это цветы,
          которые говорят о ваших чувствах!
        </div>
        <h3>Наши цветы в Алматы с доставкой всегда в наличии!</h3>
        <div className={styles.description_secondSection}>
          В нашем магазине вы найдете цветы на заказ в Алматы на любой случай
          жизни. Яркие и жизнерадостные — для дня рождения, нежные и романтичные
          — для свидания, строгие и элегантные — для деловых встреч – мы
          предлагаем широкий выбор, который удовлетворит любой вкус и подойдет к
          любому случаю. Менеджеры помогут вам определиться, учитывая повод,
          предпочтения получателя и бюджет. Обращаем внимание на сезонность
          растений: наличие отдельных сортов может варьироваться. Актуальный
          ассортимент всегда представлен на нашем онлайн-сайте. Мы работаем
          только со свежими растениями, которые доставляются напрямую от лучших
          поставщиков. Благодаря этому, сюрприз будет радовать вас своей
          красотой в течение долгого времени. — от 7 до 14 дней. Наш ассортимент
          постоянно обновляется, чтобы вы всегда могли наслаждаться свежестью и
          красотой самых актуальных сортов. Доставка осуществляется точно в
          согласованное время, а также вы можете купить букет в Алматы без
          личного вручения – курьер оставит заказ у двери получателя. Для
          удобства выбора мы предлагаем несколько категорий: монобукеты,
          авторские букеты, цветы в коробках, цветы в корзинах, съедобные
          букеты, свадебные композиции, подарочные наборы, мужские букеты.
          Купить цветы Алматы недорого для любого события легко 24/7 в цветочном
          магазине Anoli Flowers!
        </div>
      </div>

      <SomeInfo></SomeInfo>
      <MainServiceBenefits></MainServiceBenefits>
    </div>
  );
};
export default MainMarket;
