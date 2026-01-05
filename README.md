# LearnLingo – Online Language Tutors

**LearnLingo** is a web application for a company that offers online language lessons. The app allows users to find tutors based on different criteria, view their profiles, and add favorite tutors to a private “Favorites” page.

---

## 🚀 Main Pages

1. **Home**

   - Displays the company's advantages.
   - Contains a call-to-action button that redirects to the **Teachers** page.

2. **Teachers**

   - Shows a list of tutors.
   - Users can filter by:
     - Language
     - Student level
     - Price per hour

   Additional features:

   - Tutors are loaded in batches of 4 with a **Load more** button to fetch more.
   - Adding tutors to favorites using the heart icon.
   - Viewing detailed tutor info with **Read more**.
   - Booking a trial lesson via a modal form.

3. **Favorites** _(private page)_
   - Shows all tutors added by the user to favorites.
   - Styled similar to the Teachers page.

---

## ⚙️ Technical Requirements

- **User Authentication** using **Firebase** (register, login, logout, get current user data).
- Forms built with **React Hook Form** & **Yup** for validation (all fields required). Modal forms can be closed by:
  - Clicking the “✕” button
  - Clicking on the backdrop
  - Pressing the Esc key
- **Firebase Realtime Database** collection for tutors with fields:
  name, surname, languages, levels, rating, reviews, price_per_hour, lessons_done, avatar_url, lesson_info, conditions, experience
- Tutor cards rendered 4 at a time; additional tutors loaded with **Load more**.
- **Favorites** logic:
- Non-authenticated users: notification about login requirement.
- Authenticated users: save favorites using **localStorage** or Firebase.
- Favorites persist on page reload.
- Detailed tutor info via **Read more** button.
- Trial lesson booking through a modal form with validation.
- Private **Favorites** page accessible only to authenticated users.

---

## ✨ Extra Tasks (_Optional_)

- Routing with **React Router**.
- Filtering on Teachers page by:
- Language
- Student level
- Price per hour

---

## 🛠️ Technologies Used

- **React** (Vite)
- **React Hook Form** & **Yup**
- **Firebase** (Authentication, Realtime Database)
- **CSS Modules**
- **React Icons**
- **React Router DOM**

---

## 📂 Project Structure

/src
/components
ContactForm/
TeacherCard/
FilterDropdown/
Filters/
Footer/
Header/
Home/
LoginForm/
MobileMenu/
Modal/
RegistrationForm/
ThemeSwitcher/
/pages
FavoritesPage/
Teachers/
/hooks
useMeta.js
useTheme.js
/styles
themes.css
/firebase-api.js
firebase.js
index.css
App.jsx
main.jsx

---

## 🎨 Styling

- Responsive design for **desktop, tablet and mobile**.
- Design based on mockup, color variations applied.
- Modals and interactive elements follow UX guidelines.

---

## 🚀 How to Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/elena05-dev/LearnLingo.git
   cd LearnLingo
   ```
   Install dependencies: npm install
   Run the app locally: npm run dev
   Open the URL provided by Vite (usually http://localhost:5173).
   The project is deployed on GitHub Pages
   Link: (https://learn-lingo-wvz2.vercel.app/)

✅ Completion Criteria
Semantic and valid HTML/CSS.
No console errors in the browser.
Fully interactive according to requirements.
Firebase authentication and database integration work correctly.
Clean, formatted code without unnecessary comments.
README provides a full project overview.
