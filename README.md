# 🚗 Car Dealership Application — Obsidian Luxury

A full-stack car dealership application developed for the **IBM Full Stack Software Developer Professional Certificate Capstone Project** on Coursera.

The application combines a **React frontend**, **Django backend**, **Node.js/Express dealership service**, **MongoDB**, and a **Flask/NLTK sentiment-analysis microservice**.

The frontend uses an **Obsidian Luxury** automotive showroom design with a dark premium interface and champagne-gold accents.

---

## 📸 Project Preview

<!-- ADD SCREENSHOT: Main Dealers page -->
<!-- ![Dealers](screenshots/dealers-home.png) -->

The application allows users to register, log in, browse dealerships, filter dealerships by state, view dealership details, explore cars, read and submit reviews, and receive automatic sentiment analysis.

---

## ✨ Features

### 🔐 Authentication
- User registration
- Login and logout
- Session-based authentication
- Protected review functionality
- Django administration

<!-- ADD SCREENSHOT: Register page -->
<!-- ![Register](screenshots/register.png) -->

### 🏪 Dealerships
- Browse dealerships across different states
- Filter dealerships by state
- View dealership details
- View address, contact information, location and reviews

<!-- ADD SCREENSHOT: Dealership list -->
<!-- ![Dealers](screenshots/dealers.png) -->

### 🗺️ State Filtering
Users can filter dealerships by state, including Kansas and other available states.

<!-- ADD SCREENSHOT: Kansas filter -->
<!-- ![State Filter](screenshots/state-filter.png) -->

### 🚗 Car Inventory
- Car makes and models
- Car selection during review submission
- Purchase year and purchase date

### 📝 Reviews
- View dealership reviews
- Submit authenticated reviews
- Select purchased car information
- Automatic sentiment classification

<!-- ADD SCREENSHOT: Review form -->
<!-- ![Review Form](screenshots/review-form.png) -->

### 🤖 Sentiment Analysis
A dedicated Flask microservice uses **NLTK VADER** to classify reviews as Positive, Negative, or Neutral.

```text
Fantastic services → Positive
Worst services     → Negative
<!-- ADD SCREENSHOT: Positive and negative sentiments -->
<!-- ![Sentiment](screenshots/sentiment-analysis.png) -->

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
📁 Project Structure
IBM-Full-Stack-Developer-Capstone-Project-OBSIDIAN-v9/
├── .github/workflows/
│   └── cicd.yml
├── server/
│   ├── djangoproj/
│   ├── djangoapp/
│   │   ├── migrations/
│   │   ├── microservices/
│   │   ├── models.py
│   │   ├── views.py
│   │   ├── restapis.py
│   │   └── populate.py
│   ├── database/
│   │   ├── app.js
│   │   ├── dealership.js
│   │   ├── review.js
│   │   └── data/
│   ├── frontend/
│   │   ├── src/
│   │   └── static/
│   ├── Dockerfile
│   ├── deployment.yaml
│   ├── entrypoint.sh
│   └── requirements.txt
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
<!-- ADD SCREENSHOT: Django Admin -->
<!-- ![Django Admin](screenshots/django-admin.png) -->

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
<!-- ADD SCREENSHOT: Successful GitHub Actions run -->
<!-- ![CI/CD](screenshots/cicd-success.png) -->

Capstone Task 23: CI/CD evidence.
🐳 Docker & Kubernetes
Docker:
server/Dockerfile
server/entrypoint.sh
Kubernetes:
server/deployment.yaml
These files provide containerization and deployment configuration.
☁️ Deployment
Production URL:
ADD DEPLOYED APPLICATION URL HERE
<!-- ADD SCREENSHOT AFTER DEPLOYMENT -->
<!-- ![Deployed Home](screenshots/deployed-home.png) -->

<!-- ADD SCREENSHOT AFTER DEPLOYMENT -->
<!-- ![Deployed Dealer](screenshots/deployed-dealer-details.png) -->

<!-- ADD SCREENSHOT AFTER DEPLOYMENT -->
<!-- ![Deployed Review](screenshots/deployed-review.png) -->

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
