# ✈️ Travellust

> **An AI-powered travel listing platform** — Discover, Book, and Plan your perfect stay with the help of AI.

![Node.js](https://img.shields.io/badge/Node.js-v22-green?style=for-the-badge&logo=node.js)
![Express](https://img.shields.io/badge/Express-v5-black?style=for-the-badge&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=for-the-badge&logo=mongodb)
![Cloudinary](https://img.shields.io/badge/Cloudinary-Image_Upload-blue?style=for-the-badge)
![Groq AI](https://img.shields.io/badge/Groq-AI_Powered-orange?style=for-the-badge)

---

## 🌍 Live Demo

👉 https://travellust-c2wy.onrender.com

---

## 📸 Screenshots

| Homepage | Listing Detail | AI Chatbot |
|----------|---------------|------------|
| Hero banner with search | Booking form + Map | Trip Planner |

---

## ✨ Features

### Core Features
- 🏠 **Browse Listings** — View all travel listings with images, price, location
- 🔍 **Smart Search** — Search by title, location, country or description
- 🔥 **Filter by Category** — Trending, Rooms, Mountain, Castles, Camping, Farms, Arctic, Domes
- 👤 **Authentication** — Signup, Login, Logout with Passport.js
- 🏡 **Add Listings** — Create your own listing with image upload
- ✏️ **Edit/Delete** — Owners can edit or delete their listings
- ⭐ **Reviews** — Leave star ratings and comments on listings
- 🗺️ **Interactive Map** — MapTiler map shows listing location
- 📅 **Booking System** — Select check-in/check-out dates and reserve
- 📧 **Email Confirmation** — Welcome email on signup, confirmation on listing creation

### AI Features (Unique!)
- 🤖 **AI Chatbot** — Ask for listing suggestions based on budget/location
- 🗺️ **AI Trip Planner** — Get a full day-by-day itinerary with budget breakdown

### Dashboard
- 📊 **Stats Bar** — Total listings, countries, happy travelers
- 🎨 **Hero Banner** — Beautiful gradient banner with search
- 💳 **Beautiful Cards** — Hover effects, location badges, price display

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Backend** | Node.js, Express.js |
| **Frontend** | EJS Templates, Bootstrap 5 |
| **Database** | MongoDB Atlas + Mongoose |
| **Authentication** | Passport.js + passport-local-mongoose |
| **Image Upload** | Cloudinary + Multer |
| **Maps** | MapTiler (maplibre-gl) |
| **AI Chatbot** | Groq AI (llama-3.3-70b) |
| **Email** | Nodemailer + Gmail |
| **Validation** | Joi |
| **Session** | express-session + connect-mongo |

---

## 🔄 Application Flowchart

```
                    ┌─────────────────────┐
                    │   User visits App   │
                    └──────────┬──────────┘
                               │
                    ┌──────────▼──────────┐
                    │   Homepage (index)  │
                    │  Hero + Stats + Cards│
                    └──────────┬──────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
   ┌──────────▼───┐  ┌─────────▼──────┐  ┌─────▼──────────┐
   │   Search /   │  │  Filter Icons  │  │  AI Chatbot /  │
   │   Browse     │  │  (Trending etc)│  │  Trip Planner  │
   └──────────────┘  └────────────────┘  └────────────────┘
              │
   ┌──────────▼──────────┐
   │   Click a Listing   │
   └──────────┬──────────┘
              │
   ┌──────────▼──────────┐
   │   Is User Logged In?│
   └──────────┬──────────┘
              │
       ┌──────┴──────┐
       │ NO          │ YES
       ▼             ▼
   ┌───────┐   ┌─────────────────────────────┐
   │ Login │   │      Listing Detail Page     │
   │ Page  │   │  Image + Description + Map   │
   └───────┘   └──────────────┬──────────────┘
                              │
              ┌───────────────┼──────────────────┐
              │               │                  │
    ┌─────────▼────┐  ┌───────▼──────┐  ┌───────▼──────┐
    │  Leave Review│  │ Book Listing │  │  Edit/Delete │
    │  (Star + Text│  │ (Check in/out│  │  (Owner only)│
    └─────────────┘  └──────┬───────┘  └──────────────┘
                            │
                 ┌──────────▼──────────┐
                 │  Calculate Price    │
                 │  nights × price/night│
                 └──────────┬──────────┘
                            │
                 ┌──────────▼──────────┐
                 │  Save Booking to DB │
                 │  Flash Success Msg  │
                 └─────────────────────┘
```

---

## 🤖 AI Features Flowchart

```
  ┌─────────────────────────────────────────────────┐
  │                  AI CHATBOT                      │
  │                                                  │
  │  User: "suggest a beach place under ₹2000"       │
  │              │                                   │
  │              ▼                                   │
  │  Fetch all listings from MongoDB                 │
  │              │                                   │
  │              ▼                                   │
  │  Send listings + message to Groq AI              │
  │              │                                   │
  │              ▼                                   │
  │  AI suggests matching listings                   │
  │  with title, location and price ✅               │
  └─────────────────────────────────────────────────┘

  ┌─────────────────────────────────────────────────┐
  │              AI TRIP PLANNER                     │
  │                                                  │
  │  User: "Plan my 3 day Goa trip under ₹5000"      │
  │              │                                   │
  │              ▼                                   │
  │  Fetch all listings from MongoDB                 │
  │              │                                   │
  │              ▼                                   │
  │  Send to Groq AI with trip planning prompt       │
  │              │                                   │
  │              ▼                                   │
  │  AI creates:                                     │
  │  📅 Day-by-day itinerary                         │
  │  🏠 Recommended listings                         │
  │  💰 Budget breakdown                             │
  │  💡 Pro tips ✅                                  │
  └─────────────────────────────────────────────────┘
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- Cloudinary account
- MapTiler account
- Groq AI account
- Gmail account with App Password

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/RajPrajapati05/travellust.git
cd travellust
```

**2. Install dependencies**
```bash
npm install
```

**3. Create `.env` file**
```env
ATLASDB_URL=your_mongodb_atlas_url
SECRET=yoursecretkey123
MAP_TOKEN=your_maptiler_api_key
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
GROQ_API_KEY=your_groq_api_key
EMAIL=your_gmail@gmail.com
EMAIL_PASSWORD=your_gmail_app_password
```

**4. Run the project**
```bash
node app.js
```

**5. Open in browser**
```
http://localhost:8080/listings
```

---

## 📁 Project Structure

```
travellust/
├── controllers/
│   ├── listings.js      # Listing CRUD + Search + Filter + Stats
│   ├── reviews.js       # Review creation and deletion
│   └── users.js         # Signup, Login, Logout + Email
├── models/
│   ├── listing.js       # Listing schema + Booking schema
│   ├── review.js        # Review schema
│   └── user.js          # User schema with passport
├── routes/
│   ├── listing.js       # All listing routes + Chatbot + Trip Planner + Booking
│   ├── review.js        # Review routes
│   └── user.js          # Auth routes
├── views/
│   ├── layouts/
│   │   └── boilerplate.ejs   # Main layout + Chatbot UI
│   ├── includes/
│   │   ├── navbar.ejs        # Navigation bar
│   │   ├── footer.ejs        # Footer
│   │   └── flash.ejs         # Flash messages
│   ├── listings/
│   │   ├── index.ejs         # Homepage with hero + stats + cards
│   │   ├── show.ejs          # Listing detail + booking form + map
│   │   ├── new.ejs           # Create listing form
│   │   └── edit.ejs          # Edit listing form
│   └── users/
│       ├── login.ejs         # Login page
│       └── signup.ejs        # Signup page
├── public/
│   ├── css/
│   │   ├── style.css         # Custom styles
│   │   └── rating.css        # Star rating styles
│   └── js/
│       ├── map.js            # MapTiler map initialization
│       └── script.js         # Bootstrap validation
├── utils/
│   ├── mailer.js        # Nodemailer email functions
│   ├── wrapAsync.js     # Async error wrapper
│   └── ExpressError.js  # Custom error class
├── middleware.js        # isLoggedIn, isOwner, validateListing
├── cloudConfig.js       # Cloudinary configuration
├── app.js               # Main Express application
└── .env                 # Environment variables (not committed)
```

---

## 🔑 Environment Variables

| Variable | Description |
|----------|-------------|
| `ATLASDB_URL` | MongoDB Atlas connection string |
| `SECRET` | Session secret key |
| `MAP_TOKEN` | MapTiler API key for maps |
| `CLOUD_NAME` | Cloudinary cloud name |
| `CLOUD_API_KEY` | Cloudinary API key |
| `CLOUD_API_SECRET` | Cloudinary API secret |
| `GROQ_API_KEY` | Groq AI API key |
| `EMAIL` | Gmail address for sending emails |
| `EMAIL_PASSWORD` | Gmail App Password |

---

## 🌟 What Makes Travellust Unique vs Airbnb

| Feature | Airbnb | Travellust |
|---------|--------|------------|
| Browse listings | ✅ | ✅ |
| Search & filter | ✅ | ✅ |
| Book listings | ✅ | ✅ |
| Reviews | ✅ | ✅ |
| Interactive map | ✅ | ✅ |
| **AI Chatbot** | ❌ | ✅ |
| **AI Trip Planner** | ❌ | ✅ |
| **Email on signup** | ❌ | ✅ |
| **Stats dashboard** | ❌ | ✅ |

---

## 👨‍💻 Author

**Raj Prajapati**
- GitHub: [@RajPrajapati05](https://github.com/RajPrajapati05)

---

## 📄 License

This project is licensed under the ISC License.

---

⭐ **If you like this project, give it a star on GitHub!** ⭐
