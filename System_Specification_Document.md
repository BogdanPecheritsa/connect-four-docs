# System Specification Document (SSD)

## 1. System Architecture
Система побудована за архітектурою Single Page Application (SPA).
- **Frontend:** React 18, Zustand (State Management), TailwindCSS для стилізації.
- **API (Future Scope):** RESTful архітектура для збереження історії матчів.

## 2. Functional Requirements
- **FR1:** Система повинна генерувати та рендерити ігрову матрицю розміром 7 рядків на 6 колонок.
- **FR2:** Система повинна відстежувати та відображати поточного гравця (Player 1 / Player 2).
- **FR3:** При кліку на колонку система повинна "опускати" фішку на найнижчу вільну позицію у вибраній колонці.
- **FR4:** Система повинна блокувати ігрове поле після визначення переможця.

## 3. Non-Functional Requirements
- **NFR1 (Performance):** Час реакції інтерфейсу на хід користувача не повинен перевищувати 100 мс (Client-side rendering).
- **NFR2 (Usability):** Інтерфейс має відповідати підходу Mobile First та коректно відображатися на екранах від 320px.
- **NFR3 (Compliance):** Система повинна збирати згоду на використання cookie перед початком взаємодії.

## 4. Data Models (Zustand Store)
- `board`: `Array<Array<number | null>>` — матриця стану ігрового поля.
- `currentPlayer`: `number` (1 або 2).
- `winner`: `number | null` (ідентифікатор переможця або null, якщо гра триває).