# PennyPilot

---

## Table of Contents
* [Usage](#usage)
* [Authentication](#authentication)
* [Technologies](#technologies)
* [Contributing](#contributing)
* [License](#license)
* [Contact](#contact)
* [Demo](#demo)

---

## Usage

**PennyPilot** is an AI-powered travel assistant designed to remove the financial guesswork from European trip planning. It creates high-value itineraries by balancing cost and experience.

### Key Features:
* **Smart Strategy Generation:** Input your origin, destination, and dates to receive a tailored "Adventure Strategy."
* **Vibe Selection:** AI-optimized results based on four specific travel styles: *Historical Sightseeing, Nature Exploration, Relaxation,* and *Cultural Immersion*.
* **Cost-Aware Itineraries:** Every day includes specific activity breakdowns with estimated costs in Euros (€).
* **Saved Strategies:** A permanent dashboard to save, view, and manage your future travel plans.
* **Date-Logic Integration:** Automatically calculates trip duration to provide consistent daily planning.

### How to Run Locally:
1. **Clone the Repo:**
   `git clone https://github.com/yourusername/pennypilot.git`
2. **Setup Backend:**
   - Navigate to `/backend`
   - Create environment: `python -m venv pp_env`
   - Activate: `source pp_env/bin/activate` (Mac) or `.\pp_env\Scripts\activate` (Win)
   - Install: `pip install -r requirements.txt`
   - Run: `python manage.py migrate` and `python manage.py runserver`
3. **Setup Frontend:**
   - Navigate to `/frontend`
   - Install: `npm install`
   - Run: `npm run dev`

---

## Authentication

* **Secure Storage:** User data and saved itineraries are stored using **Neon PostgreSQL** for reliable, cloud-based data persistence.
* **JWT Logic:** Uses JSON Web Tokens (Access and Refresh tokens) for secure communication.
* **Protected Access:** Users must sign up and log in to access the Trip Planner and Saved Plans. Unauthorized users are automatically redirected to the login page.
* **Token Management:** Tokens are managed locally to ensure session persistence across dashboard refreshes.

---

## Technologies

* **Languages:** HTML, Vanilla CSS, JavaScript (React), Python (Django)
* **Server/Database:** Django Rest Framework, Neon PostgreSQL
* **Libraries:** React (Vite), Axios
* **APIs:** OpenAI API (GPT-4o) for itinerary generation
* **Design:** Custom Vanilla CSS Design System (No external frameworks like Tailwind/Bootstrap)



---

## Contributing

If you'd like to contribute, please let me know! I would be glad to work on it more if someone wants to work on it with me—specifically regarding adding real-time flight data or hotel price tracking.

---

## License

No license, but you can use this code. However, please credit me if you use the AI itinerary logic or the design system.

---

## Contact

If you have any questions or want to contribute somehow, feel free to reach out via GitHub or email me at **your-email@example.com**.

---

## Demo

**No demo yet, but a YouTube link will be posted soon** showing the features and functionalities of the app.

### Required `.env` File
To run this project, you must create a `.env` file in the `/backend` directory with these keys:
- `DATABASE_URL`: Your Neon PostgreSQL connection string.
- `OPENAI_API_KEY`: Your OpenAI Secret Key.
- `SECRET_KEY`: Your unique Django secret key.
- `DEBUG`: Set to `True`.
