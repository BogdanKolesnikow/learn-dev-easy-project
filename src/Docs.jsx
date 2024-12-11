import React, { useState } from "react";
import "./Docs.css"; // импорт стилей

function Docs() {
  const [openSection, setOpenSection] = useState(null);
  const [activeSection, setActiveSection] = useState(null); // Хранит активный подзаголовок

  const toggleSection = (index) => {
    if (openSection === index) {
      setOpenSection(null); // Закрыть секцию
    } else {
      setOpenSection(index); // Открыть новую секцию
    }
  };

  const handleLinkClick = (sectionId) => {
    setActiveSection(sectionId); // Устанавливаем активный раздел
  };

  const handleBackClick = () => {
    window.history.back(); // Возврат на предыдущую страницу
  };

  return (
    <div className="docs-container">
      {/* Боковая панель с навигацией */}
      <nav className="sidebar">
        <ul>
          <li className={openSection === 1 ? "open" : ""}>
            <a href="#introduction" onClick={() => toggleSection(1)}>
              Введение
            </a>
            {openSection === 1 && (
              <ul>
                <li>
                  <a
                    href="#section-1"
                    onClick={() => handleLinkClick("section-1")}
                    className={activeSection === "section-1" ? "active" : ""}
                  >
                    Основные цели проекта
                  </a>
                </li>
                <li>
                  <a
                    href="#section-2"
                    onClick={() => handleLinkClick("section-2")}
                    className={activeSection === "section-2" ? "active" : ""}
                  >
                    Подзаголовок 2
                  </a>
                </li>
              </ul>
            )}
          </li>
          <li className={openSection === 2 ? "open" : ""}>
            <a href="#tools" onClick={() => toggleSection(2)}>
              Инструменты
            </a>
            {openSection === 2 && (
              <ul>
                <li>
                  <a
                    href="#section-3"
                    onClick={() => handleLinkClick("section-3")}
                    className={activeSection === "section-3" ? "active" : ""}
                  >
                    Подзаголовок 1
                  </a>
                </li>
                <li>
                  <a
                    href="#section-4"
                    onClick={() => handleLinkClick("section-4")}
                    className={activeSection === "section-4" ? "active" : ""}
                  >
                    Подзаголовок 2
                  </a>
                </li>
              </ul>
            )}
          </li>
          <li className={openSection === 3 ? "open" : ""}>
            <a href="#usage" onClick={() => toggleSection(3)}>
              Использование
            </a>
            {openSection === 3 && (
              <ul>
                <li>
                  <a
                    href="#section-5"
                    onClick={() => handleLinkClick("section-5")}
                    className={activeSection === "section-5" ? "active" : ""}
                  >
                    Подзаголовок 1
                  </a>
                </li>
                <li>
                  <a
                    href="#section-6"
                    onClick={() => handleLinkClick("section-6")}
                    className={activeSection === "section-6" ? "active" : ""}
                  >
                    Подзаголовок 2
                  </a>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </nav>

      {/* Основной контент с текстом документации */}
      <main className="content">
        <section id="introduction">
          <h1>Введение</h1>
          <p>
            Целью данного проекта является создание платформы, способной интегрировать различные виды контента, <br />
            обеспечивать удобное взаимодействие с алгоритмами и предоставлять пользователям доступ к образовательным <br />
            ресурсам и инструментам. С использованием технологий React.js, Node.js и JavaScript, мы планируем создать <br />
            простое, но мощное решение, которое будет полезно как для студентов, изучающих программирование, так и для <br />
            профессионалов, работающих с алгоритмами и разрабатывающих новые приложения.
          </p>
        </section>

        <section id="tools">
          <h2 id="section-1">Основные цели проекта</h2>
          <ul>
            <li>
              <strong>Интерактивная платформа для эмуляции, разработки и обучения алгоритмам:</strong> Этот инструмент позволит <br />
              пользователям не только изучать алгоритмы, но и разрабатывать, тестировать и отлаживать их в реальном <br />
              времени.
            </li>
            <li>
              <strong>Образовательный ресурс с функционалом для обучения программированию:</strong> Платформа будет <br />
              включать в себя курсы и материалы, которые помогут пользователям пройти путь от новичка до <br />
              профессионала.
            </li>
            <li>
              <strong>Гибкость и масштабируемость:</strong> Платформа будет рассчитана на большое количество пользователей <br />
              и должна поддерживать масштабирование в зависимости от потребностей проекта и роста числа пользователей.
            </li>
          </ul>
        </section>

        <button className="back-button" onClick={handleBackClick}>
          BACK
        </button>
      </main>
    </div>
  );
}

export default Docs;
