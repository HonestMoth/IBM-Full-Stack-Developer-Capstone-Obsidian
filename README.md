# 🚗 Car Dealership Application — Obsidian Luxury

A full-stack car dealership application developed for the **IBM Full Stack Software Developer Professional Certificate Capstone Project** on Coursera.

The application combines a **React frontend**, **Django backend**, **Node.js/Express dealership service**, **MongoDB**, and a **Flask/NLTK sentiment-analysis microservice**.

The frontend uses an **Obsidian Luxury** automotive showroom design with a dark premium interface and champagne-gold accents.

---

## 📸 Project Preview

<img width="959" height="515" alt="image" src="https://github.com/user-attachments/assets/12cefd1c-b8df-4bc4-a22d-59ac8019a322" />

The application allows users to register, log in, browse dealerships, filter dealerships by state, view dealership details, explore cars, read and submit reviews, and receive automatic sentiment analysis.

---

### 🔐 Authentication
- User registration
- Login and logout
- Session-based authentication
- Protected review functionality
- Django administration

<img width="959" height="514" alt="image" src="https://github.com/user-attachments/assets/aab499e1-6fb6-4aec-aca4-895aed3eb700" />

### 🏪 Dealerships
- Browse dealerships across different states
- Filter dealerships by state
- View dealership details
- View address, contact information, location and reviews
<img width="952" height="528" alt="image" src="https://github.com/user-attachments/assets/498050c5-666e-4dc3-99fd-122d6e9fde86" />


### 🗺️ State Filtering
Users can filter dealerships by state, including Kansas and other available states.

<img width="953" height="497" alt="image" src="https://github.com/user-attachments/assets/804c9b58-f979-4385-bf27-5473194c1cbe" />


### 🚗 Car Inventory
- Car makes and models
- Car selection during review submission
- Purchase year and purchase date
<img width="956" height="382" alt="image" src="https://github.com/user-attachments/assets/9519e201-a5e0-4d96-9d86-71a243209766" />


### 📝 Reviews
- View dealership reviews
- Submit authenticated reviews
- Select purchased car information
- Automatic sentiment classification

<img width="946" height="536" alt="image" src="https://github.com/user-attachments/assets/f70c5182-bb07-4ce5-afef-2b596f9b8c34" />


### 🤖 Sentiment Analysis
A dedicated Flask microservice uses **NLTK VADER** to classify reviews as Positive, Negative, or Neutral.

Fantastic services → Positive
Worst services     → Negative
<img width="947" height="500" alt="image" src="https://github.com/user-attachments/assets/4ff0ba4d-7096-4286-9e97-40bb4c446877" />


Django SQLite
 ├── Users
 ├── CarMake
 └── CarModel
🛠️ Technology Stack
Frontend
- React
- React Router
- JavaScript
- CSS3
Backend
- Django
- Django REST Framework
- Python
Dealership Service
- Node.js
- Express
- MongoDB
- Mongoose
Sentiment Service
- Flask
- NLTK
- VADER Sentiment Analyzer
DevOps
- Git
- GitHub
- GitHub Actions
- Docker
- Kubernetes configuration

## 📁 Project Structure

```text
IBM-Full-Stack-Developer-Capstone-Project-OBSIDIAN-v9/
├── .github/
│   └── workflows/
│       └── cicd.yml
│
├── server/
│   ├── djangoproj/
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   │
│   ├── djangoapp/
│   │   ├── migrations/
│   │   ├── microservices/
│   │   │   ├── app.py
│   │   │   └── requirements.txt
│   │   ├── models.py
│   │   ├── views.py
│   │   ├── restapis.py
│   │   └── populate.py
│   │
│   ├── database/
│   │   ├── app.js
│   │   ├── dealership.js
│   │   ├── review.js
│   │   └── data/
│   │       ├── dealerships.json
│   │       ├── reviews.json
│   │       └── car_records.json
│   │
│   ├── frontend/
│   │   ├── src/
│   │   └── static/
│   │
│   ├── Dockerfile
│   ├── deployment.yaml
│   ├── entrypoint.sh
│   └── requirements.txt
│
├── .env.example
├── .gitignore
├── CAPSTONE_SUBMISSION_CHECKLIST.md
├── LICENSE
├── README.md
├── start-capstone.ps1
└── stop-capstone.ps1
🚀 Getting Started
Requirements
- Python 3.12+
- Node.js
- npm
- MongoDB
- Git
Optional:
- Docker
- Kubernetes CLI
Windows Quick Start
Make sure MongoDB is running, then open PowerShell in the project root:
powershell -ExecutionPolicy Bypass -File .\start-capstone.ps1
The script starts:
Service	Port
React	3000
Django	8000
Express	3030
Flask	5050
MongoDB	27017


Open:
http://localhost:3000/dealers
⚙️ Configuration
Create .env based on .env.example:
DJANGO_SECRET_KEY=your-secret-key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
MONGODB_URI=mongodb://127.0.0.1:27017/dealershipsDB
BACKEND_URL=http://127.0.0.1:3030
SENTIMENT_ANALYZER_URL=http://127.0.0.1:5050
Never commit the real .env file.
🗄️ Database Setup
From the server directory:
python manage.py makemigrations djangoapp
python manage.py migrate
Create a Django administrator:
python manage.py createsuperuser
Django Admin:
http://localhost:8000/admin/

🔌 API Endpoints
Authentication
POST /djangoapp/login
POST /djangoapp/register
GET  /djangoapp/logout
Dealerships
GET /djangoapp/get_dealers
GET /djangoapp/get_dealers/{state}
GET /djangoapp/dealer/{id}
Example:
GET /djangoapp/get_dealers/Kansas
GET /djangoapp/dealer/1
Reviews
GET  /djangoapp/reviews/dealer/{id}
POST /djangoapp/add_review
Cars
GET /djangoapp/get_cars
Sentiment
GET /analyze/{text}
🧪 API Testing
curl http://localhost:8000/djangoapp/get_dealers
curl http://localhost:8000/djangoapp/dealer/1
curl http://localhost:8000/djangoapp/get_dealers/Kansas
curl http://localhost:8000/djangoapp/reviews/dealer/1
curl http://localhost:8000/djangoapp/get_cars

🔄 CI/CD
GitHub Actions workflow:
.github/workflows/cicd.yml
The workflow:
1. Checks out the repository
2. Sets up Python
3. Installs backend dependencies
4. Runs Django checks
5. Applies migrations
6. Sets up Node.js
7. Installs frontend dependencies
8. Builds the React frontend


Capstone Task 23: CI/CD evidence.
🐳 Docker & Kubernetes
Docker:
server/Dockerfile
server/entrypoint.sh
Kubernetes:
server/deployment.yaml
These files provide containerization and deployment configuration.

🔒 Security
The application includes:
- CSRF protection
- Session authentication
- Protected review functionality
- Environment-based configuration
- Secret-key configuration
- Input validation

The project demonstrates:
- React frontend
- Django REST APIs
- Authentication
- Dealership browsing
- State filtering
- Car makes and models
- Reviews
- MongoDB
- SQLite
- Express service
- Flask microservice
- NLTK/VADER sentiment analysis
- GitHub Actions CI/CD
- Docker
- Kubernetes configuration
- Cloud deployment

🎓 Project Information
Project: Car Dealership Application
Theme: Obsidian Luxury
Course: IBM Full Stack Software Developer Professional Certificate
Platform: Coursera
Type: Full Stack Application Development Capstone


👨‍💻 Author
Developed as part of the IBM Full Stack Software Developer Professional Certificate Capstone Project.
