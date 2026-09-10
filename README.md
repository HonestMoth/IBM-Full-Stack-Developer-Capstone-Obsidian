# fullstack_developer_capstone — Car Dealership Application

A full-stack car dealership application developed for the **IBM Full Stack Software Developer Professional Certificate Capstone Project**.

The application combines a **React frontend**, **Django backend**, **Node.js/Express dealership service**, **MongoDB**, and a **Flask/NLTK sentiment-analysis microservice**.

The frontend uses an **Obsidian Luxury** automotive showroom design with a dark premium interface and champagne-gold accents.

## 📸 Project Preview

<!-- ADD SCREENSHOT: Main Dealers page -->
<!-- ADD SCREENSHOT: Logged-in Dealers page -->
<!-- ADD SCREENSHOT: Dealer details and reviews -->
<!-- ADD SCREENSHOT: Post Review page -->

The application allows users to register, log in, browse dealerships, filter dealerships by state, view dealership details, explore cars, read and submit reviews, and receive automatic sentiment analysis.

## 🔐 Authentication
- User registration
- Login and logout
- Session-based authentication
- Protected review functionality
- Django administration

## 🏪 Dealerships
- Browse dealerships across different states
- Filter dealerships by state
- View dealership details
- View address, location and reviews

## 🚗 Car Inventory
- Car makes and models
- Car selection during review submission
- Purchase year and purchase date

## 📝 Reviews
- View dealership reviews
- Submit authenticated reviews
- Store purchase and vehicle details
- Automatic sentiment classification

## 🤖 Sentiment Analysis
A dedicated Flask microservice uses **NLTK VADER** to classify reviews as Positive, Negative, or Neutral.

`Fantastic services` → `positive`

## 🛠️ Technology Stack
- React / React Router / JavaScript / CSS3
- Django / Python / Django REST APIs
- Node.js / Express / MongoDB / Mongoose
- Flask / NLTK / VADER
- Git / GitHub / GitHub Actions
- Docker / Kubernetes configuration

## 📁 Project Structure

```text
IBM-Full-Stack-Developer-Capstone-Project-OBSIDIAN-v9/
├── .github/
│   └── workflows/
│       └── cicd.yml
├── server/
│   ├── djangoproj/
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   ├── djangoapp/
│   │   ├── migrations/
│   │   ├── microservices/
│   │   │   ├── app.py
│   │   │   └── requirements.txt
│   │   ├── models.py
│   │   ├── views.py
│   │   ├── restapis.py
│   │   └── populate.py
│   ├── database/
│   │   ├── app.js
│   │   ├── dealership.js
│   │   ├── review.js
│   │   └── data/
│   │       ├── dealerships.json
│   │       ├── reviews.json
│   │       └── car_records.json
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
```

## 🚀 Windows Quick Start

Make sure MongoDB is running, then open PowerShell in the project root:

```powershell
powershell -ExecutionPolicy Bypass -File .\start-capstone.ps1
```

| Service | Port |
|---|---:|
| React | 3000 |
| Django | 8000 |
| Express | 3030 |
| Flask | 5050 |
| MongoDB | 27017 |

Open:

```text
http://localhost:3000/dealers
```

## ⚙️ Configuration

Create `.env` based on `.env.example`:

```text
DJANGO_SECRET_KEY=your-secret-key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
MONGODB_URI=mongodb://127.0.0.1:27017/dealershipsDB
BACKEND_URL=http://127.0.0.1:3030
SENTIMENT_ANALYZER_URL=http://127.0.0.1:5050
```

Never commit the real `.env` file.

## 🗄️ Database Setup

From the `server` directory:

```powershell
python manage.py makemigrations djangoapp
python manage.py migrate
python manage.py createsuperuser
```

Django Admin:

```text
http://localhost:8000/admin/
```

## 🔌 Capstone API Endpoints

Authentication:

```text
POST /djangoapp/login
POST /djangoapp/register
GET  /djangoapp/logout
```

Dealerships:

```text
GET /fetchDealers
GET /fetchDealers/Kansas
GET /fetchDealer/1
```

Reviews:

```text
GET /fetchReviews/dealer/1
POST /djangoapp/add_review
```

Cars:

```text
GET /djangoapp/get_cars
```

Sentiment:

```text
GET /analyze/Fantastic%20services
```

The original `/djangoapp/...` endpoints remain available for the React application.

## 🧪 API Testing

```powershell
curl.exe -X GET "http://127.0.0.1:8000/fetchDealers"
curl.exe -X GET "http://127.0.0.1:8000/fetchDealer/1"
curl.exe -X GET "http://127.0.0.1:8000/fetchDealers/Kansas"
curl.exe -X GET "http://127.0.0.1:8000/fetchReviews/dealer/1"
curl.exe -X GET "http://127.0.0.1:8000/djangoapp/get_cars"
curl.exe -X GET "http://127.0.0.1:8000/analyze/Fantastic%20services"
```

## 🔄 CI/CD

GitHub Actions workflow:

```text
.github/workflows/cicd.yml
```

The workflow includes separate:

1. `Lint Python Files`
2. `Lint JavaScript Files`
3. `Build and Test Application`
4. Django system checks and migrations
5. React dependency installation and production build

## 🐳 Docker & Kubernetes

Docker:

```text
server/Dockerfile
server/entrypoint.sh
```

Kubernetes:

```text
server/deployment.yaml
```

These files provide containerization and deployment configuration.

## 🔒 Security

The application includes session authentication, protected review functionality, environment-based configuration, secret-key configuration, CSRF protection, and input validation.

## 🎓 Project Information

**Project:** `fullstack_developer_capstone`  
**Application:** Car Dealership Application  
**Theme:** Obsidian Luxury  
**Course:** IBM Full Stack Software Developer Professional Certificate  
**Platform:** Coursera  
**Type:** Full Stack Application Development Capstone

## 👨‍💻 Author

Developed as part of the IBM Full Stack Software Developer Professional Certificate Capstone Project.
